import zipfile

print '# Zip'
with zipfile.ZipFile("files.zip", "r") as archive:
	for f in archive.infolist():
		print f.filename
		print archive.open( f ).read()
