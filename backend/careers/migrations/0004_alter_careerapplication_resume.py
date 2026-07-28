import careers.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("careers", "0003_alter_careerapplication_photo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="careerapplication",
            name="resume",
            field=models.FileField(
                blank=True,
                null=True,
                upload_to=careers.models.resume_upload_path,
                validators=[
                    django.core.validators.FileExtensionValidator(
                        allowed_extensions=["pdf", "doc", "docx"],
                        message="فرمت رزومه نامعتبر است. لطفاً فایل PDF یا Word (doc, docx) آپلود کنید.",
                    )
                ],
                verbose_name="رزومه",
            ),
        ),
    ]
