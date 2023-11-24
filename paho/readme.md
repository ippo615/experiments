# Paho

A thingy

## Installing

Read more at http://mosquitto.org/documentation/python/

	sudo pip install paho-mqtt

## Documentation

https://pypi.python.org/pypi/paho-mqtt
http://www.eclipse.org/paho/

Server?
https://www.eclipse.org/paho/clients/c/embedded-sn/
So it's not really a server. There are clients and brokers. Clients can
publish information (write, broadcast, send) or subscribe to information
(read, listen, receive). The brokers facilitate the sending and
receiving of that data.


READ THIS FIRST:
http://www.eclipse.org/paho/articles/talkingsmall/

snippets:

	import time
	import Adafruit_BBIO.ADC as ADC
	import paho.mqtt.client as mqtt

	sensor_pin = 'P9_40'
	ADC.setup()

	mqttc = mqtt.Client()
	mqttc.connect("m2m.eclipse.org", 1883, 60)
	mqttc.loop_start()

	while True:
	  reading = ADC.read(sensor_pin)
	  millivolts = reading * 1800  # 1.8V reference = 1800 mV
	  temp_c = (millivolts - 500) / 10
	  print('mv=%.2f C=%.2f' % (millivolts, temp_c))
	  mqttc.publish("bbbexample/tmp36/mv","%.2f" % millivolts);
	  mqttc.publish("bbbexample/tmp36/c","%.2f" % temp_c);
	  time.sleep(1)

and:

	# curl http://eclipse.mqttbridge.com/bbbexample/tmp36/c
	19.10#


http://www.infoq.com/articles/practical-mqtt-with-paho

