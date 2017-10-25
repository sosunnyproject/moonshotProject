# -- coding:utf-8 --

import sys
import imp
imp.reload(sys)
sys.setdefaultencoding('utf8')
import lexrankr
from lexrankr import LexRank


f = open('raw.txt', 'r')
news = f.read()
#news = f.read().decode('utf8')

lexrank = LexRank()
lexrank.summarize(news)
summaries = lexrank.probe(None)

summary_str = ''
for i, summary in enumerate(summaries):
    summary_str += summary + '. '


f.close()

wf = open('summary.txt', 'w')
wf.write(summary_str)
wf.close()


print(summary_str)
#
# sys.stdout.flush()
