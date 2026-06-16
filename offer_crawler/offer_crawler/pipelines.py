import hashlib
from decimal import Decimal, InvalidOperation
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
from asgiref.sync import sync_to_async

from users.models import ScrapedItem, PriceHistory #type: ignore


class OfferCrawlerPipeline:

    # 1. بنعزل كل عمليات الداتابيز في دالة لوحدها ونحولها لـ Async
    @sync_to_async
    def save_item_to_db(self, adapter, product_url, item_hash, spider):
        scraped_item, created = ScrapedItem.objects.update_or_create(
            id=item_hash,
            defaults={
                "title": adapter.get("title", "No Title"),
                "url": product_url,
                "image_url": adapter.get("image"),
                "vendor": adapter.get("vendor", "Unknown"),
            },
        )

        price_str = adapter.get("price")
        if price_str:
            try:
                clean_price = Decimal(str(price_str).strip())
                PriceHistory.objects.create(item=scraped_item, price=clean_price)
            except InvalidOperation:
                spider.logger.error(
                    f"Invalid price format for {product_url}: {price_str}"
                )

    async def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        product_url = adapter.get("url")

        if product_url:
            item_hash = hashlib.md5(product_url.encode("utf-8")).hexdigest()
            adapter["id"] = item_hash

            await self.save_item_to_db(adapter, product_url, item_hash, spider)

        else:
            raise DropItem(f"Missing URL in item: {item}")

        return item
