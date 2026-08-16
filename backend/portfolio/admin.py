from django.contrib import admin
from django.utils.html import format_html

from .models import PortfolioCategory, PortfolioImage, PortfolioItem, PortfolioService


class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 1
    fields = ("image", "image_thumbnail", "caption", "order")
    readonly_fields = ("image_thumbnail",)

    @admin.display(description="پیش‌نمایش")
    def image_thumbnail(self, obj):
        if not obj.image:
            return "—"
        return format_html(
            '<img src="{}" style="height:48px;border-radius:4px;" />', obj.image.url
        )


class PortfolioServiceInline(admin.TabularInline):
    model = PortfolioService
    extra = 1


@admin.register(PortfolioCategory)
class PortfolioCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "item_count", "order")
    list_display_links = ("name",)
    list_editable = ("order",)
    search_fields = ("name",)
    ordering = ("order", "name")

    @admin.display(description="تعداد نمونه کار")
    def item_count(self, obj):
        return obj.items.count()


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = (
        "image_thumbnail",
        "title",
        "category",
        "client",
        "date",
        "order",
        "is_active",
    )
    list_display_links = ("title",)
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "category")
    search_fields = ("title", "category__name", "client", "description")
    list_select_related = ("category",)
    ordering = ("order", "-id")
    save_on_top = True
    inlines = [PortfolioServiceInline, PortfolioImageInline]
    readonly_fields = ("image_preview",)

    fieldsets = (
        ("اطلاعات پروژه", {"fields": ("title", "category", "client", "date", "description")}),
        ("تصویر شاخص", {"fields": ("image", "image_preview")}),
        (
            "ویدیو",
            {
                "fields": ("video", "aparat_embed_code"),
                "description": "فقط یکی از این دو مورد را پر کنید: فایل ویدیو یا کد embed آپارات.",
            },
        ),
        ("نمایش در سایت", {"fields": ("link", "order", "is_active")}),
    )

    @admin.display(description="تصویر")
    def image_thumbnail(self, obj):
        if not obj.image:
            return "—"
        return format_html(
            '<img src="{}" style="height:40px;width:60px;object-fit:cover;border-radius:4px;" />',
            obj.image.url,
        )

    @admin.display(description="پیش‌نمایش تصویر")
    def image_preview(self, obj):
        if not obj.image:
            return "—"
        return format_html(
            '<a href="{0}" target="_blank"><img src="{0}" style="max-height:220px;border-radius:8px;" /></a>',
            obj.image.url,
        )
