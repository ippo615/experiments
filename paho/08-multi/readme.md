
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

More info:

	https://mm011106.github.io/reference/mosquitto_conf.html

TODO:

http://eclipse.org/ponte/#install
