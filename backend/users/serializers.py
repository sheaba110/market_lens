from rest_framework import serializers
from .models import Profile, ScrapedItem, PriceHistory, WishList, CustomUser
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
        

class ScrapedItemSerializer(serializers.ModelSerializer):
    current_price = serializers.SerializerMethodField()
    
    class Meta:
        model = ScrapedItem
        fields = ['title', 'url', 'vendor', 'image_url', 'current_price']
        
    def get_current_price(self, obj):
        latest_price_obj = obj.price_history.first()
        if latest_price_obj:
            return latest_price_obj.price
        return None
        

class WishListSerializer(serializers.ModelSerializer):
    products = ScrapedItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = WishList
        fields = ['user', 'products']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    wishlist = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = ['user', 'profile_picture', 'bio', 'birth_date', 'phone_number', 'facebook_url', 'wishlist']
        
    def get_wishlist(self, obj):
        user_wishlist = WishList.objects.filter(user=obj.user).first()
        if user_wishlist:
            return WishListSerializer(user_wishlist).data
        return None