import scrapy


class FrensiaSpider(scrapy.Spider):
    name = "frensia"
    allowed_domains = ["alfrensia.com"]
    start_urls = ["https://alfrensia.com"]

    def parse(self, response):
        pass
