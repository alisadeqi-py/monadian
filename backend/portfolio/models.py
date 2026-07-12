import re

from django.core.exceptions import ValidationError
from django.db import models

APARAT_SRC_RE = re.compile(r"""src=["']([^"']+)["']""")


class PortfolioCategory(models.Model):
    name = models.CharField("نام دسته‌بندی", max_length=100, unique=True)
    order = models.PositiveIntegerField("ترتیب نمایش", default=0)

    class Meta:
        verbose_name = "دسته‌بندی نمونه کار"
        verbose_name_plural = "دسته‌بندی‌های نمونه کار"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class PortfolioItem(models.Model):
    category = models.ForeignKey(
        PortfolioCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="items",
        verbose_name="دسته‌بندی",
    )
    title = models.CharField("عنوان", max_length=300)
    image = models.ImageField("تصویر", upload_to="portfolio/", blank=True, null=True)
    description = models.TextField("توضیحات", blank=True)
    video = models.FileField("ویدیو", upload_to="portfolio/videos/", blank=True, null=True)
    aparat_embed_code = models.TextField(
        "کد embed آپارات",
        blank=True,
        help_text="کد embed کامل آپارات را از دکمه اشتراک‌گذاری در آپارات کپی و اینجا paste کنید",
    )
    link = models.URLField("لینک", blank=True)
    date = models.CharField(
        "تاریخ انجام پروژه", max_length=100, blank=True, help_text="مثال: بهار سال ۱۴۰۵"
    )
    client = models.CharField("کارفرما", max_length=200, blank=True)
    order = models.PositiveIntegerField("ترتیب نمایش", default=0)
    is_active = models.BooleanField("فعال", default=True)

    class Meta:
        verbose_name = "نمونه کار"
        verbose_name_plural = "نمونه کارها"
        ordering = ["order", "-id"]

    def __str__(self):
        return self.title

    def clean(self):
        if self.video and self.aparat_embed_code:
            raise ValidationError(
                "فقط یکی از این دو مورد را می‌توانید ثبت کنید: فایل ویدیو یا کد embed آپارات."
            )

    @property
    def aparat_src(self):
        if not self.aparat_embed_code:
            return ""
        match = APARAT_SRC_RE.search(self.aparat_embed_code)
        return match.group(1) if match else ""


class PortfolioImage(models.Model):
    portfolio_item = models.ForeignKey(
        PortfolioItem, related_name="images", on_delete=models.CASCADE, verbose_name="نمونه کار"
    )
    image = models.ImageField("تصویر", upload_to="portfolio/gallery/")
    caption = models.CharField("توضیحات تصویر", max_length=300, blank=True)
    order = models.PositiveIntegerField("ترتیب نمایش", default=0)

    class Meta:
        verbose_name = "تصویر گالری"
        verbose_name_plural = "تصاویر گالری"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.portfolio_item.title} - {self.order}"


class PortfolioService(models.Model):
    portfolio_item = models.ForeignKey(
        PortfolioItem, related_name="services", on_delete=models.CASCADE, verbose_name="نمونه کار"
    )
    title = models.CharField("عنوان خدمت", max_length=200)
    order = models.PositiveIntegerField("ترتیب نمایش", default=0)

    class Meta:
        verbose_name = "خدمت ارائه شده"
        verbose_name_plural = "لیست خدمات ارائه شده"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.portfolio_item.title} - {self.title}"
