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

    class Meta:
        model = CareerApplication
        fields = [
            "id",
            "full_name",
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
