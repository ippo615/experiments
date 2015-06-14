import csv
import sqlite3

# Use a memory-only temporary database
connection = sqlite3.connect(':memory:')
cursor = connection.cursor()

# Create a table named 'people'
cursor.execute('''create table people (
	id integer primary key,
	name,
	age
)''')

# Insert people using a generator
def generatePeople():
	yield ('Amy', 52 )
	yield ('Bob', 48 )
	yield ('Cat', 23 )
	yield ('Dan', 17 )
	yield ('Edd', 77 )
	yield ('Fan', 65 )
	yield ('Gin', 27 )
	yield ('Hil', 30 )
	yield ('Iri', 62 )
	yield ('Jac', 18 )
cursor.executemany('insert into people (name, age) values (?, ?)', generatePeople())

# Custom function to save a csv file
def writeToFile( cursor, fileHandle ):
	outcsv = csv.writer(fileHandle)
	
	# Start by writing the headers
	outcsv.writerow([
		column[0] for column in cursor.description
	])
	
	# Save all of the records
	for record in cursor.fetchall():
		outcsv.writerow(record)

#print dir( cursor.execute('select * from people').fetchall()[0] )
#for name in cursor.description:
#	print name[0]

with open( 'persons.csv', 'wb' ) as f:
	writeToFile( cursor.execute('select * from people'), f )
