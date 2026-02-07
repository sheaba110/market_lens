import scrapy

class BadrgrbSpider(scrapy.Spider):
    name = "badrgrb"
    allowed_domains = ["elbadrgroupeg.store"]
    
    def start_request(self):
        url = "https://elbadrgroupeg.store/index.php?route=product/catalog"
        yield scrapy.Request(url, meta={"playwright": True})
    
    def parse(self, response):
        pass
