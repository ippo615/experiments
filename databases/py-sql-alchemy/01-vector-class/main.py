from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Sequence

Base = declarative_base()
class Point2D(Base):
	__tablename__ = 'point2d'
	
	id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
	x = Column(Integer)
	y = Column(Integer)

	def __add__( self, other ):
		return Point2D(
			x = self.x + other.x,
			y = self.y + other.y
		)
	
	def __sub__( self, other ):
		return Point2D(
			x = self.x - other.x,
			y = self.y - other.y
		)
	
	def magnitudeSquared( self ):
		return (self.x*self.x + self.y*self.y)
	
	def magnitude( self ):
		return self.magnitudeSquared()**0.5

	def  __repr__(self):
		return '<Point2D x=%s, y=%s>' % (
			self.x,
			self.y
		)

engine = create_engine('sqlite:///:memory:', echo=False)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

p1 = Point2D(x=10,y=10)
p2 = Point2D(x=10,y=20)
p3 = Point2D(x=20,y=20)
p4 = Point2D(x=20,y=10)
session.add( p1 )
session.add( p2 )
session.add( p3 )
session.add( p4 )

points = session.query(Point2D).filter_by(x=10).all()
print points[0] + points[1]

