import scrapy


class BadrgrbSpider(scrapy.Spider):
    name = "badrgrb"
    allowed_domains = ["elbadrgroupeg.store"]
    start_urls = ["https://elbadrgroupeg.store/"]

    def parse(self, response):
        pass
