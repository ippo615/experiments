# Can we define class variables in a method?
class Point():
	def __init__(self,x=0.0,y=0.0):
		self.x = x
		self.y = y
		self.reset()

	def reset(self):
		self.length = (self.x**2 + self.y**2)**0.5

	def __str__(self):
		return '(%.0f,%.0f) - %.0f'%(self.x,self.y,self.length)

pt = Point(3,4)
print pt

print pt.length

pt.reset()
print pt
