from pydal import DAL, Field

db = DAL('sqlite:memory:')

db.define_table('persons',
	Field('name'),
	Field('age')
)

amy = db.persons.insert( name='Amy', age=52 )
bob = db.persons.insert( name='Bob', age=48 )

# Call db.commit() to make your changes persistent
#db.commit()

query = db.persons.name.startswith('B')
row = db(query).select().first()
print row
