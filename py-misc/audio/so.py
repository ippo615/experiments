import struct
import math
import time
import json

import pyaudio

# -------------------------------------------------------------------
#                                   Streaming Gaussian Distribution
# -------------------------------------------------------------------
class StreamingGaussian():
	
	def __init__( self ):
		self.values = []
		self.min = None
		self.max = None
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
		if value < self.min or self.min == None:
			self.min = value
		if value > self.max or self.max == None:
			self.max = value

	def compute(self):
		return self

	def pdf( self, x ):
		if self.variance == 0:
			return 1.0
		a = 1.0/((2.0*math.pi*self.variance)**0.5)
		e = math.exp( -((x-self.mean)**2)/(2.0*self.variance) )
		return a*e

	def as_dict( self ):
		return {
			'samples': self.n,
			'mean': self.mean,
			'variance': self.variance,
			'min': self.min,
			'max': self.max
		}

	def __str__( self ):
		return '{ samples: %s, mean: %s, variance: %s, min: %s, max: %s }' % (
			self.n,
			self.mean,
			self.variance,
			self.min,
			self.max
		)

class SoundMonitor():
	def __init__( self, blockTime=0.05 ):
		self.format = pyaudio.paInt16 
		self.normalization = (1.0/32768.0)
		self.channels = 1
		self.rate = 44100
		self.blockTime = blockTime
		self.frames_per_block = int(self.blockTime * self.rate)
		
		self.last_block = None
		
		self.stream = pyaudio.PyAudio().open(
			format = self.format,
			channels = self.channels,
			rate = self.rate,
			input = True,
			frames_per_buffer = self.frames_per_block
		)

	def capture( self, nBlocks=1 ):
		self.last_block = self.stream.read(self.frames_per_block)
	
	def rms( self ):
		# RMS amplitude is defined as the square root of the 
		# mean over time of the square of the amplitude.
		# so we need to convert this string of bytes into 
		# a string of 16-bit samples...

		# we will get one short out for each 
		# two chars in the string.
		count = len(self.last_block)/2
		format = '%dh'%(count)
		shorts = struct.unpack( format, self.last_block )

		# iterate over the block.
		sum_squares = 0.0
		for sample in shorts:
		# sample is a signed short in +/- 32768. 
		# normalize it to 1.0
			n = sample * self.normalization
			sum_squares += n*n

		return math.sqrt( sum_squares / count )

def get_sample(soundMonitor,nSamples):
	stats = StreamingGaussian()

	for i in range(int(nSamples)):
		try:
			soundMonitor.capture()
		except IOError, e:
			errorcount += 1
			print( "(%d) Error recording: %s"%(errorcount,e) )
		stats.append( soundMonitor.rms() )

	return stats

if __name__ == '__main__':
	# Note: D3 and python have different ideas of '%Z'
	#print time.strftime('%a %b %e %Y %X GMT%Z')
	# print time.strftime('%a %b %e %Y %X')
	soundMonitor = SoundMonitor(0.05)
	while True:
		sample = get_sample( soundMonitor, (1/0.05)*60 )
		data = sample.as_dict()
		data['time'] = time.strftime('%a %b %e %Y %X')
		print json.dumps(data)
		with open( 'data', 'a' ) as f:
			f.write( '%s\n' % json.dumps(data) )

