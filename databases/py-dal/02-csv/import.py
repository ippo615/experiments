from pydal import DAL, Field

db = DAL('sqlite:memory:')

# Note: you cannot import the tables before they are defined.
# Uncomment the following to see what errors you get:
# with open( 'all-tables.csv', 'rb' ) as f:
#	db.import_from_csv_file(f)

db.define_table('persons',
	Field('name'),
	Field('age')
)
db.define_table('point2d',
	Field('x',type='double'),
	Field('y',type='double')
)

# Let's start by importing everything
with open( 'all-tables.csv', 'rb' ) as f:
	db.import_from_csv_file(f)

# Find the 'young people'
print db( db.persons.age <= 30 ).select()

# What happens if we import again?
# We get 2 copies of the data in the database with different IDs
with open( 'all-tables.csv', 'rb' ) as f:
	db.import_from_csv_file(f)
print db( db.persons.age <= 30 ).select()


# Optional file cleaning method
def clean():
	import glob
	import os
	for fname in glob.glob( '*.csv' ):
		os.remove( fname )

clean() # Comment if you want to keep the files
