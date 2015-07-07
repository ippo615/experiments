
import os
import shutil
import time
import glob
import threading

class AutoBackup(  ):

	def __init__(
		self,
		paths = [],
		versions = 1,
		period = 1
	):
		self.paths = paths
		self.versions = versions
		self.period = period
		self.isRunning = False
		self.thread = None

	def append( self, path ):
		self.paths.append( path )

	def start( self ):
		self.thread = threading.Thread( target=self.run )
		self.isRunning = True
		self.thread.start()

	def run( self ):
		while self.isRunning:
			for path in self.paths:
				self.backup( path )
			time.sleep( self.period )

	def stop( self ):
		self.isRunning = False
		self.thread.join()

	def rotatePath( self, path ):		
		for version in range( self.versions-1, -1, -1 ):
			sourceName = '%s.back.%s' % (path, version)
			if os.path.isfile(sourceName):
				shutil.copy(
					sourceName,
					'%s.back.%s' % (path, version+1)
				)

	def backup( self, path ):
		self.rotatePath( path )
		shutil.copy( path, '%s.back.%s' % (path, 0) )

	def restore(self,path,version=0):
		shutil.copy( '%s.back.%s' % (path, version), path )
	

ab = AutoBackup(
	paths = [
		'test-a',
		'test-b'
	],
	versions = 2
)

ab.start()
time.sleep( 10 )
ab.stop()
