import sqlite3

# Use a memory-only temporary database
connection = sqlite3.connect(':memory:')
cursor = connection.cursor()

# Create a table named 'people'
cursor.execute('''create table people (
	name,
	age
)''')

# Add people to the table using different formats
cursor.execute('insert into people values (?, ?)', ('Amy', 52))
cursor.execute('insert into people values (:name, :age)', {
	'name': 'Bob',
	'age': 48
})

# Search for Bob (NOTE the ',' to force the single-element tuple)
# try removing the ',' to see what the error looks like
cursor.execute('select * from people where name=?', ('Bob',))
print cursor.fetchone()
