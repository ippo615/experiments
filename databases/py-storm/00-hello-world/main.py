from storm.locals import create_database
from storm.locals import Store
from storm.locals import Int, Unicode
 
class Person(object):
	__storm_table__ = 'person'

	id = Int(primary=True)
	name = Unicode()
	age = Int()
	
	# If you don't create an __init__ method then you need to
	# instantiate with:
	#     instance = Person()
	#     instance.name = u'John'
	#     instance.age = 55
	def __init__( self, name, age ):
		self.name = name
		self.age = age
	
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

amy = Person( name=u'Amy', age=52 )
bob = Person( name=u'Bob', age=48 )

store.add( amy )
store.add( bob )

person = store.find(Person, Person.name == u'Bob').one()
print person
