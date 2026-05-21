from rest_framework import pagination
from django.shortcuts import render
from rest_framework import generics
from users.serializers import UserSerializer, UserProfileSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model
User = get_user_model()
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    status_code = 201
    

class UserProfile(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [JWTAuthentication, SessionAuthentication, TokenAuthentication]
    status_code = 200
    def get_object(self): # type: ignore
        return self.request.user.profile # type: ignore
    
class UserProfileList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [JWTAuthentication, SessionAuthentication, TokenAuthentication]
    pagination_class = pagination.PageNumberPagination

    status_code = 200
    def get_object(self):
        return self.request.user.profile # type: ignore