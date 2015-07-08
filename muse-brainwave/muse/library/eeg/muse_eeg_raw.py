
class MuseEegRaw( object ):

	def __init__( self, earLeft, headLeft, headRight, earRight ):
		self.earLeft = earLeft
		self.headLeft = headLeft
		self.headRight = headRight
		self.earRight = earRight

	def __str__( self ):
		return "EEG Raw Data: %4.2f %4.2f %4.2f %4.2f" % (
			self.earLeft,
			self.headLeft,
			self.headRight,
			self.earRight
		)

