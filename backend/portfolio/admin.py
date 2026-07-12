from django.contrib import admin

from .models import PortfolioCategory, PortfolioImage, PortfolioItem, PortfolioService


class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 1


class PortfolioServiceInline(admin.TabularInline):
    model = PortfolioService
    extra = 1


@admin.register(PortfolioCategory)
class PortfolioCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    list_editable = ("order",)
    search_fields = ("name",)
    ordering = ("order", "name")


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "client", "date", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "category")
    search_fields = ("title", "category__name", "client")
    ordering = ("order", "-id")
    inlines = [PortfolioServiceInline, PortfolioImageInline]
