# USB Devices in Vagrant (VirtualBox)

Start the environment by running:

	vagrant up

Then access it with:

	vagrant ssh

## Stuff

This machine should be setup to see the FT232H device connected to your
USB port and it already has the libraries required to use it. After you
ssh into the machine you can see a demo by running:

	sudo python /vagrant/sample.py

View the source to see what it does!
