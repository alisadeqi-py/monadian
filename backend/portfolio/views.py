from rest_framework import generics, permissions

from .models import PortfolioItem
from .serializers import PortfolioItemSerializer


class PortfolioItemListView(generics.ListAPIView):
    """Public read-only list backing the "نمونه کار ها و فعالیت ها" section."""

    queryset = PortfolioItem.objects.filter(is_active=True).select_related("category").prefetch_related("images")
    serializer_class = PortfolioItemSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class PortfolioItemDetailView(generics.RetrieveAPIView):
    """Public read-only detail view backing the portfolio detail page."""

    queryset = PortfolioItem.objects.filter(is_active=True).select_related("category").prefetch_related("images")
    serializer_class = PortfolioItemSerializer
    permission_classes = [permissions.AllowAny]
