import sys
import time

import liblo
from muse_eeg_raw import MuseEegRaw
from muse_quantization_raw import MuseQuantizationRaw
from muse_eeg import MuseEeg

class MuseServer(liblo.ServerThread):
	#listen for messages on port 5001
	def __init__(self, sampleCount):
		liblo.ServerThread.__init__(self, 5001)
		self.maxSampleCount = sampleCount
		self.sampleCount = 0
		self.isRunning = True
		self.quantization = MuseQuantizationRaw( 1, 1, 1, 1 )

	@liblo.make_method('/muse/eeg/quantization', 'ffff')
	def quantization_callback(self, path, args):
		self.quantization = MuseQuantizationRaw( *args )

	@liblo.make_method('/muse/eeg', 'ffff')
	def eeg_callback(self, path, args):
		print MuseEeg( MuseEegRaw( *args ), self.quantization )

		self.sampleCount += 1
		if self.maxSampleCount <= self.sampleCount:
			#self.stop() # does this cause deadlock? yes it does
			self.isRunning = False

	#handle unexpected messages
	@liblo.make_method(None, None)
	def fallback(self, path, args, types, src):
		pass


if __name__ == "__main__":
	maxSamples = 16
	if len(sys.argv) > 1:
		maxSamples = float(sys.argv[1])

	try:
		server = MuseServer(maxSamples)
	except liblo.ServerError, err:
		print str(err)
		sys.exit()

	server.start()

	while server.isRunning:
		time.sleep(1)

