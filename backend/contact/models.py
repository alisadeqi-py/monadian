from django.db import models


class ContactSubmission(models.Model):
    full_name = models.CharField("نام و نام خانوادگی", max_length=150, blank=True)
    phone_number = models.CharField("شماره تماس", max_length=20)
    message = models.TextField("متن درخواست", blank=True)
    is_reviewed = models.BooleanField("بررسی شده", default=False)
    created_at = models.DateTimeField("تاریخ ثبت", auto_now_add=True)

    class Meta:
        verbose_name = "درخواست تماس"
        verbose_name_plural = "درخواست‌های تماس"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.phone_number} ({self.created_at:%Y-%m-%d})"
