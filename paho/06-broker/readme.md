
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

Then start the broker:

	mosquito -c mosq.conf

Then you can run the publisher:

	python publisher.py

and the subscriber:

	python subscriber.py

You should see the subscriber listing random numbers.
