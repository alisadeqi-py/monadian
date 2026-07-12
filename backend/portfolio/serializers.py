from rest_framework import serializers

from .models import PortfolioImage, PortfolioItem, PortfolioService


class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ["id", "image", "caption", "order"]


class PortfolioServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioService
        fields = ["id", "title", "order"]


class PortfolioItemSerializer(serializers.ModelSerializer):
    images = PortfolioImageSerializer(many=True, read_only=True)
    services = PortfolioServiceSerializer(many=True, read_only=True)
    category = serializers.CharField(source="category.name", default="", read_only=True)
    aparat_src = serializers.ReadOnlyField()

    class Meta:
        model = PortfolioItem
        fields = [
            "id",
            "category",
            "title",
            "image",
            "description",
            "video",
            "aparat_src",
            "images",
            "services",
            "date",
            "client",
            "link",
            "order",
        ]
