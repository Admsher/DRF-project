import uuid
import logging
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from .models import ContactFormSubmission
from .serializers import ContactFormSubmissionSerializer

logger = logging.getLogger(__name__)

# Function to create a Jitsi Meet link
def create_jitsi_meet():
    meeting_id = str(uuid.uuid4())
    meet_link = f"https://meet.jit.si/{meeting_id}"
    return meet_link

class ContactFormSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactFormSubmission.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = ContactFormSubmissionSerializer

    def create(self, request, *args, **kwargs):
        logger.debug("Received data: %s", request.data)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        email = serializer.validated_data['email']
        select_time = serializer.validated_data['select_time']
        selected_day = serializer.validated_data['selected_day']

        try:
            meet_link = create_jitsi_meet()
            send_mail(
                'Jitsi Meet Invitation',
                f'Please join the Jitsi Meet using the following link: {meet_link}\nDate: {selected_day}\nTime: {select_time}',
                'your_email@gmail.com',
                [email],
                fail_silently=False,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error("Error creating meeting or sending email: %s", str(e))
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
