import zipfile
import tarfile

"""
This allows tar, tar.gz, tar.bz2, and zip archives to be read as
iterators, transparently (ie you don't need to know what type of
archive it is).

Look at the `cat_archive` function to see how to use it.
"""

"""
print '# Zip'
with zipfile.ZipFile("files.zip", "r") as archive:
	for f in archive.infolist():
		print f.filename
		print archive.open( f ).read()

print '# GZip'
with tarfile.open("files.tar.gz", "r") as tar:
	for f in tar:
		print f.name
		print tar.extractfile( f ).read()

print '# BZip2'
with tarfile.open("files.tar.bz2", "r") as tar:
	for f in tar:
		print f.name
		print tar.extractfile( f ).read()
"""

class FileInfo():
	def __init__( self, name, data ):
		self.name = name
		self.data = data

class FileArchive():
	def __init__( self, filename ):
		self.archiveName = filename
		self.isZip = False
		self.isTar = False
		self._fileInfos = []

		if zipfile.is_zipfile( filename ):
			self.archiveHandle = zipfile.ZipFile( filename, 'r' )
			self.isZip = True
			self._fileInfos = self.archiveHandle.infolist()
		if tarfile.is_tarfile( filename ):
			self.archiveHandle = tarfile.open( filename, 'r' )
			self.isTar = True
			self._fileInfos = self.archiveHandle.getmembers()

	def __enter__( self ):
		return self

	def __exit__( self, a, b, c ):
		self.close()

	def close( self ):
		self.archiveHandle.close()

	def __iter__(self):
		self._iterIndex = -1
		return self

	def next(self):

		self._iterIndex += 1
		if self._iterIndex >= len(self._fileInfos):
			raise StopIteration

		f = self._fileInfos[self._iterIndex]

		if self.isZip:
			return FileInfo(
				f.filename,
				self.archiveHandle.open( f )
			)

		if self.isTar:
			return FileInfo(
				f.name,
				self.archiveHandle.extractfile( f )
			)

def cat_archive( archivePath ):
	print '# %s' % archivePath
	with FileArchive( archivePath ) as files:
		for f in files:
			print 'File: %s' % f.name
			print f.data.read()

cat_archive( 'files.tar.gz' )
cat_archive( 'files.tar.bz2' )
cat_archive( 'files.zip' )
