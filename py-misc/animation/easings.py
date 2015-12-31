import math

class Easings():
	
	@staticmethod
	def Linear(k):
		return k

	@staticmethod
	def QuadraticIn(k):
		return k * k

	@staticmethod
	def QuadraticOut(k):
		return k * ( 2 - k )

	@staticmethod
	def QuadraticBi(k):
		k *= 2
		if k < 1:
			return 0.5 * k * k
		k -= 1
		return - 0.5 * ( k * ( k - 2 ) - 1 )

	@staticmethod
	def CubicIn(k):
		return k**3

	@staticmethod
	def CubicOut(k):
		return --k * k * k + 1

	@staticmethod
	def CubicBi(k):
		k *= 2
		if k < 1:
			return 0.5 * k * k * k
		k -= 2
		return 0.5 * ( k * k * k + 2 )

	@staticmethod
	def QuarticIn(k):
		return k * k * k * k

	@staticmethod
	def QuarticOut(k):
		return 1 - ( --k * k * k * k )

	@staticmethod
	def QuarticBi(k):
		k *= 2
		if k < 1:
			return 0.5 * k * k * k * k
		k -= 2
		return - 0.5 * ( k * k * k * k - 2 )

	@staticmethod
	def QuinticIn(k):
		return k * k * k * k * k

	@staticmethod
	def QuinticOut(k):
		return --k * k * k * k * k + 1

	@staticmethod
	def QuinticBi(k):
		k *= 2
		if k < 1:
			return 0.5 * k * k * k * k * k
		k -= 2
		return 0.5 * ( k * k * k * k * k + 2 )

	@staticmethod
	def SinusoidalIn(k):
		return 1 - math.cos( k * math.pi / 2 )
	
	@staticmethod
	def SinusoidalOut(k):
		return math.sin( k * math.pi / 2 )

	@staticmethod
	def SinusoidalBi(k):
		return 0.5 * (1 - math.cos( math.pi * k ))

	@staticmethod
	def ExponentialIn(k):
		if k == 0:
			return 0
		return math.pow( 1024, k - 1 )

	@staticmethod
	def ExponentialOut(k):
		if k == 1:
			return 1
		return 1 - math.pow( 2, - 10 * k )

	@staticmethod
	def ExponentialBi(k):
		if k == 0:
			return 0
		if k == 1:
			return 1
		k *= 2
		if k < 1:
			return 0.5 * math.pow( 1024, k - 1 )
		return 0.5 * ( - math.pow( 2, - 10 * ( k - 1 ) ) + 2 )

	@staticmethod
	def CircularIn(k):
		return 1 - math.sqrt( 1 - k * k )

	@staticmethod
	def CircularOut(k):
		return math.sqrt( 1 - ( --k * k ) )

	@staticmethod
	def CircularBi(k):
		k *= 2
		if k < 1:
			return - 0.5 * ( math.sqrt( 1 - k * k ) - 1)
		k -= 2
		return 0.5 * ( math.sqrt( 1 - k*k ) + 1)
