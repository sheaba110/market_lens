# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from locale import currency
import scrapy



class ItemsCrawler(scrapy.Item):

    price = scrapy.Field()
    title = scrapy.Field()
    url   = scrapy.Field()
    image = scrapy.Field()
    source = scrapy.Field()

