import time

from pyfirmata import Arduino

# NOTE: USB0 may be ACM0 (or other)
print 'Looking for arduino'
board = Arduino('/dev/ttyUSB0')
print 'Turning on LED'
board.digital[13].write(1)
time.sleep( 1 )
print 'Turning off LED'
board.digital[13].write(0)
board.exit()
print 'Done!'
