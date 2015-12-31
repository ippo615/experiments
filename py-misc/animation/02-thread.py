import math
import time
import threading

from easings import Easings

class Animation( ):
	def __init__( self, duration, startValue, endValue, action, easing ):
		self.startValue = startValue
		self.endValue = endValue
		self.action = action
		self.duration = duration
		self.easing = easing

		self.startTime = time.time()
		self.currentTime = time.time()

		self.position = 0.0
		self.easedPosition = 0.0
		self.deltaValue = self.endValue - self.startValue
		self.value = startValue

	def update( self ):
		self.currentTime = time.time()
		dt = self.currentTime - self.startTime

		self.position = dt / self.duration
		if self.position > 1.0:
			self.easedPosition = self.easing( 1.0 )
		#elif self.position < 0.0:
		#	self.easedPosition = self.easing( 0.0 )
		else:
			self.easedPosition = self.easing( self.position )
			
		self.value = self.startValue + self.deltaValue * self.easedPosition

	def run( self ):
		return self.action( self.value )

class Tweener(threading.Thread):
	def __init__( self, interval ):
		threading.Thread.__init__( self )
		self.interval = interval
		self.animations = dict()

	def animate( self, name, duration, startValue, endValue, action, easing ):
		self.animations[name] = Animation( duration, startValue, endValue, action, easing )

	def run( self ):
		while True:
			self.update()
			time.sleep( self.interval )

	def update( self ):
		deletables = []
		for name in self.animations:
			animation = self.animations[name]
			if animation.position > 1.0:
				deletables.append( name )
			else:
				self.animations[name].update()
				return self.animations[name].run()

		for deletable in deletables:
			del self.animations[deletable]

if __name__ == '__main__':
	'''
	x = Animation( 5, 0, 2.4, lambda x: x, Easings.CubicBi )
	for i in range(0,55):
		x.update()
		print x.run()
		time.sleep( 0.1 )
	'''

	def printValue( x ):
		print x

	animManager = Tweener( 0.1 )
	animManager.animate( 'cubicBi', 5, 9.3, 2.4, printValue, Easings.SinusoidalBi )
	animManager.run()

	print 'here'
	time.sleep( 5.5 )
