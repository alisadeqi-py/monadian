from django.urls import path

from .views import NewsletterSubscribeView

urlpatterns = [
    path("", NewsletterSubscribeView.as_view(), name="newsletter-subscribe"),
]
