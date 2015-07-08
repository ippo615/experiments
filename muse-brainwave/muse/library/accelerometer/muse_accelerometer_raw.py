
class MuseAccelerometerRaw( object ):

	def __init__( self, y, z, x ):
		# The order is setup to give (what I think is) an intuitive x,y,z mapping
		# based on the Muse's input. For all, range: -2000.0 milli-g to +1996.1 mg
		# The `g` is NOT grams it's http://en.wikipedia.org/wiki/G-force
		# y: forward and backward position
		# z: up and down position
		# x: left and right position
		self.y = y
		self.x = x
		self.z = z

	def __str__( self ):
		return 'Accel: %4.2f, %4.2f, %4.2f' % (
			self.x,
			self.y,
			self.z
		)

