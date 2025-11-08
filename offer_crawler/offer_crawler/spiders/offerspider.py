import scrapy


class OfferspiderSpider(scrapy.Spider):
    name = "offerspider"
    allowed_domains = ["example.com"]
    start_urls = ["https://example.com"]

    def parse(self, response):
        pass
