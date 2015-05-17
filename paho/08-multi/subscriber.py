import time
import random

import paho.mqtt.client as mqtt

def on_message(client, userdata, msg):
    print '%s: %s' % (
		msg.topic,
		str(msg.payload)
	)

mqttc = mqtt.Client()
mqttc.on_message = on_message
mqttc.connect('localhost', 1883, 60)
mqttc.subscribe('/random')
mqttc.subscribe('/count')
mqttc.loop_forever()
