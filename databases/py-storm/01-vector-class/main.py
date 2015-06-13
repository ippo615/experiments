from storm.locals import create_database
from storm.locals import Store
from storm.locals import Int, Unicode
 
class Point2D(object):
	__storm_table__ = 'point2d'

	id = Int(primary=True)
	x = Int()
	y = Int()
	
	def __init__( self, x, y ):
		self.x = x
		self.y = y
	
	def __add__( self, other ):
		return Point2D(
			self.x + other.x,
			self.y + other.y
		)
	
	def as_dict( self ):
		return dict(
			x = self.x,
			y = self.y
		)

	def __repr__( self ):
		return '<Point2D x:%s, y:%s>' % (
			self.x,
			self.y
		)

database = create_database('sqlite://:memory:')
store = Store(database)
store.execute('''CREATE TABLE point2d (
	id INTEGER PRIMARY KEY,
	x INTEGER,
	y INTEGER
)''')

p1 = Point2D(10,10)
p2 = Point2D(10,20)
p3 = Point2D(20,20)
p4 = Point2D(20,10)

store.add( p1 )
store.add( p2 )
store.add( p3 )
store.add( p4 )

points = store.find(Point2D, Point2D.x == 10)
print points[0] + points[1]
