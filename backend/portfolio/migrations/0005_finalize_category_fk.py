from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0004_backfill_category_ref"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="portfolioitem",
            name="category",
        ),
        migrations.RenameField(
            model_name="portfolioitem",
            old_name="category_ref",
            new_name="category",
        ),
    ]
