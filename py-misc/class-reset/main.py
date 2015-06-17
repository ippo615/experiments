class Point():
	def __init__(self,x=0.0,y=0.0):
		self.x = x
		self.y = y

	def __str__(self):
		return '(%.0f,%.0f)'%(self.x,self.y)

pt = Point(10,10)
print pt

pt.__init__()
print pt
