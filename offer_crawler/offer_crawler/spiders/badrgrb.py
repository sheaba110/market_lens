import scrapy
from scrapy_playwright.page import PageMethod


class BadrgrbSpider(scrapy.Spider):
    name = "badrgrb"
    allowed_domains = ["elbadrgroupeg.store"]

    def start_request(self):
        url = "https://elbadrgroupeg.store/index.php?route=product/catalog"
        yield scrapy.Request(
            url,
            meta={
                "playwright": True,
                "playwright_page_methods": [
                    PageMethod("wait_for_selector", "div.main-products"),
                ],
                "playwright_context": "default",
            },
        )

    def parse(self, response):

        pass
