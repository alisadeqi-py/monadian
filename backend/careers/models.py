from django.db import models


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
    virtual_contact = models.TextField("شماره تماس مجازی با ذکر نام پیام‌رسان")
    marital_status = models.CharField(
        "وضعیت تأهل", max_length=10, choices=MARITAL_CHOICES
    )
    education = models.TextField("میزان تحصیلات، رشته و نام دانشگاه")
    desired_roles = models.JSONField("همکاری مد نظر", default=list, blank=True)
    is_reviewed = models.BooleanField("بررسی شده", default=False)
    created_at = models.DateTimeField("تاریخ ثبت", auto_now_add=True)

    class Meta:
        verbose_name = "درخواست همکاری"
        verbose_name_plural = "درخواست‌های همکاری"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} ({self.created_at:%Y-%m-%d})"
