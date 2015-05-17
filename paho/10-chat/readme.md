
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

Start the broker and load `index.html` in your favorite browser (that
supports websockets):

	mosquitto -c multi.conf

## IMPORTANT

I'm an idiot. I just needed to use absolute URLs to publish and
subscribe to different resources.

Don't do:

	publish('random',12345)
	subscribe('count')
	subscribe('random')

Do do:

	publish('/random',12345)
	subscribe('/count')
	subscribe('/random')

Then everything works as expected ie messages published on mqtt are
also sent to websockets and messages published on websockects are also
sent to mqtt.

More info:

	https://mm011106.github.io/reference/mosquitto_conf.html

TODO:

http://eclipse.org/ponte/#install
