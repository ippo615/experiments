'''
The first sentence of text3 is provided to you in the variable sent3.
The index of the in sent3 is 1, because sent3[1] gives us 'the'. What
are the indexes of the two other occurrences of this word in sent3?
'''

import nltk
from nltk.book import *

i = -1
while True:
	i = sent3.index( sent3[1], i+1 )
	if i == -1:
		break
	print i

