from django.contrib import admin

from .models import CareerApplication


@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone_number", "marital_status", "created_at", "is_reviewed")
    list_editable = ("is_reviewed",)
    list_filter = ("is_reviewed", "marital_status", "created_at")
    search_fields = ("full_name", "phone_number", "education", "virtual_contact")
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)
