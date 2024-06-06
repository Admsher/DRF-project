from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .models import QuestionAnswer,UploadedImage
from .serializers import QuestionAnswerSerializer
from .serializers import PostSerializer,PDFUploadSerializer,ImageUploadSerializer,UploadedImageSerializer
from .FaceIdentification import FaceRecognizer
from django.shortcuts import render
from .pdf import create_vector_database,ChatGroq,Chroma,groq_api_key,PromptTemplate,RetrievalQA
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

lines=''

def home(request):
    return HttpResponse(lines)

def imageupload(request):
    return render(request,'imageupload.html',{})


class QuestionAnswerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    """
    API View to handle saving questions and answers data.
    """
     # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the Crop_data items for given requested user
        '''
        QA = QuestionAnswer.objects.all()
        serializer = QuestionAnswerSerializer(QA, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PDFUploadSerializer(data=request.data)
        if serializer.is_valid():
            pdf_file = serializer.validated_data['pdf_file']
            # print(pdf_file)
            ##We enter the ML model from here##
            with open(f'file/{pdf_file.name}', 'wb+') as destination:
                for chunk in pdf_file.chunks():
                    destination.write(chunk)
           
        """
        Save questions and answers data from provided lines.
        """
        # lines = request.data.get('lines', [])
        # if not lines:
        #     return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)

        

        
        vs, embed_model = create_vector_database(fpath=destination)

        chat_model = ChatGroq(temperature=0.0,
                      model_name="mixtral-8x7b-32768",
                      api_key=groq_api_key)

        vectorstore = Chroma(embedding_function=embed_model,
                      persist_directory="chroma_db_llamaparse1",
                      collection_name="rag")

        retriever = vectorstore.as_retriever(search_kwargs={'k': 3})

        custom_prompt_template = """Use the following pieces of information to answer questions of the user.

            Context: {context}
            Question: {question}

            Only return the helpful content below and nothing else.
            Helpful answer:

            """
        prompt = set_custom_prompt()


        PromptTemplate(input_variables=['context', 'question'], template=custom_prompt_template)

        PromptTemplate(input_variables=['context', 'question'], template='Use the following pieces of information to answer questions of the user.\n\nContext: {context}\nQuestion: {question}\n\nOnly return the helpful content below and nothing else.\nHelpful answer:\n')

        qa = RetrievalQA.from_chain_type(llm=chat_model,
                                 chain_type="stuff",
                                 retriever=retriever,
                                 return_source_documents=True,
                                 chain_type_kwargs={"prompt": prompt})

        response = qa.invoke({
    "query": "Generate 20 technical interview questions and answers suitable for a candidate with 0 year of experience "
             "in the field, based on the provided content. Include a mix of basic, intermediate, tricky, and logical "
             "questions. Follow a coherent order in the question formation. Provide the source documents "
            })

        # QuestionAnswer.objects.all.delete()
        temp_str = response['result']
        lines = temp_str.split("\n")
        print(len(lines))
        for line in lines:
            question_part=''
            answer_part=''
            # print("LINEA",line)
            if 'Answer:' in line:
                # print("YES")
                answer_part = line.split('Answer:')[1].strip()
              
            if 'Answer' not in line:
                 question_part = line
                # question_part = line
                
                # question = question_part.split('?', -1)[0] + '?'

                # Save to the model
            qa = QuestionAnswer(question=question_part, answer=answer_part)
            qa.save()
        QA = QuestionAnswer.objects.all()
        serializer = QuestionAnswerSerializer(QA, many=True)


        
        
        return Response(serializer.data,status=status.HTTP_200_OK)

class FaceResultView(APIView):
    def get(self, request, *args, **kwargs):
        uploaded_images = UploadedImage.objects.all()
        serializer = UploadedImageSerializer(uploaded_images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image1 = serializer.validated_data['image1']
            image2 = serializer.validated_data['image2']
            
            # known_image_path = os.path.join(settings.BASE_DIR, '/file/{images1}')

            known_image_path = "/media/admsher/EXTERNAL/Gitrepo/DRF-project/backend/backend/post/known_person.jpg"
            predictor_path = '/media/admsher/EXTERNAL/Gitrepo/DRF-project/backend/backend/post/shape_predictor_68_face_landmarks.dat'  

            recognizer = FaceRecognizer(known_image_path, predictor_path)
            recognizer.recognize_faces()
            recognizer.release()
            
            uploaded_image = UploadedImage(image=image1)
            uploaded_image.save()

            return Response({"message": "Images received"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)