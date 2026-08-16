from django.contrib import admin
from django.utils.html import format_html

from .models import HoldingCompany


@admin.register(HoldingCompany)
class HoldingCompanyAdmin(admin.ModelAdmin):
    list_display = ("logo_thumbnail", "name", "url", "order", "is_active")
    list_display_links = ("name",)
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "description")
    ordering = ("order", "name")
    save_on_top = True
    readonly_fields = ("logo_preview",)

    fieldsets = (
        ("شرکت", {"fields": ("name", "description", "url")}),
        ("لوگو", {"fields": ("logo", "logo_preview")}),
        ("نمایش در سایت", {"fields": ("order", "is_active")}),
    )

    @admin.display(description="لوگو")
    def logo_thumbnail(self, obj):
        if not obj.logo:
            return "—"
        return format_html(
            '<img src="{}" style="height:34px;max-width:90px;object-fit:contain;" />',
            obj.logo.url,
        )

    @admin.display(description="پیش‌نمایش لوگو")
    def logo_preview(self, obj):
        if not obj.logo:
            return "—"
        return format_html(
            '<a href="{0}" target="_blank"><img src="{0}" style="max-height:140px;" /></a>',
            obj.logo.url,
        )
