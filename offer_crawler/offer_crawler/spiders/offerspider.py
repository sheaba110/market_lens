import scrapy
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

class SigmaspiderSpider(scrapy.Spider):
    name = "sigmaspider"
    allowed_domains = ["sigma-computer.com"]
    start_urls = [
        "https://sigma-computer.com/en/category/9f5039af-f5d2-4396-9ba2-8ac40277c373",
    ]

    def parse(self, response):
        items = response.css("div.border-sigma-blue-lighter")
        for item in items:
            yield {
                "title": item.css("a.chakra-tooltip__trigger::text").get(),
                "image": response.urljoin(item.css("img.w-full::attr(srcset)").get()),
                "url": response.urljoin(item.css("a.font-semibold::attr(href)").get()),
                "source": "https://sigma-computer.com",
                "price": item.css("p.font-bold::text").get(),
            }

        next_button = response.css('button[data-part="next-trigger"]')
        is_disabled = next_button.css("::attr(disabled)").get()

        if next_button and is_disabled is None:
            parsed_url = urlparse(response.url)
            query_params = parse_qs(parsed_url.query)
            current_page = int(query_params.get("page", [1])[0])
            next_page_number = current_page + 1
            query_params["page"] = [str(next_page_number)]
            new_query = urlencode(query_params, doseq=True)
            next_page_url = urlunparse((
                parsed_url.scheme, parsed_url.netloc, parsed_url.path,
                parsed_url.params, new_query, parsed_url.fragment
            ))
            yield response.follow(next_page_url, callback=self.parse)