import csv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Sequence

Base = declarative_base()

class Person(Base):
	__tablename__ = 'persons'
	
	id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
	name = Column(String)
	age = Column(Integer)

	def  __repr__(self):
		return '<Person (name=%s, age=%s)>' % (
			self.name,
			self.age,
		)

engine = create_engine('sqlite:///:memory:', echo=False)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

persons = [
	Person( name='Amy', age=52 ),
	Person( name='Bob', age=48 ),
	Person( name='Cat', age=23 ),
	Person( name='Dan', age=17 ),
	Person( name='Edd', age=77 ),
	Person( name='Fan', age=65 ),
	Person( name='Gin', age=27 ),
	Person( name='Hil', age=30 ),
	Person( name='Iri', age=62 ),
	Person( name='Jac', age=18 )
]
for person in persons:
	session.add(person)

# Custom function to save a csv file
def writeClassToFile( class_, session, fileHandle ):
	outcsv = csv.writer(fileHandle)
	
	# Start by writing the headers
	outcsv.writerow([
		column.name for column in class_.__mapper__.columns
	])
	
	# Save all of the records
	records = session.query( class_ ).all()
	for record in records:
		outcsv.writerow([
			getattr(record, column.name) for column in class_.__mapper__.columns
		])

with open( 'persons.csv', 'wb' ) as f:
	writeClassToFile( Person, session, f )
