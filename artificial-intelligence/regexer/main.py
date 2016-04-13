import copy
# For generalization we need a set of "rule-making rules" (meta-rules)
# that the AI can use to make rules and then follow the rules.

class ReplaceLearner():
	@staticmethod
	def makeReplacer( dataIn, dataOut ):
		def replacer( dataIn ):
			return dataOut
		return replacer
	
	def __init__( self ):
		self._lastInput = []
		self.replacers = {}

	def process( self, data ):
		self._lastInput = copy.copy( data )
		results = []
		for d in data:
			if d in self.replacers:
				results.append( self.replacers[d]( d ) )
			else:
				results.append( d )
		return results

	def learn( self, result ):
		for i in range( min(len(result),len(self._lastInput)) ):
			r = result[i]
			d = self._lastInput[i]
			if not d in self.replacers:
				self.replacers[d] = ReplaceLearner.makeReplacer( d, r )

a = ReplaceLearner()
print a.process('1-914-559-8007')
a.learn( '#-###-###-####' )
print a.process( '1-800-345-2767' )
a.learn( '#-###-###-####' )
print a.process( '1-234-567-8900' )

# Compress learner
# RLE -> {#,c}, {#,c}, {#,c}
# Nah, let's do something else.
