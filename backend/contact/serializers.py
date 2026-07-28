from rest_framework import serializers

from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(
        max_length=20,
        error_messages={
            "required": "لطفاً شماره تماس را وارد کنید.",
            "blank": "لطفاً شماره تماس را وارد کنید.",
            "max_length": "شماره تماس واردشده معتبر نیست.",
        },
    )

    class Meta:
        model = ContactSubmission
        fields = ["id", "full_name", "phone_number", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
