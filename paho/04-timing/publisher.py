import time
import random

import paho.mqtt.client as mqtt

mqttc = mqtt.Client()
mqttc.connect("m2m.eclipse.org", 1883, 60)
mqttc.loop_start()

time.sleep(30)

while True:
	mqttc.publish("simple-example-12345/random","%.2f" % random.random())
	time.sleep(1)
	mqttc.publish("simple-example-12345/random","%.2f" % random.random())
	time.sleep(200)

# What happens when the publisher is slow?
# The subsriber does not see anything until the next publish.
