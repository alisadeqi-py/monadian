from django.db import models


class NewsletterSubscriber(models.Model):
    email = models.EmailField("ایمیل", unique=True)
    created_at = models.DateTimeField("تاریخ ثبت", auto_now_add=True)

    class Meta:
        verbose_name = "مشترک خبرنامه"
        verbose_name_plural = "مشترکین خبرنامه"
        ordering = ["-created_at"]

    def __str__(self):
        return self.email
