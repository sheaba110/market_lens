from django.shortcuts import render
from rest_framework import generics
# from rest_framework.response import Response
# from rest_framework import status
from users.serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user_model

User = get_user_model()
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

