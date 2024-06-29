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
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import PDFFile
from .serializers import PDFFileSerializer
from models.pdfanalyser.qa_generator_pdf import qa_generator_pdf
from models.pdfanalyser.qa_generator_url import qa_generator_url
import os
import uuid
import ast
import json
from .serializers import PDFUploadSerializer
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
load_dotenv()


pdf = True
url = True
gen_ai = True

options = [pdf, url, gen_ai]

# Count the number of selected options
number_of_options = sum(options)

# Assign question distribution based on the number of selected options
if number_of_options == 1:
    questions_pdf, questions_url, questions_gen_ai = (40 if option else 0 for option in options)
elif number_of_options == 2:
    questions_pdf, questions_url, questions_gen_ai = (20 if option else 0 for option in options)
else:
    questions_pdf, questions_url, questions_gen_ai = 13, 13, 14

# print(questions_pdf)
# print(questions_url)
# print(questions_gen_ai)

def number_of_questions(no_questions):
    
    number_of_questions=no_questions
  
    # Calculate the base number of questions per level
    base_number = number_of_questions // 4

    # Calculate the remainder
    remainder = number_of_questions % 4

    # Create the list of questions per level, distributing the remainder
    number_of_questions_levelwise = [base_number + 1 if i < remainder else base_number for i in range(4)]
    
    return number_of_questions_levelwise
    

llamaparse_api_key = os.getenv('LLAMA_API_KEY')
groq_api_key = os.getenv("GROQ_API_KEY")


# set the job profile here
job_profile="Data Scientist"


#To store the questions and answers generated by different sources in three
# different dictionaries

result_dict_pdf={}
result_dict_url={}
result_dict_gen_ai={}
result_final={}

def extract_and_convert_to_dict(input_string):
    # Find the position of the first '{' and the last '}'
    start = input_string.find('{')
    end = input_string.rfind('}')
    
    if start == -1 or end == -1 or start >= end:
        raise ValueError("The input string does not contain valid JSON-like content.")
    
    # Extract the substring between the first '{' and the last '}'
    json_like_string = input_string[start:end+1]
    
    # Convert the extracted string to a dictionary
    result_dict = ast.literal_eval(json_like_string)
    
    return result_dict

def merge_with_unique_keys(input_dict, result_dict):
    for key, value in input_dict.items():
        # Generate a unique key using UUID
        unique_key = str(uuid.uuid4())
        # Add the key-value pair to the result dictionary
        result_dict[unique_key] = value

def merge_and_save_dicts(dict1, dict2, dict3, output_filename):
    # Merging the dictionaries, filtering out empty ones
    result_final = {**dict1, **dict2, **dict3}
    
    # Check if the final dictionary is empty
    if not result_final:
        print("All input dictionaries are empty. Nothing to save.")
        return
    
    # Saving the merged dictionary to a JSON file
    with open(output_filename, "w") as json_file:
        json.dump(result_final, json_file, indent=4)
    
    print(f"Merged dictionary saved to {output_filename}")



# class FaceResultView(APIView):
#     def get(self, request, *args, **kwargs):
#         uploaded_images = UploadedImage.objects.all()
#         serializer = UploadedImageSerializer(uploaded_images, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     def post(self, request, *args, **kwargs):
#         serializer = ImageUploadSerializer(data=request.data)
#         if serializer.is_valid():
#             image1 = serializer.validated_data['image1']
#             image2 = serializer.validated_data['image2']
            
#             # known_image_path = os.path.join(settings.BASE_DIR, '/file/{images1}')

#             known_image_path = "/media/admsher/EXTERNAL/Gitrepo/DRF-project/backend/backend/post/known_person.jpg"
#             predictor_path = '/media/admsher/EXTERNAL/Gitrepo/DRF-project/backend/backend/post/shape_predictor_68_face_landmarks.dat'  

#             recognizer = FaceRecognizer(known_image_path, predictor_path)
#             recognizer.recognize_faces()
#             recognizer.release()
            
#             uploaded_image = UploadedImage(image=image1)
#             uploaded_image.save()

#             return Response({"message": "Images received"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@method_decorator(csrf_exempt, name='dispatch')
class PDFUploadView(viewsets.ViewSet):
    serializer_class = PDFFileSerializer

    
    
    @action(detail=False, methods=['post'])
    def upload(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            PDFUploadView.handle_file_upload(self, request)
            pass
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
    
    @action(detail=False, methods=['post'])
    def upload(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            PDFUploadView.handle_file_upload(self, request)
            print("Uploaded")
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def handle_file_upload(self, request):
        serializer = PDFUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        pdf_file = serializer.validated_data['pdf']
        try:
            # Ensure qa_generator_pdf is a class and instantiate it
            qg_obj = qa_generator_pdf()
            parsed_data = qg_obj.load_or_parse_data(llamaparse_api_key, pdf_file.read())
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
            candidate applying for the following role:

            Please generate the specified number of questions exactly.

            **Job Profile:**

            {job_profile}
            Difficulty Distribution:
            - Easy: {number_of_questions_levelwise[0]} questions
            - Medium: {number_of_questions_levelwise[1]} questions
            - Hard: {number_of_questions_levelwise[2]} questions
            - Very Hard: {number_of_questions_levelwise[3]} questions
            """

            response = qg_obj.output_generator(chat_model, retriever, prompt, query_template)

            final_result = extract_and_convert_to_dict(response) 
            merge_with_unique_keys(final_result, result_dict_pdf)

            for key, value in result_dict_pdf.items():
                print(f"{key}: {value}")
                print("\n")

            return Response({'message': 'File uploaded and processed successfully!'}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def handle_url_upload(self, request):
        serializer = URLUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        url = serializer.validated_data['url']
        try:
            # Ensure qa_generator_url is a class and instantiate it
            qg_obj = qa_generator_url(url, n_href=None, prompt_template=None)
            number_of_questions_levelwise = number_of_questions(questions_url)

            custom_prompt_template = """Use the following pieces of information to answer questions of the user.
            Context: {context}
            question: {question}
            Only return the helpful content and nothing else.
            """

            prompt = qg_obj.set_custom_prompt(custom_prompt_template)
            query_template = f"""
            Generate {questions_url} technical interview questions and answers suitable for a 
            candidate applying for the following role:

            Please generate the specified number of questions exactly.

            **Job Profile:**

            {job_profile}
            Difficulty Distribution:
            - Easy: {number_of_questions_levelwise[0]} questions
            - Medium: {number_of_questions_levelwise[1]} questions
            - Hard: {number_of_questions_levelwise[2]} questions
            - Very Hard: {number_of_questions_levelwise[3]} questions
            """

            response = qg_obj.output_generator(prompt, query_template)

            final_result = extract_and_convert_to_dict(response) 
            merge_with_unique_keys(final_result, result_dict_url)

            for key, value in result_dict_url.items():
                print(f"{key}: {value}")
                print("\n")

            return Response({'message': 'URL processed successfully!'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



