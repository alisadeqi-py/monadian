from django.contrib import admin
from django.utils.html import format_html

from .models import CareerApplication


@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone_number",
        "marital_status",
        "photo_thumbnail",
        "resume_link",
        "created_at",
        "is_reviewed",
    )
    list_editable = ("is_reviewed",)
    list_filter = ("is_reviewed", "marital_status", "created_at")
    search_fields = ("full_name", "phone_number", "education", "virtual_contact")
    readonly_fields = ("created_at", "photo_preview")
    ordering = ("-created_at",)

    @admin.display(description="عکس")
    def photo_thumbnail(self, obj):
        if not obj.photo:
            return "—"
        return format_html(
            '<img src="{}" style="height:40px;width:40px;object-fit:cover;border-radius:6px;" />',
            obj.photo.url,
        )

    @admin.display(description="عکس")
    def photo_preview(self, obj):
        if not obj.photo:
            return "—"
        return format_html(
            '<a href="{0}" target="_blank"><img src="{0}" style="max-height:220px;border-radius:8px;" /></a>',
            obj.photo.url,
        )

    @admin.display(description="رزومه")
    def resume_link(self, obj):
        if not obj.resume:
            return "—"
        return format_html('<a href="{}" target="_blank">دانلود رزومه</a>', obj.resume.url)
