import sqlite3
import timeit

# ------------------------------ [ Data Sample Storage/Manipulation ] - 

class Sample( ):
	def __init__( self, time, value ):
		self.time = time
		self.value = value
	def __str__( self ):
		return '%s@%s' % (self.value,self.time)
	def copy(self):
		return Sample( self.time, self.value )

class Samples(list):
	def __init__( self ):
		list.__init__(self)

	def __str__( self ):
		return '[\n  %s\n]' % ',\n  '.join( [ '%s' % x for x in self ] )

	def step( self, start, end, position ):
		return start.value

	def lerp( self, start, end, position ):
		duration = end.time - start.time
		relation = position - start.time
		normalized = float(relation) / float(duration)
		return (1.0-normalized) * start.value + (normalized)*end.value

	def integrate( self, startTime, endTime, interpolate ):
	
		# Find the first sample before the start time
		firstIndex = 0
		for i in range(1,len(self)):
			if self[i].time >= startTime:
				firstIndex = i-1
				break
		
		# Find the first sample after the end time
		lastIndex = firstIndex
		for i in range(firstIndex,len(self)):
			if self[i].time >= endTime:
				lastIndex = i
				break
		
		# print '%s -> %s' % (firstIndex, lastIndex)
		
		# Interpolate to find the first value		
		prevValue = interpolate( self[firstIndex], self[firstIndex+1], startTime )
		prevTime = startTime

		# Integrate all of the small pieces in the middle
		total = 0
		for i in range( firstIndex+1, lastIndex-1 ):
			sample = self[i]
			dt = sample.time - prevTime
			area = 0.5 * float(sample.value + prevValue) * dt
			total += area
			prevTime = sample.time
			prevValue = sample.value
		
		# Interpolate to find the last value
		lastValue = interpolate( self[lastIndex-1], self[lastIndex], endTime )
		dt = endTime - prevTime
		area = 0.5 * float(lastValue + prevValue) * dt
		total += area
		
		return total

	def resample( self, start, end, delta, interpolate ):
		samples = Samples()
		t = start
		while t < end:
			area = self.integrate( t, t+delta, interpolate )
			value = float(area)/float(delta)
			samples.append( Sample( t, value ) )
			t += delta
		return samples

# ---------------------------------- [ Sqlite Data Storage Wrappers ] -

class SimpleTable():
	def __init__( self, connection, table ):
		self.connection = connection
		self.cursor = connection.cursor()
		self.table = table
		self.insertCommand = 'insert into %s values (?, ?)' % self.table
		self.selectCommand = 'select * from %s where time between ? and ?' % self.table
	
	def addEvent( self, time, value, force=False ):
		self.cursor.execute( self.insertCommand, (time, value) )

	def query( self, startTime, endTime ):
		results = self.cursor.execute(
			self.selectCommand, (
				startTime,
				endTime
			)
		)
		return results.fetchall()

class EventTable():
	def __init__( self, connection, table ):
		self.connection = connection
		self.cursor = connection.cursor()
		self.table = table
		self.insertCommand = 'insert into %s values (?, ?)' % self.table
		self.selectCommand = 'select * from %s where time between ? and ?' % self.table
		self.valueThreshold = 90
		self.lastTime = 0
		self.lastValue = 0
		self.maxTimeDelta = 100
	
	def addEvent( self, time, value, force=False ):
		dt = time - self.lastTime
		dv = value - self.lastValue
		if dt > self.maxTimeDelta or abs(dv) > self.valueThreshold or force:
			self.cursor.execute( self.insertCommand, (time, value) )
			self.lastTime = time
			self.lastValue = value

	def query( self, startTime, endTime ):
		results = self.cursor.execute(
			self.selectCommand, (
				startTime-self.maxTimeDelta,
				endTime + self.maxTimeDelta
			)
		)
		return results.fetchall()

# ---------------------------------------------------------- [ Main ] -

def runCompressed( connection, table, nEntries, startTime, endTime, deltaTime ):
	#cursor = connection.cursor()
	#cursor.execute('''create table %s (
	#	time int,
	#	value int
	#)''' % table )

	et = EventTable(connection, table)

	#import random
	#et.addEvent( 0, 0, force=True )
	#for i in range( 1, nEntries ):
	#	et.addEvent( i, 99*random.random() )
	#et.connection.commit()

	results = et.query( startTime, endTime )
	samples = Samples()
	for row in results:
		samples.append( Sample( *row ) )

	fixedSamples = samples.resample( startTime, endTime, deltaTime, samples.lerp )
	
	print '%s -> %s' % ( len(samples), len(fixedSamples) )


def runRegular( connection, table, nEntries, startTime, endTime, deltaTime ):
	cursor = connection.cursor()
	#cursor.execute('''create table %s (
	#	time int,
	#	value int
	#)''' % table )

	et = SimpleTable(connection, table)

	#import random
	#et.addEvent( 0, 0, force=True )
	#for i in range( 1, nEntries ):
	#	et.addEvent( i, 99*random.random() )
	#et.connection.commit()

	results = et.query( startTime, endTime )
	samples = Samples()
	for row in results:
		samples.append( Sample( *row ) )
	
	#fixedSamples = samples
	fixedSamples = samples.resample( startTime, endTime, deltaTime, samples.lerp )

	print '%s -> %s' % ( len(samples), len(fixedSamples) )

deltaConn = sqlite3.connect('deltaFile')
regulConn = sqlite3.connect('regulFile')

print timeit.Timer(
	'''runCompressed( deltaConn, 'tempDelta', 100000, 88, 51275, 100 )''',
	setup = '''from __main__ import *'''
).timeit( 1 )

print timeit.Timer(
	'''runRegular( regulConn, 'tempRgular', 100000, 88, 51275, 100 )''',
	setup = '''from __main__ import *'''
).timeit( 1 )

# +---------x
# | Results  \
# +-----------+-----------------------+----------------------+-------------+
# | Row Count | Delta Conversion Time | Full Conversion Time | Full Faster |
# +-----------+-----------------------+----------------------+-------------+
# | 51187     | 8.66494894028     (+) | 0.092679977417   (=) | +94x        |
# | 5119      | 0.870795965195    (+) | 27.7532989979    (-) | -32x        |
# | 512       | 0.0903339385986   (-) | 2.8106148243     (-) | -31x        |
# +-----------+-----------------------+----------------------+-------------+
# | Legend:                                                                |
# |   +94x: Data from full datatable was available 94 times faster         |
# |   -32x: Data grown from delta datatable was available 32 times faster  |
# |    (+): Data resampling added data points                              |
# |    (-): Data resampling removed data points                            |
# |    (=): Data resampling not performed                                  |
# +------------------------------------------------------------------------+
# | Additional Info:                                                       |
# | ---------------                                                        |
# | Delta Table Size: 65.5 kB (   65,536 bytes)              ( 1717 rows)  |
# | Full Table Size :  2.0 MB (2,015,232 bytes) (30x as big) (51188 rows)  |
# | Samples Generated: 100000 (aka 100,000)                                |
# | Samples Used: [88, 51275] -> 51187                                     |
# +------------------------------------------------------------------------+
