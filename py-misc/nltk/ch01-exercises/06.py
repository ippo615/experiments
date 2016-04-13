'''
Produce a dispersion plot of the four main protagonists in Sense and
Sensibility: Elinor, Marianne, Edward, and Willoughby. What can you
observe about the different roles played by the males and females in
this novel? Can you identify the couples?
'''

import nltk
from nltk.book import *

text2.dispersion_plot([
	'Elinor',
	'Marianne',
	'Edward',
	'Willoughby'
])

print 'From the dispersion plot it appears the couples are: %s and %s' % (
	['Elinor','Edward'],
	['Marianne','Willoghby']
)
