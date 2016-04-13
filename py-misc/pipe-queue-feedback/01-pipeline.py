'''
from Queue import Queue

class Pipeline(Queue):
	
	def __init__( self, maxsize=0 ):
		Queue.__init__( self, maxsize )
'''
'''
def worker():
	while True:
		item = q.get()
		do_work(item)
		q.task_done()

q = Queue()
for i in range(num_worker_threads):
	t = Thread(target=worker)
	t.daemon = True
	t.start()

for item in source():
	q.put(item)

# block until all tasks are done
q.join()
'''

class Pipeline():

	def __init__( self, process ):
		self._rawElements = []
		self._processed = []
		self._raw = None
		self._mod = None

		self.isOk = False
		self.wasOk = False
		self.process = process

	def append( self, item ):
		self._rawElements.append( item )
	def extend( self, items ):
		self._rawElements.extend( items )

	def next( self ):
		
		handled = False

		# If something went wrong
		# Reprocess/reuse the last element
		self.wasOk = self.isOk
		if not self.isOk:
			
			# If we dont have a previous element - just load whatever
			if self._raw == None and len( self._rawElements ) > 0:
				self._raw = self._rawElements.pop(0)
				print 'Got Raw: %s' % self._raw
			
			print 'Reusing raw %s' % self._raw
			
			# Process/Reprocess
			self._mod = self.process( self._raw )
			self.isOk = True

		# Queue up the next prepared thingy
		self._processed.append( self._mod )
		

		# If we have more stuff to process, process it
		# otherwise, flag that we don't
		if len( self._rawElements ) > 0 and self.wasOk:
			self._raw = self._rawElements.pop(0)

		if self._raw != None:
			self._mod = self.process( self._raw )
			self._raw = None
		else:
			if self._mod != None:
				self._raw = None
				self._mod = None

		return self._mod

def makeCapital(letters):
	print 'Processing %s' % letters
	return letters.upper()


stuff = Pipeline( makeCapital )
stuff.extend( 'a b c d e f'.split(' ') )

stuff.next() # a
print 'ab'
stuff.next() # b
print 'bc'
stuff.next() # c
print 'cd'
stuff.isOk = False
stuff.next() # d
print 'de'
stuff.next() # e
print 'ef'
print stuff.next() # f
