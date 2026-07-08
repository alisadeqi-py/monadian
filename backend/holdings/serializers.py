from rest_framework import serializers

from .models import HoldingCompany


class HoldingCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = HoldingCompany
        fields = ["id", "name", "logo", "description", "order"]
