
class Point():

	def __init__(self,x=0.0,y=0.0):
		self.x = x
		self.y = y
	
	def offset(self,dx=0.0,dy=0.0):
		self.x += dx
		self.y += dy
		return self
	
	def scale(self,sx=1.0,sy=1.0):
		self.x *= sx
		self.y *= sy
		return self

	def length(self):
		return (self.x**2 + self.y**2)**0.5

	def plus(self,other):
		self.x += other.x
		self.y += other.y
		return self

	def minus(self,other):
		self.x -= other.x
		self.y -= other.y
		return self

	def copy(self):
		return Point(self.x,self.y)

	def as_dict(self):
		return dict(
			x = self.x,
			y = self.y
		)

	def __str__(self):
		return '(%s, %s)' % (self.x,self.y)
