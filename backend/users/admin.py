from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    list_display = ("email", "first_name", "last_name", "is_staff")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info",
            {"fields": ("username", "first_name", "last_name", "phone_number")},
        ),
        (
            "Permissions",
            {"fields": ("is_staff", "is_superuser", "groups", "user_permissions")},
        ),
        ("Import dates", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (None, {'classes': ('wide',),
                'fields': ('email', 'username', 'first_name', 'last_name', 'phone_number', 'password')})
    )

admin.site.register(CustomUser, CustomUserAdmin)