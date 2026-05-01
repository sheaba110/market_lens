import scrapy


class HardwaremarketNetSpider(scrapy.Spider):
    name = "hardwaremarket.net"
    allowed_domains = ["hardwaremarket.net"]
    start_urls = ["https://hardwaremarket.net"]

    def parse(self, response):
        pass
