# -*-coding:utf-8 -*-
import os
import csv
from konlpy.tag import Kkma
from collections import Counter
import warnings
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import json
from PIL import Image
import numpy as np
import nltk
from pylab import savefig

read_file="article.json"
read={}

def readarticle(filename):
    f=open(filename, 'r')
    js=json.loads(f.read())
    f.close()
    return js

def main():
    global read_file
    global read
    read=readarticle(read_file)

    for n in range(5):
        b=read["art%d" %n]['main']

        k = Kkma()
        noun = k.nouns(b)

        stop_words = ['가', '에', '의', '과', '수', '때', '그', '이', '는', '및', '와', '을', '를']

        noun = [each_word for each_word in noun if each_word not in stop_words]

        ko = nltk.Text(noun, name='crawled news')

        word = ko.vocab().most_common(400)
        tmp_word = dict(word)

        coloring = np.array(Image.open("phoenix.jpg"))
        from wordcloud import ImageColorGenerator
        image_colors = ImageColorGenerator(coloring)

        wordcloud = WordCloud(font_path='/usr/local/lib/python3.4/dist-packages/pytagcloud/fonts/NanumBarunGothic.ttf',
                              relative_scaling=0.2, mask=coloring,
                              background_color="rgba(0, 0, 0, 0)", mode="RGBA"

                              ).generate_from_frequencies(tmp_word)
        fig=plt.figure(figsize=(48, 61))
        fig.patch.set_facecolor('none')
        fig.patch.set_alpha(0.0)
        plt.imshow(wordcloud.recolor(color_func=image_colors), interpolation='bilinear')
        plt.axis('off')
        savefig('phoenixcloud.png')
        #plt.show()
        warnings.simplefilter("ignore")

        f2 = open(os.getcwd() + '//Sentimental_Dictionary.txt', mode='r', encoding='utf-8')

        dic1 = []
        cr = csv.reader(f2)
        for row in cr:
            dic1.append(row)

        def Sentiment_Analysis(text, dic):
            k = Kkma()
            tokens = k.pos(text)
            score = []
            neg = 0
            neut = 0
            none = 0
            pos = 0
            for token in tokens:
                for item in dic:
                    found = 0
                    found = item[0].split(";")[0].count(token[0])
                    if found > 0:
                        found = 0
                        found = item[0].split(";")[0].count(token[1])
                        if found > 0:
                            neg += float(item[3]) * float(item[8])
                            neut += float(item[4]) * float(item[8])
                            none += float(item[5]) * float(item[8])
                            pos += float(item[6]) * float(item[8])
                            break
            total = neg + neut + none + pos
            if total == 0:
                total = 1
            score.append(pos / total)
            score.append(neg / total)
            score.append(neut / total)
            score.append(none / total)

            fig = plt.figure()
            fig.patch.set_facecolor('white')
            fig.patch.set_alpha(0.0)

            labels = 'Positive', 'Negative', 'Neutral', 'None'
            sizes = [score[0], score[1], score[2], score[3]]
            colors = ['dodgerblue', 'r', 'limegreen', 'whitesmoke']
            explode = (0.1, 0, 0.1, 0.1)
            plt.axis('equal')
            plt.title('Sentimental Analysis of Crawled News')
            plt.rcParams.update({'font.size': 10})
            _, _, autotexts = plt.pie(sizes, labels=labels, colors=colors, explode=explode, autopct='%1.1f%%',
                                      shadow=True, startangle=90)

            for autotext in autotexts:
                autotext.set_color('black')
            plt.savefig('piegraph.png')
            #plt.show()
            warnings.simplefilter("ignore")

            return score

        Sentiment_Analysis(b, dic1)


if __name__=="__main__":
    main()