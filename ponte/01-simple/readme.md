# Simple Stuff

The point of Ponte is to bridge MQTT, HTTP REST, and COAP. Thes files
show how to work with HTTP and MQTT.

## The files:

 - `server.js` starts the ponte server.
 - `publisher.py` publishes random numbers over MQTT
 - `subscriber.py` listens for data that is generated over MQTT
 - `http_publish.sh` publishes a number to the server
 - `http_poll.sh` checks for data that is generated (like subscriber)

## TODO:

Replace the python scripts with nodejs scripts.
