import threading

class Locker():
	
	def __init__( self, lockNames=[] ):
		self.lock = threading.Lock()
		self.namedLocks = {}
		for name in lockNames:
			self.namedLocks[name] = threading.Lock()
	
	def addLock( self, name, allowNesting=True ):
		if name in self.namedLocks:
			raise KeyError('"%s" is already a registered lockname.' % (
				name
			) )
		
		if allowNesting:
			self.namedLocks[name] = threading.RLock()
		else:
			self.namedLocks[name] = threading.Lock()
	
	def lockAndWaitFor( self, name, onError=lambda x:x ):
		if not name in self.namedLocks:
			raise KeyError('"%s" is not a registered lockname. Call `locker.addLock("%s")`' % (
				name,
				name
			) )
		
		# Note: you need the try/finally to ensure the lock gets
		# unlocked after an exception; otherwise, the lock will remain
		# locked and the program will freeze at the next location that
		# tries to acquire it.
		# The `except` part is used to catch all errors and give the 
		# user a way to handle them (instead of surpressing all of
		# them).
		
		def decorator( action ):
			def f(*args,**kwargs):
				self.namedLocks[name].acquire()
				try:
					result = action(*args,**kwargs)
					return result
				except Exception as e:
					onError(e)
				finally:
					self.namedLocks[name].release()
			return f
		return decorator

locker = Locker(['error'])

import time

@locker.lockAndWaitFor('error')
def wait5Sec():
	print 'Waiting 5 seconds %s ' % time.time()
	time.sleep( 5 )
	print 'Waited  5 seconds %s ' % time.time()

def _raise( x ):
	raise x

@locker.lockAndWaitFor('error', onError=_raise)
def waitError():
	print 'Waiting 3 seconds %s ' % time.time()
	raise RuntimeError('Fuck you ^_^')
	print 'Waited  3 seconds %s ' % time.time()

if __name__ == '__main__':
	
	a = threading.Thread( target=wait5Sec )
	b = threading.Thread( target=waitError )
	c = threading.Thread( target=wait5Sec )
	a.start()
	b.start()
	c.start()
	
	c.join()

