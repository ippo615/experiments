from pydal import DAL, Field

db = DAL('sqlite:memory:')

db.define_table('persons',
	Field('name'),
	Field('age')
)

amy = db.persons.insert( name='Amy', age=52 )
bob = db.persons.insert( name='Bob', age=48 )
cat = db.persons.insert( name='Cat', age=23 )
dan = db.persons.insert( name='Dan', age=17 )
edd = db.persons.insert( name='Edd', age=77 )
fan = db.persons.insert( name='Fan', age=65 )
gin = db.persons.insert( name='Gin', age=27 )
hil = db.persons.insert( name='Hil', age=30 )
iri = db.persons.insert( name='Iri', age=62 )
jac = db.persons.insert( name='Jac', age=18 )
db.commit()

# Export the 'persons' database
with open( 'persons.csv', 'wb' ) as f:
	f.write( str(db(db.persons.id).select()) )

# Export only the young persons
with open( 'young-people.csv', 'wb') as f:
	people = db( db.persons.age <= 30 ).select()
	f.write( str( people ) )


# Let's make another table and export mutliple tables
db.define_table('point2d',
	Field('x',type='double'),
	Field('y',type='double')
)

db.point2d.insert( x=10, y=10 )
db.point2d.insert( x=10, y=20 )
db.point2d.insert( x=20, y=20 )
db.point2d.insert( x=20, y=10 )
db.commit()

# EXPORT all the TABLES!
with open('all-tables.csv','wb') as f:
	db.export_to_csv_file(f)

