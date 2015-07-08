
class Thing( object ):
	
	def __init__( self, a, b, c, d ):
		self.a = a
		self.b = b
		self.c = c
		self.d = d

	def what( self ):
		print self.a

print dir( Thing )
import copy
Thing2 = copy.deepcopy( Thing )

def thing2Str( self ):
	return self.a

Thing2.__str__ = thing2Str

blah = Thing2('a','b','c','d')
print blah.__class__

def makeClass( message ):

	class Temp( object ):
		def __init__( self, a ):
			self.a = a
		def __str__(self):
			return '%s: %s' % (message, self.a)

	return Temp

A = makeClass( 'A' )
B = makeClass( 'B' )
print A(1)
print B(2)
print A(2)

print Thing.__name__
print dir(A)
print B

def makeClass2( name, path, message ):

	class Temp( object ):
		def __init__( self, a ):
			self.a = a
		def __str__(self):
			return '%s: %s' % (message, self.a)

	Temp.__name__ = name
	Temp.path = path

	return Temp

newA = makeClass2( 'A', '/class/a', 'A' )
newB = makeClass2( 'B', '/class/b', 'B' )
a = newA('1')
b = newB('2')

print newA
print newB
print a
print b


def makeMuseSensorClass( name, path, message ):

	class Muse( object ):

		def __init__( self, earLeft, headLeft, headRight, earRight ):
			self.earLeft = earLeft
			self.headLeft = headLeft
			self.headRight = headRight
			self.earRight = earRight

		def update( self, earLeft, headLeft, headRight, earRight ):
			self.earLeft = earLeft
			self.headLeft = headLeft
			self.headRight = headRight
			self.earRight = earRight

		def __str__( self ):
			return "%s: %4.2f %4.2f %4.2f %4.2f" % (
				Muse.message,
				self.earLeft,
				self.headLeft,
				self.headRight,
				self.earRight
			)

		Muse.__name__ = name
		Muse.path = path
		Muse.message = message

MuseEeg = makeMuseSensorClass( 'MuseEeg', '/muse/eeg', 'Eeg Raw Data' )
MuseQuantization = makeMuseSensorClass( 'MuseQuantization', '/muse/eeg/quantization', 'Eeg Quantization Data' )
MuseAbsoluteLowFreqs = makeMuseSensorClass(
	'MuseAbsoluteLowFreqs',
	'/muse/elements/low_freqs_absolute',
	'Eeg Low Freq Abs (Bel)'
)
MuseAbsoluteDelta = makeMuseSensorClass(
	'MuseAbsoluteDelta',
	'/muse/elements/delta_absolute',
	'Eeg Delta Abs (Bel)'
)
MuseAbsoluteTheta = makeMuseSensorClass(
	'MuseAbsoluteTheta',
	'/muse/elements/theta_absolute',
	'Eeg Theta Abs (Bel)'
)
MuseAbsoluteAlpha = makeMuseSensorClass(
	'MuseAbsoluteAlpha',
	'/muse/elements/alpha_absolute',
	'Eeg Alpha Abs (Bel)'
)
MuseAbsoluteBeta = makeMuseSensorClass(
	'MuseAbsoluteBeta',
	'/muse/elements/beta_absolute',
	'Eeg Beta Abs (Bel)'
)
MuseAbsoluteGamma = makeMuseSensorClass(
	'MuseAbsoluteGamma',
	'/muse/elements/gamma_absolute',
	'Eeg Gamma Abs (Bel)'
)

