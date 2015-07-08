
class MuseQuantizationRaw( object ):

	def __init__( self, earLeft, headLeft, headRight, earRight ):
		self.earLeft = earLeft
		self.headLeft = headLeft
		self.headRight = headRight
		self.earRight = earRight

	def __str__( self ):
		return "EEG Quantization Data: %i %i %i %i" % (
			self.earLeft,
			self.headLeft,
			self.headRight,
			self.earRight
		)


