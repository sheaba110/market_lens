# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
<<<<<<< HEAD
import hashlib
=======


>>>>>>> 2025198ffdce2bdef73cb58f36dc3462667fbe1b


class OfferCrawlerPipeline:

    def process_item(self, item, spider):
        product_url = item.get("url")

        if product_url:
            
                item["id"] = hashlib.md5(product_url.encode("utf-8")).hexdigest()
            
        return item
<<<<<<< HEAD
=======


>>>>>>> 2025198ffdce2bdef73cb58f36dc3462667fbe1b
