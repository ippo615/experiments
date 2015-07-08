
class MuseEeg( object ):
	
	def __init__( self, museEegRaw, museQuantizationRaw ):
		self.museEegRaw = museEegRaw
		self.museQuantizationRaw = museQuantizationRaw
		self.update()

	def update(self):
		self.earLeft = self.museEegRaw.earLeft * self.museQuantizationRaw.earLeft
		self.headLeft = self.museEegRaw.headLeft * self.museQuantizationRaw.headLeft
		self.headRight = self.museEegRaw.headRight * self.museQuantizationRaw.headRight
		self.earRight = self.museEegRaw.earRight * self.museQuantizationRaw.earRight

	def __str__(self):
		return "EEG Raw Data: %4.2f %4.2f %4.2f %4.2f" % (
			self.earLeft,
			self.headLeft,
			self.headRight,
			self.earRight
		)

