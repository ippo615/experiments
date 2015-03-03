import time
import threading
 
import Adafruit_GPIO as GPIO
import Adafruit_GPIO.FT232H as FT232H
 
class LED(  ):

	def __init__( self, driver, pin, active=GPIO.HIGH ):
		self.driver = driver
		self.pin = pin
		self.active = active
		self.inactive = GPIO.LOW if active == GPIO.HIGH else GPIO.HIGH
		self._is_looping = False
		self.worker = None

	def setup( self ):
		self.driver.setup( self.pin, GPIO.OUT )

	def pwm( self, cycle, percent ):
		self.driver.output(self.pin, self.active)
		time.sleep(cycle*percent)
		self.driver.output(self.pin, self.inactive)
		time.sleep(cycle*(1.0-percent))

	def _check_worker( self ):
		self._is_looping = False

	def pwm_loop( self, cycle, percent ):
		self._is_looping = True
		while self._is_looping:
			self.pwm( cycle, percent )

	def on( self, brightness ):
		self._check_worker()
		self.worker = threading.Thread(
			target = self.pwm_loop,
			args = (
				0.005,
				percent
			)
		)
		self.worker.start()

	def off( self ):
		self._check_worker()

# --------------------------------------------------------------- MAIN -

# Temporarily disable the built-in FTDI serial driver.
# This was causing the code to crash a lot (so I removed it)
# FT232H.use_FT232H()

# Create an FT232H object that uses the first available FT232H device
ft232h = FT232H.FT232H()

led = LED( ft232h, 0 )
for i in range( 0, 10 ):
	led.on( float(i)/10.0 )
	time.sleep( 2 )

led.off()
