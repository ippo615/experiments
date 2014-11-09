import tarfile
import StringIO

data = StringIO.StringIO('Hello world!')

with tarfile.open("sample.tar", "w") as tar:
	with open( '01-simple-tar.py', 'rb' ) as d:
		f2 = tarfile.TarInfo( name='01-simple-tar.py.copy' )
		f2.size = 50
		tar.addfile( tarinfo=f2, fileobj=d )
