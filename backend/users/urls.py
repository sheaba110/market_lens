from django.urls import path
from rest_framework import routers
from .views import CreateUserView, UserListView

urlpatterns = [
    path ('register/', CreateUserView.as_view(), name='create-user'),
    path('users/', UserListView.as_view(), name='users-list')
]