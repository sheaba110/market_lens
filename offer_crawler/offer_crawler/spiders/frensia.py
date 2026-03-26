import re
import scrapy
from scrapy.loader import ItemLoader
from offer_crawler.items import ItemsCrawler
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse


class FrensiaSpider(scrapy.Spider):
    name = "frensia"
    allowed_domains = ["alfrensia.com"]
    start_urls = ["https://alfrensia.com/en/special-offer/"]

    def parse(self, response):
        items = response.css("div.instock")
        for product in items:
            l = ItemLoader(item=ItemsCrawler(), selector=product)

            l.add_css("image", ".box-image img::attr(data-src)")
            l.add_css("title", ".product-title a::text")

            raw_price_texts = product.css(".price *::text").getall()
            numbers = [
                int(re.sub(r"[^\d]", "", text))
                for text in raw_price_texts
                if re.sub(r"[^\d]", "", text)
            ]
            if numbers:
                l.add_value("price", str(min(numbers)))

            l.add_value("vendor", "https://alfrensia.com")
            l.add_css("url", "a.woocommerce-LoopProduct-link::attr(href)")

            yield l.load_item()

            next_page = response.css('a.next::attr(href)').get()
            if next_page is not None:
                yield response.follow(next_page, callback=self.parse)


""" scrapy shell
item = response.css('div.instock').get()
image =  response.css("img").attrib["src"]
title = response.css('div.product-title').get()
price = response.css('span.price ins bdi::text').get()
vendor = https://alfrensia.com
url = response.css("a.woocommerce-LoopProduct-link::attr(href)").get()
"""
