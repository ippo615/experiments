import time
import random

import paho.mqtt.client as mqtt

def on_message(client, userdata, msg):
    print '%s: %s' % (
		msg.topic,
		str(msg.payload)
	)


mqttc = mqtt.Client()

# Comment out the following line to see the subscriber rejected
# When you do that you may see: [Errno 32] Broken pipe
mqttc.username_pw_set('the-subscriber', password=None)

mqttc.on_message = on_message
mqttc.connect('localhost', 1883, 60)
mqttc.subscribe('/random')
mqttc.subscribe('/count')
mqttc.loop_forever()
