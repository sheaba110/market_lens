import re
import scrapy
from scrapy.loader import ItemLoader
from scrapy_playwright.page import PageMethod
from ..items import ItemsCrawler

infinite_scroll = """async () => {
    let previousHeight = 0;

    while (true) {
        window.scrollTo(0, document.body.scrollHeight);

        await new Promise(resolve => setTimeout(resolve, 2500));

        const currentHeight = document.body.scrollHeight;

        if (currentHeight === previousHeight) {
            break;
        }

        previousHeight = currentHeight;
    }
}"""

class HardwaremarketNetSpider(scrapy.Spider):
    name = "hardwaremarket"
    allowed_domains = ["hardwaremarket.net"]

    async def start(self):
        yield scrapy.Request(
            url="https://hardwaremarket.net/shop/",
            callback=self.parse_item,
            meta={
                "playwright": True,
                "playwright_context": "default",
                "playwright_page_methods": [
                    PageMethod("wait_for_load_state", "networkidle"),
                    PageMethod(
                        "evaluate", infinite_scroll
                    ),
                    PageMethod("wait_for_timeout", 3000),
                    PageMethod(
                        "wait_for_selector",
                        "div.wd-products div.wd-col",
                        timeout=30000,
                    ),
                ],
            },
        )

    def parse_item(self, response):
        self.logger.info("Status: %s", response.status)
        self.logger.info(
            "Products found: %d", len(response.css("div.wd-products div.wd-col"))
        )

        products = response.css("div.wd-products div.wd-col")

        for product in products:
            loader = ItemLoader(item=ItemsCrawler(), selector=product)

            loader.add_css(
                "image",
                "div.wd-product-wrapper img::attr(data-src), "
                "div.wd-product-wrapper img::attr(src)",
            )

            loader.add_css("title", "h3.wd-entities-title a::text")

            raw_price_texts = product.css(".price *::text").getall()

            numbers = [
                int(re.sub(r"[^\d]", "", text))
                for text in raw_price_texts
                if re.sub(r"[^\d]", "", text)
            ]

            if numbers:
                loader.add_value("price", min(numbers))

            loader.add_value("vendor", "hardware-market")

            loader.add_css(
                "url",
                "div.wd-product-thumb a::attr(href)",
            )

            yield loader.load_item()
