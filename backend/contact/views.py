from rest_framework import generics, permissions, throttling

from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer


class ContactSubmissionCreateView(generics.CreateAPIView):
    """Public endpoint the frontend contact form (شماره تماس / ثبت درخواست) posts to."""

    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [throttling.ScopedRateThrottle]
    throttle_scope = "contact"
