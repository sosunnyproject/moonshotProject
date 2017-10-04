# coding: utf-8

import scrapy
from scrapy import Request
from scrapy.http import HtmlResponse
from scrapy.selector import Selector


class JobsSpider(scrapy.Spider):
    name = 'hankyung'

    start_urls = ['http://news.hankyung.com/economy?page=1']

    def parse(self, response):
        self.log("I just visited: " + response.url)
        """
        page = response.url.split("/")[-2]
        filename = 'articleTitle-%s.html' % page
        with open(filename, 'wb') as f:
           f.write(response.body)
        """
        print "next url?", response.url
        #articles = response.xpath('//a[@class="article"]')
        titles = response.xpath('//strong[@class="tit"]/text()').extract()
        for title in titles:
            item = {'%s' % response.url: title}
            yield item


        ## WORKS UP TO HERE
        # separate this into its own sectional code
        links = response.css('div.paging > a::attr(href)').extract()
        print (links)
        print(type(links))
        if links is not None:
            # something to grab string nums
            for l in links:
                num = l.split("=")
                pageNum = int(num[1])
                if pageNum < 12:
                    next = response.urljoin(l)
                    print(next)
                    print ("spacer")
                    yield response.follow(next, callback=self.parse)
