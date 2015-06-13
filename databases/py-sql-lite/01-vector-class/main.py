import sqlite3

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

connection = sqlite3.connect(':memory:')
cursor = connection.cursor()

cursor.execute('''create table point2d (
	x,
	y
)''')

p1 = Point2D(10,10)
p2 = Point2D(10,20)
p3 = Point2D(20,20)
p4 = Point2D(20,10)

cursor.execute('insert into point2d values (?, ?)', (p1.x, p1.y))
cursor.execute('insert into point2d values (:x, :y)', p2.as_dict())
cursor.execute('insert into point2d values (:x, :y)', p3.as_dict())
cursor.execute('insert into point2d values (:x, :y)', p4.as_dict())

# NOTE the ',' to force the single-element tuple
rows = cursor.execute('select * from point2d where x=?', (10,)).fetchall()
print Point2D(*rows[0])+Point2D(*rows[1])
