from rest_framework import generics, permissions, throttling

from .models import CareerApplication
from .serializers import CareerApplicationSerializer


class CareerApplicationCreateView(generics.CreateAPIView):
    """Public endpoint the careers page's application form (همکاری با ما) posts to."""

    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [throttling.ScopedRateThrottle]
    throttle_scope = "careers"
