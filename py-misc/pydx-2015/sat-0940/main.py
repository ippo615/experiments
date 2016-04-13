import random

class Dungeon(object):
	trouble = []

	def __init__(self, monsters=None):
		if monsters:
			self.trouble.extend(monsters)

	def __iter__(self):
		random.shuffle(self.trouble)
		return (m for m in self.trouble)

d1 = Dungeon([1,2,3,4,5])
d2 = Dungeon([6,7,8,9,0])

for d in d1:
	print d
print 'END OF D1'

for d in d2:
	print d

