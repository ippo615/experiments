import csv
import sqlite3

connection = sqlite3.connect(':memory:')
cursor = connection.cursor()

cursor.execute('''create table people (
	id integer primary key,
	name string,
	age integer
)''')

# Loading a table
def loadFromFile( cursor, fileHandle ):
	# Guess the appropriate CSV dialect by reading the first 5 lines
	dialect = csv.Sniffer().sniff(
		'\n'.join( fileHandle.readlines()[0:1] )
	)
	fileHandle.seek(0)

	# Get the headers and create an insert instruction template
	reader = csv.reader(fileHandle, dialect=dialect)
	headers = reader.next()
	insertTemplate = 'insert into people (%s) values (%s)' % (
		','.join(headers),
		','.join(['?']*len(headers))
	)
	
	for line in reader:
		cursor.execute(insertTemplate, line)

with open( 'persons.csv', 'rb' ) as f:
	loadFromFile( cursor, f )

print cursor.execute('select * from people').fetchall()
print cursor.execute('select * from people where age <= ?', (30,)).fetchall()

# What happens when you try to load the same data twice?
# You get an error -- sqlite3.IntegrityError: UNIQUE constraint failed
# Uncomment the following to see for yourself
# with open( 'persons.csv', 'rb' ) as f:
#	loadFromFile( cursor, f )

# Optional file cleaning method
def clean():
	import glob
	import os
	for fname in glob.glob( '*.csv' ):
		os.remove( fname )

clean() # Comment if you want to keep the files
