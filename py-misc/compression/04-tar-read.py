import tarfile

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

# Error
#print '# Zip'
#with tarfile.open("files.zip", "r") as tar:
#	for f in tar:
#		print f.name
#		print tar.extractfile( f ).read()
