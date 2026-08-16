import csv

from django.contrib import admin
from django.http import HttpResponse
from django.utils.html import format_html, format_html_join

from .models import CareerApplication


class DesiredRoleFilter(admin.SimpleListFilter):
    """Sidebar filter over desired_roles, which is a JSON list rather than a
    plain column."""

    title = "همکاری مد نظر"
    parameter_name = "role"

    def lookups(self, request, model_admin):
        known = list(CareerApplication.ROLE_CHOICES)
        # Roles that exist in submitted applications but are no longer offered
        # on the site — still worth filtering by, so they're listed after the
        # current ones instead of quietly disappearing from the sidebar.
        stored = {
            role
            for roles in model_admin.model.objects.values_list("desired_roles", flat=True)
            for role in (roles or [])
        }
        retired = sorted(stored - set(known))
        return [(role, role) for role in known + retired]

    def queryset(self, request, queryset):
        role = self.value()
        if not role:
            return queryset
        # Matched in Python rather than with a `desired_roles__contains`
        # lookup: JSONField containment isn't supported on SQLite (what local
        # dev runs on), and casting to text wouldn't help either, since the
        # SQLite backend stores Persian \u-escaped while Postgres stores it
        # literally. Application volume here is small enough that one pass
        # over the (already filtered) queryset is cheap and always correct.
        matching = [
            pk
            for pk, roles in queryset.values_list("pk", "desired_roles")
            if role in (roles or [])
        ]
        return queryset.filter(pk__in=matching)


@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "gender",
        "age",
        "phone_number",
        "roles_summary",
        "photo_thumbnail",
        "resume_link",
        "created_at",
        "is_reviewed",
    )
    list_display_links = ("full_name",)
    list_editable = ("is_reviewed",)
    list_filter = (
        "is_reviewed",
        "gender",
        DesiredRoleFilter,
        "marital_status",
        "created_at",
    )
    search_fields = ("full_name", "phone_number", "education", "virtual_contact")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    list_per_page = 25
    save_on_top = True
    actions = ("mark_reviewed", "mark_unreviewed", "export_as_csv")

    # An application is a record of what someone actually submitted, so the
    # change view shows it read-only; the review flag is the one thing staff
    # are meant to change. has_add_permission is off for the same reason —
    # rows only ever arrive through the public form.
    readonly_fields = (
        "full_name",
        "gender",
        "age",
        "phone_number",
        "marital_status",
        "education",
        "messengers_list",
        "virtual_contact",
        "roles_list",
        "photo_preview",
        "resume_link",
        "created_at",
    )

    fieldsets = (
        (
            "مشخصات فردی",
            {"fields": ("full_name", "gender", "age", "marital_status", "education")},
        ),
        (
            "راه‌های ارتباطی",
            {"fields": ("phone_number", "messengers_list", "virtual_contact")},
        ),
        ("درخواست همکاری", {"fields": ("roles_list",)}),
        ("مدارک", {"fields": ("photo_preview", "resume_link")}),
        ("وضعیت بررسی", {"fields": ("is_reviewed", "created_at")}),
    )

    def has_add_permission(self, request):
        return False

    @admin.display(description="همکاری مد نظر")
    def roles_summary(self, obj):
        roles = obj.desired_roles or []
        if not roles:
            return "—"
        # The full list is one badge per role in the change view; the
        # changelist only has room for the first, with a count for the rest.
        first, rest = roles[0], len(roles) - 1
        if not rest:
            return first
        return format_html("{} <span style=\"opacity:.6\">(+{})</span>", first, rest)

    @admin.display(description="همکاری مد نظر")
    def roles_list(self, obj):
        roles = obj.desired_roles or []
        if not roles:
            return "—"
        return format_html_join(
            " ",
            '<span style="display:inline-block;margin:2px;padding:3px 10px;'
            'border-radius:12px;background:#e8f0fe;color:#1a458e;font-size:12px;">{}</span>',
            ((role,) for role in roles),
        )

    @admin.display(description="پیام‌رسان‌ها")
    def messengers_list(self, obj):
        return "، ".join(obj.messengers or []) or "—"

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

    @admin.action(description="علامت‌گذاری به‌عنوان بررسی‌شده")
    def mark_reviewed(self, request, queryset):
        updated = queryset.update(is_reviewed=True)
        self.message_user(request, f"{updated} درخواست بررسی‌شده علامت خورد.")

    @admin.action(description="علامت‌گذاری به‌عنوان بررسی‌نشده")
    def mark_unreviewed(self, request, queryset):
        updated = queryset.update(is_reviewed=False)
        self.message_user(request, f"{updated} درخواست بررسی‌نشده علامت خورد.")

    @admin.action(description="خروجی اکسل (CSV) از موارد انتخاب‌شده")
    def export_as_csv(self, request, queryset):
        response = HttpResponse(content_type="text/csv; charset=utf-8")
        response["Content-Disposition"] = 'attachment; filename="career-applications.csv"'
        # Excel only reads a UTF-8 CSV as UTF-8 if it starts with a BOM;
        # without this the Persian columns open as mojibake.
        response.write("\ufeff")
        writer = csv.writer(response)
        writer.writerow(
            [
                "نام و نام خانوادگی",
                "جنسیت",
                "سن",
                "شماره تلفن",
                "وضعیت تأهل",
                "تحصیلات",
                "پیام‌رسان‌ها",
                "تماس مجازی",
                "همکاری مد نظر",
                "بررسی شده",
                "تاریخ ثبت",
            ]
        )
        for obj in queryset:
            writer.writerow(
                [
                    obj.full_name,
                    obj.gender,
                    obj.age,
                    obj.phone_number,
                    obj.marital_status,
                    obj.education,
                    "، ".join(obj.messengers or []),
                    obj.virtual_contact,
                    "، ".join(obj.desired_roles or []),
                    "بله" if obj.is_reviewed else "خیر",
                    obj.created_at.strftime("%Y-%m-%d %H:%M"),
                ]
            )
        return response
