import json

from rest_framework import serializers

from .models import CareerApplication


class JSONOrEncodedStringField(serializers.JSONField):
    """Accepts either a native list (plain JSON request body) or a
    JSON-encoded string (multipart/form-data has no array type, so the
    frontend sends these as a single JSON.stringify'd form field instead)."""

    def to_internal_value(self, data):
        if isinstance(data, str):
            try:
                data = json.loads(data)
            except ValueError:
                pass
        return super().to_internal_value(data)


class CareerApplicationSerializer(serializers.ModelSerializer):
    messengers = JSONOrEncodedStringField()
    desired_roles = JSONOrEncodedStringField()
    full_name = serializers.CharField(
        max_length=150,
        error_messages={
            "required": "لطفاً نام و نام خانوادگی را وارد کنید.",
            "blank": "لطفاً نام و نام خانوادگی را وارد کنید.",
        },
    )
    gender = serializers.ChoiceField(
        choices=CareerApplication.GENDER_CHOICES,
        error_messages={
            "required": "جنسیت را انتخاب کنید.",
            "invalid_choice": "جنسیت را انتخاب کنید.",
        },
    )
    age = serializers.IntegerField(
        min_value=10,
        max_value=90,
        error_messages={
            "required": "سن را به‌صورت عدد صحیح و معتبر وارد کنید.",
            "invalid": "سن را به‌صورت عدد صحیح و معتبر وارد کنید.",
            "min_value": "سن وارد شده معتبر نیست.",
            "max_value": "سن وارد شده معتبر نیست.",
        },
    )
    phone_number = serializers.CharField(
        max_length=20,
        error_messages={
            "required": "شماره تلفن همراه معتبر وارد کنید.",
            "blank": "شماره تلفن همراه معتبر وارد کنید.",
        },
    )
    marital_status = serializers.ChoiceField(
        choices=CareerApplication.MARITAL_CHOICES,
        error_messages={
            "required": "وضعیت تأهل را انتخاب کنید.",
            "invalid_choice": "وضعیت تأهل را انتخاب کنید.",
        },
    )
    education = serializers.CharField(
        error_messages={
            "required": "لطفاً میزان تحصیلات را وارد کنید.",
            "blank": "لطفاً میزان تحصیلات را وارد کنید.",
        },
    )
    photo = serializers.ImageField(
        error_messages={
            "required": "لطفاً یک عکس آپلود کنید.",
            "invalid_image": "فایل انتخاب‌شده یک تصویر معتبر نیست.",
        },
    )

    class Meta:
        model = CareerApplication
        fields = [
            "id",
            "full_name",
            "gender",
            "age",
            "phone_number",
            "messengers",
            "virtual_contact",
            "marital_status",
            "education",
            "desired_roles",
            "resume",
            "photo",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
