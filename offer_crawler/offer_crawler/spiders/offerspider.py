# import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from itemloaders.processors import MapCompose
# from urllib.parse import urlparse, parse_qs, urlencode, urlunparse, urljoin
from ..items import ItemsCrawler
from scrapy.loader import ItemLoader
 
class SigmaspiderSpider(CrawlSpider):
    name = "sigmaspider"
    allowed_domains = ["sigma-computer.com"]
    start_urls = [
        "https://sigma-computer.com/en/category/9f5039af-f5d2-4396-9ba2-8ac40277c373",
    ]

    rules = (
        Rule(LinkExtractor(allow=(r"page=",))),
        Rule(LinkExtractor(allow=(r"item?id=")), callback="parse_item", follow=True),
        Rule(LinkExtractor(allow=(r"category",)), callback="parse_item", follow=True),
    )

    def parse_item(self, response):
        items = response.css("div.border-sigma-blue-lighter")
        for itemS in items:
            l = ItemLoader(item=ItemsCrawler(), selector=itemS)
            l.add_css("title", "a.chakra-tooltip__trigger::text")
            l.add_css("image", "img.w-full::attr(srcset)", MapCompose(response.urljoin))
            l.add_css("url", "a.font-semibold::attr(href)", MapCompose(response.urljoin))
            l.add_value("vendor", "https://sigma-computer.com")
            l.add_css("price", "p.font-bold::text")
            yield l.load_item()

        # next_button = response.css('button[data-part="next-trigger"]')
        # is_disabled = next_button.css("::attr(disabled)").get()

        # if next_button and is_disabled is None:
        #     parsed_url = urlparse(response.url)
        #     query_params = parse_qs(parsed_url.query)
        #     current_page = int(query_params.get("page", [1])[0])
        #     next_page_number = current_page + 1
        #     query_params["page"] = [str(next_page_number)]
        #     new_query = urlencode(query_params, doseq=True)
        #     next_page_url = urlunparse(
        #         (
        #             parsed_url.scheme,
        #             parsed_url.netloc,
        #             parsed_url.path,
        #             parsed_url.params,
        #             new_query,
        #             parsed_url.fragment,
        #         )
        #     )
        #     yield response.follow(next_page_url, callback=self.parse)
