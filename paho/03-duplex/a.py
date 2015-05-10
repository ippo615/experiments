import time
import random

import paho.mqtt.client as mqtt

# This one publishes random numbers on b and listens to random
# numbers from a

def on_message(client, userdata, msg):
    print '%s %s' % (
		msg.topic,
		str(msg.payload)
	)

mqttc = mqtt.Client()
mqttc.connect('m2m.eclipse.org', 1883, 60)
mqttc.on_message = on_message
mqttc.subscribe('simple-duplex-89542-a/random')
mqttc.loop_start()

while True:
	mqttc.publish('simple-duplex-89542-b/random','%.2f' % random.random())
	time.sleep(1)
