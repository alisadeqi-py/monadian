import csv

from django.contrib import admin
from django.http import HttpResponse

from .models import NewsletterSubscriber


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    list_filter = ("created_at",)
    search_fields = ("email",)
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    list_per_page = 50
    readonly_fields = ("email", "created_at")
    actions = ("export_as_csv",)

    def has_add_permission(self, request):
        return False

    @admin.action(description="خروجی اکسل (CSV) از موارد انتخاب‌شده")
    def export_as_csv(self, request, queryset):
        response = HttpResponse(content_type="text/csv; charset=utf-8")
        response["Content-Disposition"] = 'attachment; filename="newsletter-subscribers.csv"'
        # Excel needs the BOM to read a UTF-8 CSV as UTF-8.
        response.write("\ufeff")
        writer = csv.writer(response)
        writer.writerow(["ایمیل", "تاریخ ثبت"])
        for obj in queryset:
            writer.writerow([obj.email, obj.created_at.strftime("%Y-%m-%d %H:%M")])
        return response
