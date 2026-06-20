from django.urls import path
from .views import (
    UserCreateView,
    UserProfile,
    UserProfileList,
    ItemDetailView,
    ItemsListView,
    DashboardProfileView,
    WishListView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="create-user"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", UserProfileList.as_view(), name="profiles"),
    path("profile/<int:id>/", UserProfile.as_view(), name="profile"),
    path("products/", ItemsListView.as_view(), name="products"),
    path("products/<uuid:pk>/", ItemDetailView.as_view(), name="product-detail"),
    path("dashboard/profile/", DashboardProfileView.as_view(), name="dashboard"),
    path("wishlist/toggle/<uuid:item_id>/", WishListView.as_view(),name="wishlist-toggle"),
]
