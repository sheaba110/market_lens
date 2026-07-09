from rest_framework import pagination
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status, filters
from rest_framework.response import Response
from .models import ScrapedItem, WishList
from django_filters.rest_framework import DjangoFilterBackend
from users.serializers import (
    UserSerializer,
    UserProfileSerializer,
    ScrapedItemSerializer,
    WishListSerializer,
)
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model
from .filters import ProductFilter

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
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication,
        TokenAuthentication,
    ]
    status_code = 200

    def get_object(self):  # type: ignore
        return self.request.user.profile  # type: ignore


class UserProfileList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication,
        TokenAuthentication,
    ]
    pagination_class = pagination.PageNumberPagination

    status_code = 200

    def get_object(self):
        return self.request.user.profile  # type: ignore


class ItemDetailView(generics.RetrieveAPIView):
    queryset = ScrapedItem.objects.prefetch_related("price_history").all()
    serializer_class = ScrapedItemSerializer


class DashboardProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_class = [IsAuthenticated]
    queryset = User.objects.all() # type: ignore
    
    def get_object(self):
        return self.request.user.profile # type: ignore


class WishListView(generics.RetrieveUpdateAPIView):
    serializer_class = WishListSerializer
    permission_classes = [IsAuthenticated]
    queryset = WishList.objects.all()

    def post(self, request, item_id, *args, **kwargs):
        item = get_object_or_404(ScrapedItem, id=item_id)
        wishlist, created = self.get_queryset().get_or_create(user=request.user)  # type: ignore

        if item in wishlist.products.all():
            wishlist.products.remove(item)
            action = "removed"
            message = "Item removed successfully"
        else:
            wishlist.products.add(item)
            action = "added"
            message = "Item added successfully"

        return Response(
            {"action": action, "message": message}, status=status.HTTP_200_OK
        )

    def get_object(self):
        return self.request.user.profile  # type: ignore


class ItemsListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = ScrapedItem.objects.prefetch_related('price_history').all().distinct()
    serializer_class = ScrapedItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]    
    filterset_class = ProductFilter 
    search_fields = ['title']
    ordering_fields = ['created_at', 'price_history__price']
