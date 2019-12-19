
# moonshotTeam Korean News Article Project
Project from an educational program

![Demo Image](/demophoto.png)


Storing 'Moonshot' Team's codes here

## WebCrawling
Webcrawling titles of articles with certain keywords

Used BeautifulSoup4

Failed with Scrapy - couldn't get next_page working

## Main folder: server-side-javascript --> sketch
### app3.js : server powered by node.js
1. communicates with sketch.js (frontend)
2. run lexrank.py (via child_process module) via python2
--> input: raw.txt, output: summary.txt
3. run jsonvisual.py (via child_process module) via python3
--> input: search.json, output: wordcloud, sentimental pie graph

