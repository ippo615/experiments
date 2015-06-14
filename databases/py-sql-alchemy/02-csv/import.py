import csv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.sql.expression import text

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

# Loading a table
def loadClassFromFile( class_, session, fileHandle ):
	# Guess the appropriate CSV dialect by reading the first 5 lines
	dialect = csv.Sniffer().sniff(
		'\n'.join( fileHandle.readlines()[0:5] )
	)
	fileHandle.seek(0)

	reader = csv.DictReader(fileHandle, dialect=dialect)
	for line in reader:
		session.add( class_(**line) )

with open( 'persons.csv', 'rb' ) as f:
	loadClassFromFile( Person, session, f )

# Note: `text` is imported (see import section). I need text()
# otherwise that filter produces a warning (try removing it).
print session.query(Person).filter(text('age <= 30')).all()


# Optional file cleaning method
def clean():
	import glob
	import os
	for fname in glob.glob( '*.csv' ):
		os.remove( fname )

clean() # Comment if you want to keep the files
