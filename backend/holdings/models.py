from django.db import models


class HoldingCompany(models.Model):
    name = models.CharField("نام شرکت", max_length=200)
    logo = models.ImageField("لوگو", upload_to="holdings/", blank=True, null=True)
    description = models.TextField("توضیحات", blank=True)
    order = models.PositiveIntegerField("ترتیب نمایش", default=0)
    is_active = models.BooleanField("فعال", default=True)

    class Meta:
        verbose_name = "شرکت هلدینگ"
        verbose_name_plural = "شرکت‌های هلدینگ"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name
