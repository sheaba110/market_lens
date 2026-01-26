# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import psycopg2
from elasticsearch import Elasticsearch, helpers
import hashlib


class ElasticsearchPipeline:
    def __init__(self):
        # إعدادات الاتصال بـ Elasticsearch
        self.es = Elasticsearch(
            hosts=["http://localhost:9200"],
            # basic_auth=("user", "password"),  # لو عامل حماية
        )
        self.buffer = []  # لتخزين مجموعة منتجات وارسالها مرة واحدة (Bulk)

    def process_item(self, item, spider):
        # 1. إنشاء ID فريد للمنتج لتجنب التكرار
        # نستخدم الـ URL كمفتاح لأنه فريد لكل منتج
        unique_id = hashlib.md5(item["url"].encode("utf-8")).hexdigest()

        # 2. تجهيز الوثيقة (Document)
        doc = {
            "_index": "products_index",  # اسم الـ Index اللي انت جهزته
            "_id": unique_id,  # مهم جداً عشان التحديث (Update) بدل التكرار
            "_source": dict(item),  # البيانات
        }

        self.buffer.append(doc)

        # 3. الإرسال الجماعي (Bulk Insert) للأداء العالي
        # نرسل كل 100 منتج مع بعض بدل منتج منتج
        if len(self.buffer) >= 100:
            self.flush_buffer()

        return item

    def flush_buffer(self):
        if self.buffer:
            # استخدام helpers.bulk أسرع بكثير من الـ Index العادي
            helpers.bulk(self.es, self.buffer)
            self.buffer = []

    def close_spider(self, spider):
        # إرسال أي بيانات متبقية عند إغلاق الـ Spider
        self.flush_buffer()


class OfferCrawlerPipeline:

    def process_item(self, item, spider):
        return item
