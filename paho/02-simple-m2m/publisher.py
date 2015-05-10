import time
import random

import paho.mqtt.client as mqtt

mqttc = mqtt.Client()
mqttc.connect('m2m.eclipse.org', 1883, 60)
mqttc.loop_start()

while True:
	mqttc.publish('simple-example-12345/random','%.2f' % random.random())
	print 'pubished'
	time.sleep(1)
