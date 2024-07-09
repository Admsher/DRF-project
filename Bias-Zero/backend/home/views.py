from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ContactFormSubmission
from .serializers import ContactFormSubmissionSerializer

@api_view(['GET', 'POST'])
def contact_form_submission_list(request):
    if request.method == 'GET':
        submissions = ContactFormSubmission.objects.all()
        serializer = ContactFormSubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ContactFormSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

