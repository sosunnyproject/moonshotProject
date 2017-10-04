# -*- coding: utf-8 -*-
import scrapy
from scrapy import Request

class JobsSpider(scrapy.Spider):
    name = 'jtbc'

    #협력사 이름들을 리스트에 저장한다. - ㅁ회사, ㅅ 회사, ㅈ회사...

    #검색하고 싶은 뉴스 웹사이트를 정리해본다. - 한경, 매경, 중앙일보, ytn...

    #뉴스 웹사이트를 한번에 loop할 수 잇는지

    #각 웹사이트 안에서 협력사 키워드 검색 - 제목만, 뉴스에서만, ...
       #셀레니움 - 자동으로 할수있는지?
       #사이트별로 그 상세검색 주소를 복사하고 - 키워드만 바꿀수잇는지.

    #검색해서 나오는 여러 페이지들 loop

    #그 안에서 제목들을 다 저장 ( SCRAPY - 완료)


    #allowed_domains = ['http://search.joins.com/JoongangNews?page=1&Keyword=%ED%8F%AC%EC%8A%A4%EC%BD%94&SortType=New&ScopeType=Title&SearchCategoryType=JoongangNews']
    start_urls = ['http://search.joins.com/JoongangNews?page=1&Keyword=%ED%8F%AC%EC%8A%A4%EC%BD%94&SortType=New&ScopeType=Title&SearchCategoryType=JoongangNews']

    def parse(self, response):
        jtbc = response.xpath('//strong[@class="headline mg"]')
        for j in jtbc:
            title = j.xpath('a/text()').extract_first()
            print "title", title
            relative_url = j.xpath('a/@href').extract_first()
            print "rel_url", relative_url
            #span keyword, after span keyword text -- how to include these
            abs_url = response.urljoin(relative_url)

            yield Request(abs_url, callback=self.parse_page, meta={'Title': title})

        relNext = response.xpath('//a[@class="link_page"]/@href').extract_first()
        absNext = response.urljoin(relNext)

        yield Request(absNext, callback=self.parse)

    def parse_page(self, response):
        #url = response.meta.get('URL')
        title = response.meta.get('Title')
        #address = response.meta.get('Address')

        #description = "".join(line for line in response.xpath('//*[@id="postingbody"]/text()').extract())

        #compensation = response.xpath('//p[@class="attrgroup"]/span[1]/b/text()').extract_first()
        #employment_type = response.xpath('//p[@class="attrgroup"]/span[2]/b/text()').extract_first()

        yield {'Title': title}

