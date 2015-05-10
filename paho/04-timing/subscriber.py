import time
import random

import paho.mqtt.client as mqtt

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

mqttc = mqtt.Client()
mqttc.on_message = on_message
mqttc.connect("m2m.eclipse.org", 1883, 60)
mqttc.subscribe('simple-example-12345/random')
mqttc.loop_forever()
