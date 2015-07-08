import sys
import time

import liblo

class MuseServer(liblo.ServerThread):
	#listen for messages on port 5001
	def __init__(self):
		liblo.ServerThread.__init__(self, 5001)

	#receive accelrometer data
	@liblo.make_method('/muse/acc', 'fff')
	def acc_callback(self, path, args):
		acc_x, acc_y, acc_z = args
		print "%s x:%f y:%f z:%f" % (path, acc_x, acc_y, acc_z)

	#handle unexpected messages
	@liblo.make_method(None, None)
	def fallback(self, path, args, types, src):
		pass

try:
	server = MuseServer()
except ServerError, err:
	print str(err)
	sys.exit()

server.start()

if __name__ == "__main__":
	while 1:
		time.sleep(1)

