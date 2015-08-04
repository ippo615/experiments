import math

class FullGaussian():
	def __init__( self ):
		self.values = []
		self.mean = 0
		self.variance = 0
		self.n = 0

	def append( self, value ):
		self.n += 1
		self.values.append( value )
		self.compute()

	def _computeMean( self, values ):
		total = 0
		for i in range(len(values)):
			total += values[i]
		
		return total / len(values)

	def _computeVariance( self, values, mean ):
		total = 0
		for i in range(len(values)):
			e = values[i] - mean
			total += e*e
		
		return total / len(values)

	def compute(self):
		self.mean = self._computeMean( self.values )
		self.variance = self._computeVariance( self.values, self.mean )
		return self

	def pdf( self, x ):
		a = 1.0/((2.0*math.pi*self.variance)**0.5)
		e = math.exp( -((x-self.mean)**2)/(2.0*self.variance) )
		return a*e

# -------------------------------------------------------------------
#                                   Streaming Gaussian Distribution
# -------------------------------------------------------------------
class StreamingGaussian():
	
	def __init__( self ):
		self.values = []
		self.mean = 0
		self.variance = 0
		self.sumOfSqrs = 0
		self.n = 0

	def append( self, value ):
		self.sumOfSqrs += float(value*value)
		mean =  (float(self.n)*self.mean + float(value))/float(self.n+1)
		variance = 0
		variance += self.sumOfSqrs
		variance -= 2.0*mean*float(self.n*self.mean + value)
		variance += float(self.n+1)*mean*mean
		variance /= float(self.n+1)
		self.n += 1
		self.mean = mean
		self.variance = variance

	def compute(self):
		return self

	def pdf( self, x ):
		if self.variance == 0:
			return 1.0
		a = 1.0/((2.0*math.pi*self.variance)**0.5)
		e = math.exp( -((x-self.mean)**2)/(2.0*self.variance) )
		return a*e

	def __str__( self ):
		return '{ samples: %s, mean: %s, variance: %s }' % (
			self.n,
			self.mean,
			self.variance
		)

s = StreamingGaussian()
f = FullGaussian()
for i in range(0,100):
	s.append( float(i) )
	f.append( float(i) )
	
print '%s vs %s' % (
	s.compute().variance,
	f.compute().variance
)

Gaussian = StreamingGaussian

# -------------------------------------------------------------------
#                                            Naive Bayes Classifier
# -------------------------------------------------------------------
class NaiveBayes():
	def __init__( self, distribution ):
	
		# Actual samples, total number of samples, count of each class
		self.samples = dict()
		self.sampleCount = 0
		self.sampleCounts = dict()
		
		# Doing the actaul stats
		self.distribution = distribution
		self.distributions = dict()
		
		# For learning the last processed data point
		self.lastSample = dict()
		
		# Is error checking strict or not?
		self.strict = False
	
	def process( self, sample):
		if self.strict:
			pass
			# check if sample properties match self.model properties
			# if missing -> error
			# if extra -> warning
		
		# If we want to learn what this is later
		self.lastSample = sample
		
		maxProb = 0
		maxClass = ''
		for className in self.distributions:
			distribution = self.distributions[className]

			# probablity of the thing being in a class based on
			# population sample only (note: this clearly seems to
			# bias the classifier toward things it is shown more)
			p = float(self.sampleCounts[className]) / float(self.sampleCount)
			for prop in distribution:
				p *= distribution[prop].pdf( sample[prop] )
			
			if p >= maxProb:
				maxProb = p
				maxClass = className
					
		return maxClass

	def learn(self,output):
		
		if not output in self.distributions:
			self.distributions[output] = dict()
			for prop in self.lastSample:
				if prop in self.lastSample:
					self.distributions[output][prop] = self.distribution()
			
			self.sampleCounts[output] = 0
		
		for prop in self.lastSample:
			self.distributions[output][prop].append( self.lastSample[prop] )
			self.distributions[output][prop].compute()

		self.sampleCounts[output] += 1
		self.sampleCount += 1
	
	def __str__( self ):
		result = 'NaiveBayesian Classifier:\n'
		for d in self.distributions:
			dist = self.distributions[d]
			result += '%s {\n  %s\n}\n' % (
				d,
				'\n  '.join( ['%s - %s' % (v, dist[v]) for v in dist] )
			)
		result += 'end classifier\n'
		return result

# ---- Main ----
def TrainingData( dataIn, dataOut ):
	return dict(
		dataIn = dataIn,
		dataOut = dataOut
	)

trainingSamples = [
	TrainingData( {'height': 6.00, 'weight': 180.0, 'footSize': 12}, 'male' ),
	TrainingData( {'height': 5.92, 'weight': 190.0, 'footSize': 11}, 'male' ),
	TrainingData( {'height': 5.58, 'weight': 170.0, 'footSize': 12}, 'male' ),
	TrainingData( {'height': 5.92, 'weight': 165.0, 'footSize': 10}, 'male' ),
	TrainingData( {'height': 5.00, 'weight': 100.0, 'footSize': 6}, 'female' ),
	TrainingData( {'height': 5.50, 'weight': 150.0, 'footSize': 8}, 'female' ),
	TrainingData( {'height': 5.42, 'weight': 130.0, 'footSize': 7}, 'female' ),
	TrainingData( {'height': 5.75, 'weight': 150.0, 'footSize': 9}, 'female' )
]

nb = NaiveBayes(Gaussian)
for i in range(len(trainingSamples)):
	nb.process( trainingSamples[i]['dataIn'] )
	nb.learn( trainingSamples[i]['dataOut'] )

print nb 
print nb.process({'height': 6.0, 'weight': 180.0, 'footSize': 12})
print nb.process({'height': 5.0, 'weight': 100.0, 'footSize': 6})
