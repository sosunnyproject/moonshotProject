# -*- coding: utf-8 -*-
import scrapy
from scrapy import Request
from scrapy.http import HtmlResponse
from scrapy.selector import Selector

class JobsSpider(scrapy.Spider):
    name = 'hankyung2'

    #협력사 이름들을 리스트에 저장한다. - ㅁ회사, ㅅ 회사, ㅈ회사...

    #검색하고 싶은 뉴스 웹사이트를 정리해본다. - 한경, 매경, 중앙일보, ytn...

    #뉴스 웹사이트를 한번에 loop할 수 잇는지

    #각 웹사이트 안에서 협력사 키워드 검색 - 제목만, 뉴스에서만, ...
       #셀레니움 - 자동으로 할수있는지?
       #사이트별로 그 상세검색 주소를 복사하고 - 키워드만 바꿀수잇는지.

    #검색해서 나오는 여러 페이지들 loop

    #그 안에서 제목들을 다 저장 ( SCRAPY - 완료)


    #allowed_domains = ['http://search.joins.com/JoongangNews?page=1&Keyword=%ED%8F%AC%EC%8A%A4%EC%BD%94&SortType=New&ScopeType=Title&SearchCategoryType=JoongangNews']
    start_urls = ['http://news.hankyung.com/economy?page=1']

    def parse(self, response):
        self.log("I just visited: " + response.url)

        #page = response.url.split("/")[-2]
        #filename = 'articleTitle-%s.html' % page
        #with open(filename, 'wb') as f:
        #    f.write(response.body)


        #articles = response.xpath('//a[@class="article"]')
        titles = response.xpath('//strong[@class="tit"]/text()').extract()
        for title in titles:
            item = {'%s' % response.url: title}
            yield item

        #follow page link        //*[@id="container"]/div[1]/div[1]/div[3]/a[4]
        #relNext = "2"
            #response.xpath('//*[@id="container"]/div[1]/div[1]/div[3]/a[5]/@href').extract_first()
        #print "urljoin", response.urljoin
        links = response.css('div.paging > a::attr(href)').extract()
        for l in links:
            num = l.split("=")
            pageNum = int(num[1])
            if pageNum < 12:
                next = response.urljoin(l)
                print "next", next
                print "url", response.urljoin
                yield scrapy.Request(url=next, callback=self.parse)
