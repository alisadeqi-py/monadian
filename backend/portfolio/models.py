from django.db import models


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
    link = models.URLField("لینک", blank=True)
    order = models.PositiveIntegerField("ترتیب نمایش", default=0)
    is_active = models.BooleanField("فعال", default=True)

    class Meta:
        verbose_name = "نمونه کار"
        verbose_name_plural = "نمونه کارها"
        ordering = ["order", "-id"]

    def __str__(self):
        return self.title


class PortfolioImage(models.Model):
    portfolio_item = models.ForeignKey(
        PortfolioItem, related_name="images", on_delete=models.CASCADE, verbose_name="نمونه کار"
    )
    image = models.ImageField("تصویر", upload_to="portfolio/gallery/")
    order = models.PositiveIntegerField("ترتیب نمایش", default=0)

    class Meta:
        verbose_name = "تصویر گالری"
        verbose_name_plural = "تصاویر گالری"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.portfolio_item.title} - {self.order}"
