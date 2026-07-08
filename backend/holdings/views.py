from rest_framework import generics, permissions

from .models import HoldingCompany
from .serializers import HoldingCompanySerializer


class HoldingCompanyListView(generics.ListAPIView):
    """Public read-only list backing the "دیگر شرکت‌های هلدینگ ما" section."""

    queryset = HoldingCompany.objects.filter(is_active=True)
    serializer_class = HoldingCompanySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None
