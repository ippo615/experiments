
class Minion():
	
	def __init__( self, action, args=[], kwargs={} ):
		self.action = action
		self.args = args
		self.kwargs = kwargs
		self.wasSuccessful = False
		self.lastError = None
		self.lastResult = ''

	def _process( self, data ):
		return '%s' % self.action( data, *self.args, **self.kwargs )

	def process( self, data ):
		try:
			self.lastResult = self._process( data )
			self.wasSuccessful = True
			self.lastError = None
			return self.lastResult
		except Exception as e:
			self.lastResult = ''
			self.wasSuccessful = False
			self.lastError = e
			return ''
	
	def __str__( self ):
		if self.wasSuccessful:
			return '<Minion> was successful with result: %s' % self.lastResult
		else:
			return '<Minion> was unsuccessful with error: %s' % self.lastError

class Minions():
	def __init__( self, *minions ):
		self.minions = minions
		self.successes = []
	
	def process( self, data ):
		self.successes = []
		for m in self.minions:
			m.process( data )
			if m.wasSuccessful:
				self.successes.append( m )
		return self.successes

def add( data ):
	parts = data.split('+')
	return float(parts[0]) + float(parts[1])

def sub( data ):
	parts = data.split('-')
	return float(parts[0]) - float(parts[1])

def anyMath( data, initial, operation ):
	parts = data.split(',')
	result = initial
	for p in parts:
		result = operation( result, float(p) )
	return result

mathers = Minions(
	Minion( add ),
	Minion( sub ),
	Minion( anyMath, [1, lambda x,y: x*y] )
)

print Minion(add).process('1+2')
print mathers.process( '1+2' )[0]
print mathers.process( '1-2' )[0]
print mathers.process( '2,3' )[0]

# Todo: Full blackboard ie shared results and multi-stage processing

# Examples:
# Counting concepts in text. How does the counter keep track of how
# many things it has counted? Does everyone need to update the counter?

# For the "Dictionary of Miss Used (Words and Phrases)"
# Or maybe "Miss Used's Dictionary (of Words and Phrases)"
# 1 bot - looks up common phrases
# 2 bot - looks for words with multiple meanings
# 3 bot - looks for words from 2 that are in 1 (not strict word match)
# 4 bot - soundex score of (1)?
# 5 bot - soundex score of (2)?
# 6 bot - same as 3 but with 4 and 5 for puns

# http://clichesite.com/alpha_list.asp?which=lett+5
# Get list of words
