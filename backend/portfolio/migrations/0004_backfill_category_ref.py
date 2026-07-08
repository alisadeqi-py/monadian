from django.db import migrations


def forwards(apps, schema_editor):
    PortfolioItem = apps.get_model("portfolio", "PortfolioItem")
    PortfolioCategory = apps.get_model("portfolio", "PortfolioCategory")

    order = 0
    for item in PortfolioItem.objects.all():
        name = (item.category or "").strip()
        if not name:
            continue
        category, created = PortfolioCategory.objects.get_or_create(
            name=name, defaults={"order": order}
        )
        if created:
            order += 1
        item.category_ref = category
        item.save(update_fields=["category_ref"])


def backwards(apps, schema_editor):
    PortfolioItem = apps.get_model("portfolio", "PortfolioItem")
    for item in PortfolioItem.objects.all():
        if item.category_ref_id:
            item.category = item.category_ref.name
            item.save(update_fields=["category"])


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0003_portfoliocategory_alter_portfolioitem_category_and_more"),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
