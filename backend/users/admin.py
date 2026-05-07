from django.contrib import admin
from users.models import  Profile
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model


User = get_user_model()
class CustomUserAdmin(UserAdmin):
    list_display = ("username", "is_staff",)
    ordering = ("username",)

    fieldsets = (
        (None, {"fields": ("username", "password",)}),
        (
            "Personal info",
            {"fields": ("email",)},
        ),
        (
            "Permissions",
            {"fields": ("is_staff", "is_superuser", "groups", "user_permissions",)},
        ),
        ("Import dates", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (None, {'classes': ('wide',),
                'fields': ('email', 'username', 'password',)})
    )

admin.site.register(User, CustomUserAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['bio', 'profile_picture', 'birth_date','phone_number', 'facebook_url']
    list_display = ['user', 'bio', 'profile_picture', 'birth_date','phone_number', 'facebook_url']

admin.site.register(Profile, ProfileAdmin)