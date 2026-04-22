from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from users.serializers import UserSerializer
from users.models import CustomUser
from rest_framework.permissions import AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserListView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]