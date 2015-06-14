import csv

from storm.locals import create_database
from storm.locals import Store
from storm.locals import Int, Unicode

class Person(object):
	__storm_table__ = 'person'

	id = Int(primary=True)
	name = Unicode()
	age = Int()

	def __init__( self, name, age ):
		self.name = name
		self.age = age
	
	# This is not useful, I cannot guarentee the same order as the
	# headers: store.find(Person)._storm_columns
	def as_tuple( self ):
		return ( self.id, self.name, self.age )

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

persons = [
	Person( name=u'Amy', age=52 ),
	Person( name=u'Bob', age=48 ),
	Person( name=u'Cat', age=23 ),
	Person( name=u'Dan', age=17 ),
	Person( name=u'Edd', age=77 ),
	Person( name=u'Fan', age=65 ),
	Person( name=u'Gin', age=27 ),
	Person( name=u'Hil', age=30 ),
	Person( name=u'Iri', age=62 ),
	Person( name=u'Jac', age=18 )
]
for person in persons:
	store.add(person)

def getColumnNames( row ):
	columns = row._storm_columns
	names = []
	for column in columns:
		names.append( columns[column].name )
	return names

# Custom function to save a csv file
def writeClassToFile( class_, store, fileHandle ):
	
	# Get the data and determine the fieldnames
	rows = store.find(class_)
	headers = [x for x in rows[0].as_dict()]
	
	# Write the fieldnames
	outcsv = csv.DictWriter(fileHandle,headers)
	outcsv.writeheader()
	
	# Save all of the records
	for row in rows:
		outcsv.writerow( row.as_dict() )

with open( 'persons.csv', 'wb' ) as f:
	writeClassToFile( Person, store, f )
