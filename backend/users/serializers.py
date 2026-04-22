from rest_framework import serializers
from users.models import CustomUser, CustomUserManager

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    
    class Meta:
        model = CustomUser
        fields = [
            'first_name', 
            'last_name',  
            'email', 
            'phone_number', 
            'password', 
            'password_confirm'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        
        user = CustomUser.objects.create_user(**validated_data)
        return user