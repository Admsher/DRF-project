from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .models import QuestionAnswer, UploadedImage
from .serializers import QuestionAnswerSerializer, PDFUploadSerializer
from models.pdfanalyser.pdf import create_vector_database, ChatGroq, Chroma, groq_api_key, PromptTemplate, RetrievalQA
from django.shortcuts import render
from rest_framework import permissions

custom_prompt_template = """Use the following pieces of information to answer questions of the user.

# Context: {context}
# Question: {question}

# Only return the helpful content below and nothing else.
# Helpful answer:
# """

def set_custom_prompt():
    """
    Prompt template for QA retrieval for each vectorstore
    """
    prompt = PromptTemplate(template=custom_prompt_template,
                            input_variables=['context', 'question'])
    return prompt

lines = ''

def home(request):
    return HttpResponse(lines)

def imageupload(request):
    return render(request, 'imageupload.html', {})

class QuestionAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, *args, **kwargs):
        """
        List all the QuestionAnswer items.
        """
        qa = QuestionAnswer.objects.all()
        serializer = QuestionAnswerSerializer(qa, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PDFUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        pdf_file = serializer.validated_data['pdf_file']

        try:
            # Save the uploaded PDF file
            with open(f'file/{pdf_file.name}', 'wb+') as destination:
                for chunk in pdf_file.chunks():
                    destination.write(chunk)

            # Perform ML model integration and retrieve questions and answers
            vs, embed_model = create_vector_database(fpath=f'file/{pdf_file.name}')

            chat_model = ChatGroq(temperature=0.0,
                                  model_name="mixtral-8x7b-32768",
                                  api_key=groq_api_key)

            vectorstore = Chroma(embedding_function=embed_model,
                                 persist_directory="chroma_db_llamaparse1",
                                 collection_name="rag")

            retriever = vectorstore.as_retriever(search_kwargs={'k': 3})

            custom_prompt_template = """
                Use the following pieces of information to answer questions of the user.
                Context: {context}
                Question: {question}
                Only return the helpful content below and nothing else.
                Helpful answer:
                """

            prompt = PromptTemplate(input_variables=['context', 'question'], template=custom_prompt_template)

            qa = RetrievalQA.from_chain_type(llm=chat_model,
                                            chain_type="stuff",
                                            retriever=retriever,
                                            return_source_documents=True,
                                            chain_type_kwargs={"prompt": prompt})

            response = qa.invoke({
                "query": "Generate 20 technical interview questions and answers suitable for a candidate with 0 year of experience "
                         "in the field, based on the provided content. Include a mix of basic, intermediate, tricky, and logical "
                         "questions. Follow a coherent order in the question formation. Provide the source documents."
            })

            # Process the response and save questions and answers to database
            temp_str = response['result']
            lines = temp_str.split("\n")
            for line in lines:
                question_part = ''
                answer_part = ''
                if 'Answer:' in line:
                    answer_part = line.split('Answer:')[1].strip()
                elif 'Answer' not in line:
                    question_part = line.strip()

                # Save to the model if both question and answer are present
                if question_part and answer_part:
                    qa_obj = QuestionAnswer(question=question_part, answer=answer_part)
                    qa_obj.save()

            # Retrieve all QuestionAnswer objects and serialize the response
            qa_all = QuestionAnswer.objects.all()
            serializer = QuestionAnswerSerializer(qa_all, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
