import threading

class Locker():
	
	def __init__( self ):
		self.lock = threading.Lock()
	
	def lockAndWait( self, action ):
		def f(*args,**kwargs):
			self.lock.acquire()
			result = action(*args,**kwargs)
			self.lock.release()
			return result
		return f

locker = Locker()

import time

@locker.lockAndWait
def wait10Sec():
	print 'Waiting 10 seconds %s ' % time.time()
	time.sleep( 10 )
	print 'Waited  10 seconds %s ' % time.time()

@locker.lockAndWait
def wait5Sec():
	print 'Waiting 5 seconds %s ' % time.time()
	time.sleep( 5 )
	print 'Waited  5 seconds %s ' % time.time()

if __name__ == '__main__':
	wait10Sec()
	wait5Sec()
	first = threading.Thread( target=wait10Sec )
	second = threading.Thread( target=wait5Sec )
	first.start()
	second.start()
	print 'Waiting for second'
	second.join()
