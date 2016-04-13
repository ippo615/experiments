
"""
The overall methodology is dividied into 2 public methods:
  
  ai.process( "text" ) -> returns the result of the ai's work on the
  input text. The output can also be considered a prediction, ie
  autocomplete suggestions. This method does not alter the internal
  state of the knowledge known by the ai.
  
  ai.learn( expectedResult ) -> tells the ai that the last output or
  "prediction" was wrong and that `expectedResult` is a correct output.
  This method can alters the internal state of ai's knowledge.

For this particular example, I'm going to try to teach it to perform
different actions and see if it can learn how to chose the correct
actions and methods.

How is this different from my `minions`? In minions, the minion manager
is stupid (and the minions are too). The minions and manager do not
learn. They only check for 'runnable' code not 'correct' code. This ai
will try to determine 'correctness' and will include provision for
learning.

Notes on ignoring words: keeping an ignored word list can use up a lot
of memory but is more general than keeping a "good words list."
Consider the inputs:

	what is the weather for zip code 10023
	what is the weather for NYC, NY
	what is the temperature in Maimi
	how hot is 10701

Those all should result in queries like: look_up_weather_for( place ).
The list of ignored words would be:

	what, is, the, weather, for, zip, code, temperature, in, how, hot

The list of data words is:

	10023, "NYC, NY", Maimi, 10701
	or
	10023, NYC, NY, Maimi, 10701

"""

class ActionLearner():
	def __init__( self, delimeter=' ' ):
		self._lastInput = ''
		self.ignoredWords = dict()
		self.delimeter = delimeter
	
	def process( self, data ):
		self._last_input = data
		
		# Remove ignored_words
		allWords = self._last_input.split( self.delimeter )
		words = []
		for w in allWords:
			if not w in self.ignoredWords:
				words.append( w )
		
		# Process each of the 
	
	def learn( self, action, args=[], kwargs={} ):
		pass
