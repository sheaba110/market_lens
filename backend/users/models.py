from django.db import models
import uuid
from django.contrib.postgres.indexes import GinIndex
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
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.ImageField(null=True, blank=True, default="default.jpg", upload_to="profile_pics")
    bio = models.TextField(max_length=255, blank=True, editable=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, unique=True, blank=True, null=True)
    facebook_url = models.URLField(blank=True, editable=True)

    def __str__(self):
        return f"{self.user.username} Profile"


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class ScrapedItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=1000)
    url = models.URLField(unique=True, max_length=1000)
    vendor = models.CharField(max_length=100)
    image_url = models.URLField(max_length=1000, null=True, blank=True)
    
    raw_features = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'scraped_items'
        indexes = [
            models.Index(fields=['url']),
            models.Index(fields=['vendor']),
            GinIndex(fields=['raw_features']), 
        ]

    def __str__(self):
        return self.title
class PriceHistory(models.Model):
    item = models.ForeignKey(ScrapedItem, on_delete=models.CASCADE, related_name='price_history')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    is_in_stock = models.BooleanField(default=True)
    scraped_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'price_history'
        ordering = ['-scraped_at']
        indexes = [
            models.Index(fields=['scraped_at']),
        ]

    def __str__(self):
        return f"{self.item.title} - {self.price}"
    
    
class WishList(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    product = models.ManyToManyField(ScrapedItem, blank=True)
    def __str__(self):
        return f"Wishlist of {self.user.username}"
    

post_save.connect(create_user_profile, sender=CustomUser)
post_save.connect(save_user_profile, sender=CustomUser)