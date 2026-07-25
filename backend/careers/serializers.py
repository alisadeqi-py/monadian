from rest_framework import serializers

from .models import CareerApplication


class CareerApplicationSerializer(serializers.ModelSerializer):
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
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
