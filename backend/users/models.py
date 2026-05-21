from django.db import models
from django.db.models.signals import post_save
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
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects: CustomUserManager = CustomUserManager()  # type: ignore

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="profile"
    )
    profile_picture = models.ImageField(
        null=True, blank=True, default="default.jpg", upload_to="profile_pics"
    )
    bio = models.TextField(max_length=255, blank=True, editable=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(
        max_length=20, blank=True, default='', editable=True
    )
    facebook_url = models.URLField(blank=True, editable=True)

    def __str__(self):
        return f"{self.user.username} Profile"

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
post_save.connect(create_user_profile, sender=CustomUser)
post_save.connect(save_user_profile, sender=CustomUser)