from rest_framework import permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from .models import QuestionAnswer
from .serializers import QuestionAnswerSerializer, PDFUploadSerializer, URLUploadSerializer,FileUploadSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import PDFFile
from .serializers import PDFFileSerializer
from models.pdfanalyser.qa_generator_pdf import qa_generator_pdf
from models.pdfanalyser.qa_generator_url import qa_generator_url
from models.pdfanalyser.qa_generator_gen_ai import qa_generator_gen_ai
import os
import uuid
import ast
import json
from .serializers import PDFUploadSerializer
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.conf import settings
from django.http import JsonResponse
from rest_framework import generics
from django.http import JsonResponse, HttpResponseNotFound
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
load_dotenv()


# Set API keys directly for now
llamaparse_api_key = ""
groq_api_key = ""

# Flags for question generation sources
pdf = True
url = False
gen_ai = True

options = [pdf, url, gen_ai]

# Assign question distribution based on the number of selected options
number_of_options = sum(options)
if number_of_options == 1:
    questions_pdf, questions_url, questions_gen_ai = (40 if option else 0 for option in options)
elif number_of_options == 2:
    questions_pdf, questions_url, questions_gen_ai = (20 if option else 0 for option in options)
else:
    questions_pdf, questions_url, questions_gen_ai = 20, 0, 20

def number_of_questions(no_questions):
    base_number = no_questions // 4
    remainder = no_questions % 4
    return [base_number + 1 if i < remainder else base_number for i in range(4)]

job_profile = ""

result_dict_pdf = {}
result_dict_url = {}
result_dict_gen_ai = {}

def extract_and_convert_to_dict(input_string):
    start = input_string.find('{')
    end = input_string.rfind('}')
    if start == -1 or end == -1 or start >= end:
        raise ValueError("The input string does not contain valid JSON-like content.")
    json_like_string = input_string[start:end+1]
    return ast.literal_eval(json_like_string)

def merge_with_unique_keys(input_dict, result_dict):
    for key, value in input_dict.items():
        unique_key = str(uuid.uuid4())
        result_dict[unique_key] = value

def merge_with_count_keys(input_dict, result_dict):
    count = 1
    for key, value in input_dict.items():
        result_dict[count] = value
        count += 1
        
def merge_and_save_dicts(dict1, dict2, dict3, output_filename):
    result_final = {**dict1, **dict2, **dict3}
    if not result_final:
        print("All input dictionaries are empty. Nothing to save.")
        return
    with open(output_filename, "w") as json_file:
        json_file.write(" ")  # This clears the file
    with open(output_filename, "w") as json_file:
        json.dump(result_final, json_file, indent=4)
    print(f"Merged dictionary saved to {output_filename}")

class PDFFileViewSet(viewsets.ModelViewSet):
    queryset = PDFFile.objects.all()
    serializer_class = PDFFileSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        data = request.data
        if isinstance(data, list):
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            pdf_file = serializer.validated_data['file']
            file_path = os.path.join(settings.MEDIA_ROOT, 'pdfs', pdf_file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in pdf_file.chunks():
                    destination.write(chunk)

            if pdf:
                qg_obj = qa_generator_pdf()
                parsed_data = qg_obj.load_or_parse_data(llamaparse_api_key, file_path)
                embed_model = qg_obj.create_vector_database(parsed_data)
                chat_model = qg_obj.chat_model(groq_api_key)
                retriever = qg_obj.vectorstore(embed_model)
                number_of_questions_levelwise = number_of_questions(questions_pdf)

                custom_prompt_template = """Use the following pieces of information to answer questions of the user.
                Context: {context}
                question: {question}
                Only return the helpful content and nothing else.
                """

                prompt = qg_obj.set_custom_prompt(custom_prompt_template)

                query_template = f"""
                Generate {questions_pdf} technical interview questions and answers suitable for a 
                candidate applying for the following role :

                Please generate the specified number of questions exactly.

                **Job Profile:**

                {job_profile}
                Difficulty Distribution:
                - Easy: {number_of_questions_levelwise[0]} questions
                - Medium: {number_of_questions_levelwise[1]} questions
                - Hard: {number_of_questions_levelwise[2]} questions
                - Very Hard: {number_of_questions_levelwise[3]} questions

                Formulate interview questions based on the provided content only,
                the specified difficulty levels, the responsibilities mentioned in the job 
                profile, and the listed requirements.

                Ensure that the exact specified number of questions are generated for each difficulty 
                level only. Do not set the numbers of questions generated for each difficulty
                level by yourself.

                Do not use reference of any table, example or any diagram in the provided content as
                the interviewee will not be provided with any material.

                Do not add questions and answers by yourself other than the provided content.

                Strictly use the provided content only. Do not generate questions
                on your own.

                Return the output as a Python dictionary where keys are the integer serial 
                number of the questions and answers, and values are Python dictionaries containing the 
                question, answer, and difficulty level. 
                Do not return anything other than the dictionary.

                The structure should be:
                {{
                "1": {{
                    "question": "Example question",
                    "answer": "Example answer",
                    "difficulty": "Easy"
                }},
                "2": {{
                    "question": "Example question",
                    "answer": "Example answer",
                    "difficulty": "Medium"
                }},
                ...
                }}
                """

                response = qg_obj.output_generator(chat_model, retriever, prompt, query_template)
                final_result = extract_and_convert_to_dict(response)
                merge_with_unique_keys(final_result, result_dict_pdf)

            if url:
                qg_obj = qa_generator_url(url="https://www.ibm.com/topics/machine-learning")
                number_of_questions_levelwise = number_of_questions(questions_url)
                prompt = ChatPromptTemplate.from_template("""
                Generate {questions_url} technical interview questions and answers suitable for a 
                candidate applying for the following role :
                Please generate the specified number of questions exactly.
                **Job Profile:**
                {job_profile}
                Difficulty Distribution:
                - Easy: {easy} questions
                - Medium: {medium} questions
                - Hard: {hard} questions
                - Very Hard: {veryhard} questions
                Formulate interview questions based on the provided content {data} only,
                the specified difficulty levels, the responsibilities mentioned in the job 
                profile, and the listed requirements.
                Do not use reference of any table, example, any diagram or any such information from the
                content that is irrevelant to the interviewee from the provided content
                Do not add questions and answers by yourself other than the provided content.
                Return the output as a Python dictionary where keys are the integer serial 
                number of the questions and answers, and values are Python dictionaries containing the 
                question, answer, and difficulty level.
                The structure should be:
                {{
                "1": {{
                    "question": "Example question",
                    "answer": "Example answer",
                    "difficulty": "Easy"
                }},
                "2": {{
                    "question": "Example question",
                    "answer": "Example answer",
                    "difficulty": "Medium"
                }},
                ...
                }}
                """)
                response = qg_obj.question_generator(questions_url, number_of_questions_levelwise)
                final_result = extract_and_convert_to_dict(response)
                merge_with_unique_keys(final_result, result_dict_url)

            if gen_ai:
                qg_obj = qa_generator_gen_ai()
                number_of_questions_levelwise = number_of_questions(questions_gen_ai)
                custom_prompt = """
                Generate {number_of_questions} technical interview questions and answers suitable for a 
                candidate applying for the following role :
                Please generate the specified number of questions exactly.
                **Job Profile:**
                {job_profile}
                Difficulty Distribution:
                - Easy: {easy} questions
                - Medium: {medium} questions
                - Hard: {hard} questions
                - Very Hard: {very_hard} questions
                Formulate interview questions based on the specified difficulty levels, the responsibilities mentioned in the job 
                profile, and the listed requirements. Ensure that the exact specified number of questions are generated for each difficulty 
                level only. Do not set the numbers of questions generated for each difficulty
                level by yourself.
                Return the output as a Python dictionary where keys are the integer serial 
                number of the questions and answers, and values are Python dictionaries containing the 
                question, answer, and difficulty level. Do not return anything other than the dictionary.
                The structure should be:
                {{
                "1": {{
                    "question": "Example question",
                    "answer": "Example answer",
                    "difficulty": "Easy"
                }},
                "2": {{
                    "question": "Example question",
                    "answer": "Example answer",
                    "difficulty": "Medium"
                }},
                ...
                }}
                """
                prompt = PromptTemplate(template=custom_prompt,
                            input_variables=['number_of_questions', 'job_profile','easy','medium','hard','very_hard'])
                response = qg_obj.question_generator(job_profile,prompt,questions_gen_ai,number_of_questions_levelwise)
                final_result = extract_and_convert_to_dict(response)
                merge_with_unique_keys(final_result, result_dict_gen_ai)

            output_filename = os.path.join(settings.MEDIA_ROOT, 'questions_answers.json')
            merge_and_save_dicts(result_dict_pdf, result_dict_url, result_dict_gen_ai, output_filename)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class QuestionAnswerViewSet(viewsets.ModelViewSet):
    queryset = QuestionAnswer.objects.all()
    serializer_class = QuestionAnswerSerializer
    permission_classes = [permissions.AllowAny]  # Add your desired permissions here

    def get_question_answers(self, request):
        file_path = os.path.join(settings.MEDIA_ROOT, 'questions_answers.json')
        
        if os.path.exists(file_path):
            with open(file_path, 'r') as json_file:
                data = json.load(json_file)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)