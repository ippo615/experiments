import time

from pyduino import pyduino

a = pyduino.Arduino( '/dev/ttyUSB0' )
a.digital[13].set_mode( pyduino.DIGITAL_OUTPUT )
a.digital[13].write(True)
time.sleep( 2 )
a.digital[13].write(False)
