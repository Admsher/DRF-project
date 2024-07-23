from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    # Define password field as write-only
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'mobile', 'contact_number', 'company', 'position', 'company_details', 'company_description', 'profile_picture', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Create user with hashed password
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            mobile=validated_data['mobile'],
            contact_number=validated_data.get('contact_number', ''),
            company=validated_data.get('company', ''),
            position=validated_data.get('position', ''),
            company_details=validated_data.get('company_details', ''),
            company_description=validated_data.get('company_description', ''),
            profile_picture=validated_data.get('profile_picture', ''),
            password=validated_data['password']
        )
        return user

    def update(self, instance, validated_data):
        # Handle updating user instance
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.contact_number = validated_data.get('contact_number', instance.contact_number)
        instance.company = validated_data.get('company', instance.company)
        instance.position = validated_data.get('position', instance.position)
        instance.company_details = validated_data.get('company_details', instance.company_details)
        instance.company_description = validated_data.get('company_description', instance.company_description)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        print(f"Attempting to authenticate user with email: {email}")
        user = authenticate(username=email, password=password)
        print(f"Authentication result for user with email {email}: {user}")

        if user and user.is_active:
            return user

        raise serializers.ValidationError("Incorrect credentials.")
