import nltk
from nltk.book import text1

# Bigrams - pairs of sequential words
print list(nltk.bigrams('Hello world! How are you?'.split(' ')))

# Collocations - pairs of words that appear frequently
print text1.collocations()
