from pydal import DAL, Field

class Point2D():
	
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

db = DAL('sqlite:memory:')

db.define_table('point2d',
	Field('x',type='double'),
	Field('y',type='double')
)

p1 = Point2D(10,10)
p2 = Point2D(10,20)
p3 = Point2D(20,20)
p4 = Point2D(20,10)

db.point2d.insert( **p1.as_dict() )
db.point2d.insert( **p2.as_dict() )
db.point2d.insert( **p3.as_dict() )
db.point2d.insert( **p4.as_dict() )

query = db.point2d.x == 10
rows = db(query).select()

print Point2D( rows[0].x, rows[0].y ) + Point2D( rows[1].x, rows[1].y )
