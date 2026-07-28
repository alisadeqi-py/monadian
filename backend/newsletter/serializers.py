from rest_framework import serializers

from .models import NewsletterSubscriber


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    # Re-declared without the model field's implicit UniqueValidator so
    # re-subscribing an existing email succeeds (see perform_create).
    email = serializers.EmailField(
        error_messages={
            "required": "لطفاً یک ایمیل وارد کنید.",
            "blank": "لطفاً یک ایمیل وارد کنید.",
            "invalid": "لطفاً یک ایمیل معتبر وارد کنید.",
        }
    )

    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "created_at"]
        read_only_fields = ["id", "created_at"]
