# Serve the page where the user can upload something
def upload():
	return dict()

# Process the user's upload
def upload_async():
	filename = str(request.env['http_x_filename'])
	data = request.body
	# You should NOT use the orignal name as the name of the file on your
	# server. I'm just using it here for demonstration.
	with open(filename,'wb') as outFile:
		byte = data.read(1)
		while byte:
			outFile.write(byte)
			byte = data.read(1)
