# Generated manually to keep the model and database schema aligned.

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("users", "0005_wishlist")]

    operations = [
        migrations.RenameField(
            model_name="wishlist",
            old_name="product",
            new_name="products",
        ),
        migrations.AddIndex(
            model_name="pricehistory",
            index=models.Index(fields=["item", "-scraped_at"], name="price_item_scraped_idx"),
        ),
    ]
