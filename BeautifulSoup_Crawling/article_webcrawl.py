#coding=utf-8
import urllib
import os
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import pandas as pd

#상세검색, 키워드 포함 안된, 그냥 한국경제 전체뉴스 페이지 크롤링.
totalList = []
#loop 돌릴 페이지 수
for page in range(1, 3):
    #link 시작할 링크에서 페이지 수 숫자만 빼기
    link = "http://news.hankyung.com/economy?page=" + str(page)
    html = urllib.request.urlopen(link)
    soup = BeautifulSoup(html, "html.parser")

    #큰 태그 및 그 태그의 클래스 이름
    test = soup.find_all("a", class_="article")
    print(test)
    for each in test:
        #작은 태그 및 그 태그의 클래스 이름
        lst = each.find_all('strong', class_="tit")
        for e in lst:
            #html 태그 제거
            stripTag= e.get_text(strip = True)
            clean = stripTag
            #정규함수식 regular expression으로 특수문자 다 빼기
            clean2= re.sub(r'[^가-힣a-zA-Z0-9]+', ' ', clean)
            #regex2 = re.compile(r'([가-힣a-zA-Z0-9]+)')
            #clean2 = regex.findall(clean)
            eachFinal = ''.join(clean2)
            totalList.append(eachFinal)
    #각 페이지 사이에 줄바꿈
    totalList.append("\n")

#텍스트 파일에 쓰기
#print(totalList)
f = open("Hankyung2.txt","w", encoding="utf-8")
#print(os.getcwd())
for each in totalList:
    f.write(each)
    f.write('\n')
f.close()
"""
    lines = test[0].find_all('strong', class_= "tit")
    for l in lines:
        stripTag= l.get_text(strip=True)
        clean = stripTag[1:]
        #print(clean)
"""



