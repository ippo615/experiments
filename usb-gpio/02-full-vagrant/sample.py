import time
 
import Adafruit_GPIO as GPIO
import Adafruit_GPIO.FT232H as FT232H
 
# Temporarily disable the built-in FTDI serial driver on Mac & Linux platforms.
FT232H.use_FT232H()
 
# Create an FT232H object that grabs the first available FT232H device found.
ft232h = FT232H.FT232H()
 
# Make D7 a digit input and C0 a digital output
# Note that pin numbers 0 to 15 map to pins D0 to D7 then C0 to C7
ft232h.setup(7, GPIO.IN)
ft232h.setup(8, GPIO.OUT)

print 'Press Ctrl-C to quit.' 

# Loop turning the LED on and off and reading the input state.
while True:

	# Toggle C0 every second (put an LED there to see it turn on/off)
	ft232h.output(8, GPIO.HIGH)
	time.sleep(1)
	ft232h.output(8, GPIO.LOW)
	time.sleep(1)

	# Read D7 and print out if it is high or low
	level = ft232h.input(7)
	if level == GPIO.LOW:
		print 'Pin D7 is LOW!'
	else:
		print 'Pin D7 is HIGH!'
