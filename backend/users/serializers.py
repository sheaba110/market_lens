from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model


User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    
    class Meta:
        model = User
        fields = [
            'username',  
            'email', 
            'password', 
            'password_confirm'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        
        user = User.objects.create_user(**validated_data)
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
        
    class Meta:
        model = Profile
        fields = ['user', 'profile_picture', 'bio', 'birth_date', 'phone_number', 'facebook_url']