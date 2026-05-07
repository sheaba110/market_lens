# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import hashlib


class OfferCrawlerPipeline:

    def process_item(self, item, spider):
        product_url = item.get("url")

        if product_url:
            
                item["id"] = hashlib.md5(product_url.encode("utf-8")).hexdigest()
            
        return item
