
# Mosquitto Brokers

## Simple Installation

First we need to install mosquitto and the broker (server) libraries.
There is a personal package archive that has the latest mosquitto code.
We add that repository and then install the appropriate mosquitto
libraries:

	sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
	sudo apt-get update 
	sudo apt-get install mosquitto python-mosquitto
	sudo apt-get install mosquitto-clients

After mosquitto installs, you should stop the service because we're
going to manually start is later. To stop it:

	sudo service mosquitto stop

## Websockets

We want to use mqtt with websockets so we can have a rich, interactive
webpage. To do that we create a config file (see websocket.conf) that
tells the broker to use a specific and protocol:

	bind_address localhost
	port 1883
	protocol websockets

I bound it to `localhost` because I will be running this locally. I
chose to leave it on the "default" port of `1883`. Also I expicitly
say to use `websockets` as the protocol.

Start the broker and load `index.html` in your favorite browser (that
supports websockets):

	mosquitto -c websocket.conf

