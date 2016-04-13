import nltk

def checkWeather( query ):
	tokens = nltk.word_tokenize( query )
	tags = nltk.pos_tag( tokens )
	return tags

print checkWeather( 'What is the weather in portland, oregon?' )
print checkWeather( 'Where is portland, oregon?' )
print checkWeather( 'Who is portland, oregon?' )
print checkWeather( 'When is it tomorrow' )
