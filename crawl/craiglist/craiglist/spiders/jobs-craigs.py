# -*- coding: utf-8 -*-
import scrapy


class JobsSpider(scrapy.Spider):
    name = 'jobs'
    allowed_domains = ['https://newyork.craigslist.org/search/egr']
    start_urls = ['https://newyork.craigslist.org/search/egr/']

    def parse(self, response):
        jobs = response.xpath('//p[@class="result-info"]')
        for j in jobs:
            title = j.xpath('a/text()').extract_first()
            relative_url = j.xpath('a/@href').extract_first()
            abs_url = response.urljoin(relative_url)

            yield{'URL': abs_url, 'Title': title}

