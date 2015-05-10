import time
import random

import paho.mqtt.client as mqtt

def on_a(client, userdata, msg):
    print ('a: %s' % msg.payload)

def on_b(client, userdata, msg):
    print ('b: %s' % msg.payload)

mqttc = mqtt.Client()
mqttc.connect('m2m.eclipse.org', 1883, 60)
mqttc.message_callback_add('simple-example-12345/random/a', on_a)
mqttc.message_callback_add('simple-example-12345/random/b', on_b)
mqttc.subscribe('simple-example-12345/random/a')
mqttc.subscribe('simple-example-12345/random/b')

mqttc.loop_forever()
