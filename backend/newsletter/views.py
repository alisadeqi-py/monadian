from rest_framework import generics, permissions, throttling

from .models import NewsletterSubscriber
from .serializers import NewsletterSubscriberSerializer


class NewsletterSubscribeView(generics.CreateAPIView):
    """Public endpoint the footer's "خبرنامه ما" email signup posts to."""

    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [throttling.ScopedRateThrottle]
    throttle_scope = "newsletter"

    def perform_create(self, serializer):
        serializer.instance, _ = NewsletterSubscriber.objects.get_or_create(
            email=serializer.validated_data["email"]
        )
