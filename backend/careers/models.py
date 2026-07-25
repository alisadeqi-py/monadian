from django.core.validators import FileExtensionValidator
from django.db import models


def resume_upload_path(instance, filename):
    return f"careers/resumes/{filename}"


def photo_upload_path(instance, filename):
    return f"careers/photos/{filename}"


class CareerApplication(models.Model):
    MARITAL_CHOICES = [
        ("مجرد", "مجرد"),
        ("متأهل", "متأهل"),
        ("سایر", "سایر"),
    ]

    full_name = models.CharField("نام و نام خانوادگی", max_length=150)
    age = models.PositiveSmallIntegerField("سن")
    phone_number = models.CharField("شماره تلفن", max_length=20)
    messengers = models.JSONField("پیام‌رسان‌های فعال", default=list, blank=True)
    # Not required - some applicants only have one messenger, or none they
    # can be reached on virtually, and shouldn't be blocked from applying.
    virtual_contact = models.TextField(
        "شماره تماس مجازی با ذکر نام پیام‌رسان", blank=True
    )
    marital_status = models.CharField(
        "وضعیت تأهل", max_length=10, choices=MARITAL_CHOICES
    )
    education = models.TextField("میزان تحصیلات، رشته و نام دانشگاه")
    desired_roles = models.JSONField("همکاری مد نظر", default=list, blank=True)
    resume = models.FileField(
        "رزومه",
        upload_to=resume_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=["pdf", "doc", "docx"])],
        blank=True,
        null=True,
    )
    photo = models.ImageField("عکس", upload_to=photo_upload_path)
    is_reviewed = models.BooleanField("بررسی شده", default=False)
    created_at = models.DateTimeField("تاریخ ثبت", auto_now_add=True)

    class Meta:
        verbose_name = "درخواست همکاری"
        verbose_name_plural = "درخواست‌های همکاری"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} ({self.created_at:%Y-%m-%d})"
