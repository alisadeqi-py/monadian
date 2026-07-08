from rest_framework import serializers

from .models import PortfolioImage, PortfolioItem


class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ["id", "image", "order"]


class PortfolioItemSerializer(serializers.ModelSerializer):
    images = PortfolioImageSerializer(many=True, read_only=True)
    category = serializers.CharField(source="category.name", default="", read_only=True)

    class Meta:
        model = PortfolioItem
        fields = [
            "id",
            "category",
            "title",
            "image",
            "description",
            "video",
            "images",
            "link",
            "order",
        ]
