from django.contrib import admin

from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone_number", "message_preview", "created_at", "is_reviewed")
    list_display_links = ("full_name",)
    list_editable = ("is_reviewed",)
    list_filter = ("is_reviewed", "created_at")
    search_fields = ("full_name", "phone_number", "message")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    list_per_page = 25
    save_on_top = True
    actions = ("mark_reviewed", "mark_unreviewed")

    # Same reasoning as the careers admin: a submission is a record of what a
    # visitor actually sent, so only the review flag is editable and rows can
    # only arrive through the public form.
    readonly_fields = ("full_name", "phone_number", "message", "created_at")

    fieldsets = (
        ("فرستنده", {"fields": ("full_name", "phone_number")}),
        ("پیام", {"fields": ("message",)}),
        ("وضعیت بررسی", {"fields": ("is_reviewed", "created_at")}),
    )

    def has_add_permission(self, request):
        return False

    @admin.display(description="متن درخواست")
    def message_preview(self, obj):
        if not obj.message:
            return "—"
        text = obj.message.strip().replace("\n", " ")
        return text if len(text) <= 60 else f"{text[:60]}…"

    @admin.action(description="علامت‌گذاری به‌عنوان بررسی‌شده")
    def mark_reviewed(self, request, queryset):
        updated = queryset.update(is_reviewed=True)
        self.message_user(request, f"{updated} درخواست بررسی‌شده علامت خورد.")

    @admin.action(description="علامت‌گذاری به‌عنوان بررسی‌نشده")
    def mark_unreviewed(self, request, queryset):
        updated = queryset.update(is_reviewed=False)
        self.message_user(request, f"{updated} درخواست بررسی‌نشده علامت خورد.")
