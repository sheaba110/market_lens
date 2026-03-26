import scrapy
from scrapy_playwright.page import PageMethod
from scrapy.spiders import CrawlSpider, Rule
from itemloaders.processors import MapCompose
from ..items import ItemsCrawler
from scrapy.loader import ItemLoader
import re


def extract_price_number(text):
    if text:

        match = re.search(r"[\d,]+(?:\.\d+)?", text)
        if match:

            return match.group(0).replace(",", "")
    return text


class BadrgrbSpider(scrapy.Spider):
    name = "badrgrb"
    allowed_domains = ["elbadrgroupeg.store"]

    def start_requests(self):
        urls = [
            "https://elbadrgroupeg.store/index.php?route=product/catalog",
            "https://elbadrgroupeg.store/index.php?route=product/special",
        ]
        for url in urls:
            yield scrapy.Request(
                url=url,
                callback=self.parse_item,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        PageMethod("wait_for_selector", "div.main-products"),
                    ],
                    "playwright_context": "default",
                },
            )

    def parse_item(self, response):
        items = response.css("div.product-layout")
        for product in items:
            l = ItemLoader(item=ItemsCrawler(), selector=product)
            l.add_css("title", "div.name a::text")
            l.add_css("image", "img.img-responsive::attr(src)", MapCompose(response.urljoin))
            l.add_css("url", "a::attr(href)", MapCompose(response.urljoin))
            l.add_value("vendor", "elbadrgroupeg.store")
            l.add_css("price", "div.price *::text", MapCompose(extract_price_number))
            yield l.load_item()
