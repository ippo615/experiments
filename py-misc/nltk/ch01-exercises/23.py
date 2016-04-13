'''
Find all the four-letter words in the Chat Corpus (text5). With the
help of a frequency distribution (FreqDist), show these words in
decreasing order of frequency.
'''

import nltk
from nltk.book import *

fourLetterWords = [ w for w in text5 if len(w) == 4 ]
freqDist = nltk.FreqDist( fourLetterWords )
print freqDist
