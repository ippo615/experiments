import time
import random

import paho.mqtt.client as mqtt

mqttc = mqtt.Client()
mqttc.connect('m2m.eclipse.org', 1883, 60)
mqttc.loop_start()

while True:
	mqttc.publish('simple-example-12345/random/a','%.2f' % random.random())
	time.sleep(1)
	mqttc.publish('simple-example-12345/random/b','%.2f' % random.random())
	time.sleep(5)
	mqttc.publish('simple-example-12345/random/a','%.2f' % random.random())
	time.sleep(1)

# What happens when the publisher is slow?
# The subsriber does not see anything until the next publish.
