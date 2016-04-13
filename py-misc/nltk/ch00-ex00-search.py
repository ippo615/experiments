import nltk

# This seems to import everything anyway, hm...
from nltk.book import text1

def searchFor( substring ):
	print '\nSearching for "%s":' % substring
	print text1.concordance( substring )

searchFor( 'monstrous' )
searchFor( 'monst' )

# Notice how 'monst' has no matches -- nltk must only search for words
# Also notice that is shows some context
