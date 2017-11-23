import time

import pyfirmata

# NOTE: USB0 may be ACM0 (or other)
board = pyfirmata.Arduino('/dev/ttyUSB0')

# Create a iterator otherwise board will keep reading/reporting
# until it overflows:
it = pyfirmata.util.Iterator(board)
it.start()
print dir(it)
board.analog[0].enable_reporting()
value = board.analog[0].read()
print "Reading analog[0]: %s" % value

board.exit()
