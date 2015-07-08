#!/usr/bin/python

import sys 
import time

# liblo defines a `time` function so do not blindly import everything
from liblo import ServerThread
from liblo import make_method

class MuseServer(ServerThread):

	# listen for messages on port (5001 by default)
	def __init__(self,port=5001):
		ServerThread.__init__(self, port)


	# accelrometer data
	@make_method('/muse/acc', 'fff')
	def acc_callback(self, path, args):
		acc_x, acc_y, acc_z = args
		print "%s %f %f %f" % (path, acc_x, acc_y, acc_z)


	# EEG data
	@make_method('/muse/eeg', 'ffff')
	def eeg_callback(self, path, args):
		l_ear, l_forehead, r_forehead, r_ear = args
		print "%s %f %f %f %f" % (path, l_ear, l_forehead, r_forehead, r_ear)


	# unexpected messages
	@make_method(None, None)
	def fallback(self, path, args, types, src):
		print """Unknown message
			Source: '%s'
			Address: '%s'
			Types: '%s'
			Payload: '%s'"
		""" % (src.url, path, types, args)


if __name__ == "__main__":

	try:
		server = MuseServer(5001)
	except ServerError, err:
		print str(err)
		sys.exit()

	server.start()

	while 1:
		time.sleep(1)
