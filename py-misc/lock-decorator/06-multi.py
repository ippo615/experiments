import threading
import time

class Locker():
	
	def __init__( self ):
		self.lock = threading.Lock()
		self.namedLocks = {}	

	def addLock( self, name, allowNesting=True ):
		if name in self.namedLocks:
			raise KeyError('"%s" is already a registered lockname.' % (
				name
			) )
		
		if allowNesting:
			self.namedLocks[name] = threading.RLock()
		else:
			self.namedLocks[name] = threading.Lock()

	def acquire( self, name ):
		if not name in self.namedLocks:
			raise KeyError('"%s" is not a registered lockname. Call `locker.addLock("%s")`' % (
				name,
				name
			) )

		self.namedLocks[name].acquire()

	def release( self, name ):
		if not name in self.namedLocks:
			raise KeyError('"%s" is not a registered lockname. Call `locker.addLock("%s")`' % (
				name,
				name
			) )

		self.namedLocks[name].release()

	def lockAndWaitFor( self, name, autoUnlock=True, onError=lambda x:x ):
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
				with open( 'lock-%s' % name, 'a' ) as f:
					f.write('[%s] Aquiring lock in thread %s\n' % (
						time.time(),
						threading.currentThread().ident
					))
				self.namedLocks[name].acquire()
				try:
					result = action(*args,**kwargs)
					return result
				except Exception as e:
					onError(e)
				finally:
					with open( 'lock-%s' % name, 'a' ) as f:
						f.write('[%s] Releasin lock in thread %s\n' % (
							time.time(),
							threading.currentThread().ident
						))
					if autoUnlock:
						self.namedLocks[name].release()
			return f
		return decorator

locker = Locker()
locker.addLock( 'timer' )

import time

@locker.lockAndWaitFor('timer')
def wait1Sec():
	print 'Waiting 1 seconds %s ' % time.time()
	time.sleep( 1 )
	print 'Waited  1 seconds %s ' % time.time()

@locker.lockAndWaitFor('timer')
def wait5Sec():
	for i in range(0,5):
		wait1Sec()

if __name__ == '__main__':
	
	wait5Sec()
	
	a = threading.Thread( target=wait5Sec )
	b = threading.Thread( target=wait5Sec )
	a.start()
	b.start()
	
	b.join()
