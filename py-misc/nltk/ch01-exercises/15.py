'''
Review the discussion of conditionals in 4. Find all words in the Chat
Corpus (text5) starting with the letter b. Show them in alphabetical
order.
'''

import nltk
from nltk.book import *

bWords = set([ w for w in text5 if w.lower().startswith('b') ])
print sorted( bWords )
