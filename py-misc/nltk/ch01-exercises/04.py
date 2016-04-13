'''
Review 1 on computing with language. How many words are there in text2?
How many distinct words are there?
'''

import nltk
from nltk.book import *

print 'There are %s words in text2' % len(text2)
print 'There are %s distinct words in text2' % len(set(text2))
