import struct
import binascii


class BinaryType( object ):

	formatCode = ''
	minimum = 0
	maximum = 0

	def __init__( self ):
		self.value = 0

	def __get__( self, obj, type_=None ):

		# If we're working with an instance
		if obj != None:
			return obj.value

		# If we're working with instance.__class__.property
		return self

	def __set__( self, obj, value ):
		#print "setting"
		
		if value < self.minimum:
			raise RuntimeError( '%s is less than the minimum of %s' % (
				value,
				self.minimum
			) )
			
		if value > self.maximum:
			raise RuntimeError( '%s is greater than the maximum of %s' % (
				value,
				self.maximum
			) )

		obj.value = value


class SignedChar( BinaryType ):
	formatCode = 'b'
	minimum = -127
	maximum = 127

class UnsignedChar( BinaryType ):
	formatCode = 'B'
	minimum = 0
	maximum = 255

class Char( UnsignedChar ):
	formatCode = 'c'

class UnsignedShort( BinaryType ):
	formatCode = 'H'
	minimum = 0
	maximum = 65535

class Short( BinaryType ):
	formatCode = 'h'
	minimum = -32767
	maximum = 32767

# NOTE: Python treats `int`s as `long`s
# whereas C treats    `int`s as `short`s
class Int( BinaryType ):
	formatCode = 'i'
	minimum = -2147483647
	maximum = 2147483647

class UnsignedInt( BinaryType ):
	formatCode = 'I'
	minimum = 0
	maximum = 4294967295

class Long( BinaryType ):
	formatCode = 'l'
	minimum = -2147483647
	maximum = 2147483647

class UnsignedLong( BinaryType ):
	formatCode = 'L'
	minimum = 0
	maximum = 4294967295

class LongLong( BinaryType ):
	formatCode = 'q'
	minimum = -9223372036854775807
	maximum = 9223372036854775807

class UnsignedLongLong( BinaryType ):
	formatCode = 'Q'
	minimum = 0
	maximum = 18446744073709551615

class Float( BinaryType ):
	formatCode = 'f'

	def __set__( self, instance, value ):
		# There is no easily enforcable reference/standard for minimum
		# and maximum floating point values so we do not enforce any
		self.value = value

class Double( Float ):
	formatCode = 'd'

class BinaryData( ):
	
	BIG_ENDIAN = '>'
	LITTLE_ENDIAN = '<'
	NETWORK_ENDIAN = '!'
	NATIVE_ENDIAN_AND_ALIGNMENT = '@'
	NATIVE_ENDIAN_NO_ALIGNMENT = '='
	
	def packBinary( self, propName, byteArray, endianness='>' ):
		byteArray.extend(
			struct.pack( '%s%s' % (
				endianness,
				getattr(self.__class__,propName).formatCode
			), getattr(self,propName) )
		)

class MovementSegment( BinaryData ):
	''' Good documentation '''

	repetition = UnsignedShort()
	periodMultiplier = UnsignedShort()

	def __init__( self, repetition=1, periodMultiplier=1 ):
		self.repetition = repetition
		self.periodMultiplier = periodMultiplier

	def __str__( self ):
		return 'repitition: %s; periodMultiplier: %sx; --> 0x%s' % (
			self.repetition,
			self.periodMultiplier,
			binascii.hexlify(self.asBytes())
		)

	def asBytes( self, endianness='>' ):
		ba = bytearray()
		self.packBinary( 'repetition', ba, endianness )
		self.packBinary( 'periodMultiplier', ba, endianness )
		return bytes( ba )

class MovementInstruction( BinaryData ):
	''' Good documentation '''
	direction = UnsignedShort()
	numSegments = UnsignedShort()
	
	def __init__( self, direction=1, segments=[] ):
		self.segments = []
		self.direction = direction
		self.numSegments = 0
		self.extend( segments )
	
	def append( self, segment ):
		self.segments.append( segment )
		self.numSegments += 1
	def extend( self, segments ):
		for segment in segments:
			self.append( segment )
	def __len__( self ):
		return len( self.segments )

	def asBytes( self, endianness='>' ):
		ba = bytearray()
		self.packBinary( 'direction',  ba, endianness )
		self.packBinary( 'numSegments',  ba, endianness )
		for segment in self.segments:
			ba.extend( segment.asBytes() )
		return bytes(ba)

class PrintSegment( BinaryData ):
	''' Good documentation '''

	numSteps = UnsignedShort()
	pattern = UnsignedShort()

	def __init__( self, numSteps, pattern ):
		self.numSteps = numSteps
		self.pattern = pattern

	def __str__( self ):
		return 'numSteps: %s; pattern: %s; --> 0x%s' % (
			self.numSteps,
			bin(self.pattern),
			binascii.hexlify(self.asBytes())
		)

	def asBytes( self, endianness='>' ):
		ba = bytearray()
		self.packBinary( 'numSteps', ba, endianness )
		self.packBinary( 'pattern', ba, endianness )
		return bytes( ba )

class PrintInstruction( BinaryData ):
	''' Good documentation '''
	sparsity = UnsignedShort()
	numSegments = UnsignedShort()
	
	def __init__( self, sparsity=1, segments=[] ):
		self.segments = []
		self.sparsity = sparsity
		self.numSegments = 0
		self.extend( segments )
	
	def append( self, segment ):
		self.segments.append( segment )
		self.numSegments += 1
	def extend( self, segments ):
		for segment in segments:
			self.append( segment )
	def __len__( self ):
		return len( self.segments )

	def asBytes( self, endianness='>' ):
		ba = bytearray()
		self.packBinary( 'sparsity',  ba, endianness )
		self.packBinary( 'numSegments',  ba, endianness )
		for segment in self.segments:
			ba.extend( segment.asBytes() )
		return bytes(ba)

class Instruction( BinaryData ):
	def __init__(
		self,
		xMotion,
		yMotion,
		zMotion,
		rotation,
		extrusion,
		inkjetPattern
	):
		self.xMotion = xMotion
		self.yMotion = yMotion
		self.zMotion = zMotion
		self.rotation = rotation
		self.extrusion = extrusion
		self.inkjetPattern = inkjetPattern
	
	def asBytes( self, endianness='>' ):
		ba = bytearray()
		ba.extend( self.xMotion.asBytes() )
		ba.extend( self.yMotion.asBytes() )
		ba.extend( self.zMotion.asBytes() )
		ba.extend( self.rotation.asBytes() )
		ba.extend( self.extrusion.asBytes() )
		ba.extend( self.inkjetPattern.asBytes() )
		return bytes( ba )

movements = [
	MovementSegment( 0, 19 ),
	MovementSegment( 2, 18 ),
	MovementSegment( 3, 17 ),
	MovementSegment( 5, 10 )
]
movements[0].repetition = 1

for m in movements:
	print m

#for m in movements:
#	print '0x%s' % binascii.hexlify(m.asBytes())

mi = MovementInstruction( 1, movements )
mi.append( MovementSegment( 6, 20 ) )
mi.extend( [
	MovementSegment( 7, 21 ),
	MovementSegment( 8, 22 )
])
text = binascii.hexlify( mi.asBytes() )
for i in range(0,len(text),8):
	print ''.join(text[i:i+8])

patterns = [
	PrintSegment( 100, 0 ),
	PrintSegment(  50, 2 ),
	PrintSegment(  25, 4 ),
	PrintSegment( 200, 8 )
]
pi = PrintInstruction( 4, patterns )
pi.append( PrintSegment( 200, 16 ) )
pi.extend( [
	PrintSegment( 11, 0x10 ),
	PrintSegment( 12, 0x20 )
] )

for s in pi.segments:
	print s

text = binascii.hexlify( pi.asBytes() )
for i in range(0,len(text),8):
	print ''.join(text[i:i+8])

instruction = Instruction(
	MovementInstruction(1),
	MovementInstruction(1),
	MovementInstruction(1),
	MovementInstruction(1),
	MovementInstruction(1),
	PrintInstruction(12)
)

instruction.xMotion.extend([
	MovementSegment( 1, 1 )
])
instruction.yMotion.extend([
	MovementSegment( 2, 2 )
])
instruction.zMotion.extend([
	MovementSegment( 3, 3 )
])
instruction.rotation.extend([
	MovementSegment( 180, 1 )
])
instruction.extrusion.extend([
	MovementSegment( 20, 5 )
])
instruction.inkjetPattern.extend([
	PrintSegment( 5, 0b11001100 )
])

print binascii.hexlify( instruction.asBytes() )
