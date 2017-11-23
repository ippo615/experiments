import firmata

print 'Getting board'
a = firmata.firmata.Arduino('/dev/ttyUSB0')
print dir(a)
a.pin_mode(13, firmata.firmata.OUTPUT)
print 'Turning LED on'
a.digital_write(13, firmata.firmata.HIGH)
a.delay(2)
print 'Turning LED off'
a.digital_write(13, firmata.firmata.LOW)
a.delay(2)
