from django.contrib import admin

from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone_number", "created_at", "is_reviewed")
    list_editable = ("is_reviewed",)
    list_filter = ("is_reviewed", "created_at")
    search_fields = ("full_name", "phone_number", "message")
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)
