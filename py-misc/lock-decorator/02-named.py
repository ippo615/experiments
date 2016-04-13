import threading

class Locker():
	
	def __init__( self, lockNames=[] ):
		self.lock = threading.Lock()
		self.namedLocks = {}
		for name in lockNames:
			self.namedLocks[name] = threading.Lock()
	
	def addLock( self, name ):
		if name in self.namedLocks:
			raise KeyError('"%s" is already a registered lockname.' % (
				name
			) )
		
		self.namedLocks[name] = threading.Lock()
	
	def lockAndWaitFor( self, name ):
		if not name in self.namedLocks:
			raise KeyError('"%s" is not a registered lockname. Call `locker.addLock("%s")`' % (
				name,
				name
			) )
		
		def decorator( action ):
			def f(*args,**kwargs):
				self.namedLocks[name].acquire()
				result = action(*args,**kwargs)
				self.namedLocks[name].release()
				return result
			return f
		return decorator

locker = Locker(['motors','thingy'])
locker.addLock('xyz')

import time

@locker.lockAndWaitFor('motors')
def wait10Sec():
	print 'Waiting 10 seconds %s ' % time.time()
	time.sleep( 10 )
	print 'Waited  10 seconds %s ' % time.time()

@locker.lockAndWaitFor('motors')
def wait5Sec():
	print 'Waiting 5 seconds %s ' % time.time()
	time.sleep( 5 )
	print 'Waited  5 seconds %s ' % time.time()

@locker.lockAndWaitFor('thingy')
def wait3Sec():
	print 'Waiting 3 seconds %s ' % time.time()
	time.sleep( 3 )
	print 'Waited  3 seconds %s ' % time.time()

@locker.lockAndWaitFor('xyz')
def wait3Sec():
	print 'Waiting 3 seconds %s ' % time.time()
	time.sleep( 3 )
	print 'Waited  3 seconds %s ' % time.time()

if __name__ == '__main__':
	first = threading.Thread( target=wait10Sec )
	second = threading.Thread( target=wait5Sec )
	first.start()
	second.start()
	
	a = threading.Thread( target=wait3Sec )
	b = threading.Thread( target=wait3Sec )
	c = threading.Thread( target=wait3Sec )
	a.start()
	b.start()
	c.start()
	
	second.join()
