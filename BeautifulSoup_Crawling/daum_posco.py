#coding:utf-8
import urllib
import os
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import pandas as pd
totalList = []
#다음 뉴스 - 포스코 검색

#loop 돌릴 페이지 수
for page in range(1, 10):
    #link 시작할 링크에서 페이지 수 숫자만 빼기
    #한국경제 통합검색 - 상세검색 포스코 '제목만' 페이지 1 부터 ~ ...
    #검색키워드를 바꾸려면 아래 링크에 들어간 다음 다른 키워드로 검색한다.
    #page 1을 꼭 눌러서 링크의 맨 뒤가 page= 이 될 수있게 한 다음, link = 에 복붙한다.
    link = "https://m.search.daum.net/search?w=news&DA=PGD&enc=utf8&cluster=y&cluster_page=1&q=%ED%8F%AC%EC%8A%A4%EC%BD%94&p=2&page=" + str(page) + "&n=15"
    html = urllib.request.urlopen(link)
    soup = BeautifulSoup(html, "html.parser")
    #큰 태그 및 그 태그의 클래스 이름
    test = soup.find_all("div", class_="coll_cont cont_tab")

    for each in test:
        # 작은 태그 및 그 태그의 클래스 이름
        lst = each.find_all('span', class_="wrap_tit")
        for e in lst:
            # html 태그 제거
            stripTag= e.get_text(strip = True)
            clean = stripTag
            # 정규함수식 regular expression으로 특수문자 다 빼기
            clean2 = re.sub(r'[^가-힣a-zA-Z0-9]+', ' ', clean)
            # regex2 = re.compile(r'([가-힣a-zA-Z0-9]+)')
            # clean2 = regex.findall(clean)
            eachFinal = ''.join(clean2)
            totalList.append(eachFinal)
    #여러 페이지 되는 걸 확인했으면 아래 \n 지워도 됨
    totalList.append("\n")

#텍스트 파일에 쓰기
f = open("daum_posco.txt","w", encoding="utf-8")
#print(os.getcwd())
for each in totalList:
    f.write(each)
    f.write('\n')
f.close()


"""        
        #작은 태그 및 그 태그의 클래스 이름
        lst = each.find('a')
        print(lst)
        for e in lst:
            #html 태그 제거
            #stripTag= e.get_text(strip = True)
            clean = e
            #정규함수식 regular expression으로 특수문자 다 빼기
            clean2= re.sub(r'[^가-힣a-zA-Z0-9]+', ' ', clean)
            #regex2 = re.compile(r'([가-힣a-zA-Z0-9]+)')
            #clean2 = regex.findall(clean)
            eachFinal = ''.join(clean2)
            print(eachFinal)
            #totalList.append(eachFinal)
    #각 페이지 사이에 줄바꿈
    #totalList.append("\n")

#텍스트 파일에 쓰기
#print(totalList)

f = open("Hankyung_posco.txt","w", encoding="utf-8")
#print(os.getcwd())
for each in totalList:
    f.write(each)
    f.write('\n')
f.close()

    lines = test[0].find_all('strong', class_= "tit")
    for l in lines:
        stripTag= l.get_text(strip=True)
        clean = stripTag[1:]
        #print(clean)
"""



