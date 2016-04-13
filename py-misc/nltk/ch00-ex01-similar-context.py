import nltk
from nltk.book import text1
from nltk.book import text2

## Searching for words that appear in a similar context
# What is a "similar context"?

def findSimilar( substring ):
	print '\nLooking words like "%s":' % substring
	print text2.similar( substring )

findSimilar( 'monstrous' )
findSimilar( 'monst' )

## Finding the contexts that are shared by 2 or more words:
print '\nContexts that are shared by "monstrous" "very":'
print text2.concordance( 'monstrous' )
print text2.common_contexts( ['monstrous','very'] )
