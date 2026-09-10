from decimal import Decimal, InvalidOperation

from asgiref.sync import sync_to_async
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem

from users.models import ScrapedItem, PriceHistory  # type: ignore


class OfferCrawlerPipeline:

    @sync_to_async
    def save_item_to_db(
        self,
        adapter: ItemAdapter,
        product_url: str,
        spider,
    ):
        scraped_items, created = ScrapedItem.objects.update_or_create(
            url=product_url,
            defaults={
                "title": adapter.get("title") or "No Title",
                "url": product_url,
                "image_url": adapter.get("image"),
                "vendor": adapter.get("vendor") or "No Vendor",
            },
        )

        price_value = adapter.get("price")

        if price_value in (None, ""):
            return

        try:
            clean_price = Decimal(str(price_value).strip())

        except (InvalidOperation, ValueError, TypeError):
            spider.logger.error(
                f"Invalid price format for {product_url}: {price_value}"
            )
            return

        latest_price = (
            PriceHistory.objects
            .filter(item=scraped_items)
            .order_by("-scraped_at")
            .first()
        )

        if latest_price is None or latest_price.price != clean_price:
            PriceHistory.objects.create(
                item=scraped_items,
                price=clean_price,
            )

    async def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        product_url = adapter.get("url")

        if not product_url:
            raise DropItem(f"Missing URL in item: {item}")

        await self.save_item_to_db(
            adapter,
            product_url,
            spider,
        )

        return item
