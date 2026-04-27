from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=150, unique=True, blank=False, editable=True)
    username = models.CharField(max_length=155, unique=True, blank=False, editable=True)
    phone_number = models.CharField(max_length=20, unique=True, blank=False, editable=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects: CustomUserManager = CustomUserManager() # type: ignore
    
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "phone_number"]

    def __str__(self):
        return self.username
    
