'''
What is the difference between the following two lines? Which one will
give a larger value? Will this be the case for other texts?

>>> sorted(set(w.lower() for w in text1))
>>> sorted(w.lower() for w in set(text1))

'''

import nltk
from nltk.book import *

