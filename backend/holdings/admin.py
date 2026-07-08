from django.contrib import admin

from .models import HoldingCompany


@admin.register(HoldingCompany)
class HoldingCompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name",)
    ordering = ("order", "name")
