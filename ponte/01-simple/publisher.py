import time
import random

import paho.mqtt.client as mqtt

mqttc = mqtt.Client()
mqttc.connect('localhost', 3001, 60)
mqttc.loop_start()

while True:
	# We need to tell the server to retain this result so that HTTP
	# requests can GET the data
	mqttc.publish('random','%.2f' % random.random(), retain=True)
	print 'pubished'
	time.sleep(1)
