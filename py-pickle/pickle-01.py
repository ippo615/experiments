import pickle

# Pickles are not secure, they're essentially python byte-code
# which could let a user run arbitrary code with them

class Point():
	def __init__(self,x=0,y=0):
		self.x = x
		self.y = y

	def offset(self,dx=0,dy=0):
		self.x += dx
		self.y += dy

	def __str__(self):
		return '(%s,%s)' % (self.x, self.y)

a = Point(10,10)
print a

# Save
with open('data.pkl', 'wb') as pFile:
	pickle.dump(a, pFile)

# Load
with open('data.pkl', 'rb') as pFile:
	b = pickle.load(pFile)

b.offset(10)
print b
