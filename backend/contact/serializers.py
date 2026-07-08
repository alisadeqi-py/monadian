from rest_framework import serializers

from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ["id", "phone_number", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
