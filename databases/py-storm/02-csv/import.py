import csv

from storm.locals import create_database
from storm.locals import Store
from storm.locals import Int, Unicode

class Person(object):
	__storm_table__ = 'person'

	id = Int(primary=True)
	name = Unicode()
	age = Int()

	# NOTE: the type of id, name, and age are not changed by storm.
	# It will complain if you try to do any of the following:
	#     self.name = 'Marcy' # that's not unicode
	#     self.age = 10.0 # that's not an int
	#     self.id = '1' # that's not an int
	# The .from_dict static method is used to create person instances
	# directly from dictionaries (ie raw csv loaded data)
	@staticmethod
	def from_dict( data ):
		person = Person( unicode(data['name']), int(data['age']) )
		person.id = int(data['id'])
		return person

	def __init__( self, name, age ):
		self.name = name
		self.age = age

	def as_dict( self ):
		return dict(
			id = self.id,
			name = self.name,
			age = self.age
		)

	def __repr__( self ):
		return '<Person (name=%s, age=%s)>' % (
			self.name,
			self.age,
		)

database = create_database('sqlite://:memory:')
store = Store(database)
store.execute('''CREATE TABLE person (
	id INTEGER PRIMARY KEY,
	name VARCHAR,
	age INTEGER
)''')

# Loading a table
def loadClassFromFile( class_, store, fileHandle ):
	# Guess the appropriate CSV dialect by reading the first 5 lines
	dialect = csv.Sniffer().sniff(
		'\n'.join( fileHandle.readlines()[0:2] )
	)
	fileHandle.seek(0)

	reader = csv.DictReader(fileHandle, dialect=dialect)
	for line in reader:
		store.add( Person.from_dict(line) )

with open( 'persons.csv', 'rb' ) as f:
	loadClassFromFile( Person, store, f )

for person in store.find(Person, Person.age <= 30):
	print person

# Optional file cleaning method
def clean():
	import glob
	import os
	for fname in glob.glob( '*.csv' ):
		os.remove( fname )

clean() # Comment if you want to keep the files
