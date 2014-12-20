# Meld - Setting Up a Development Environment

## Summary

Install and setup an Ubuntu 14.04 LTS minimal image. Copy the
`install.sh` script to the home directory and run it.

## Detailed Version

Below you will find a detailed walk through of how to create the
development environment on any system.

### Install VirtualBox

To keep the development envirnment contained, it will be installed 
in its own virtual machine. A virtual machine enables a "guest"
operating system to run on a "host" operating system and keeps their
file system, process, memory, etc completely separated. This prevents
the host from becoming cluttered and enables all developers to use the
same environment locally.

There are several programs that can run virtual machines. VirtualBox
and VMWare are 2 options. VirtualBox is a good option because it is
free and open source.

#### On Ubuntu or Debian Hosts

If you use Ubuntu or Debian you can run the following (instead of
downloading it manually):

	sudo apt-get install virtual box

#### On Other Hosts

Open https://www.virtualbox.org/wiki/Downloads in a webbrowser. You
should see around 4 links to download the VirtualBox platform package:

 - VirtualBox 4.3.20 for Windows hosts: x86/amd64
 - VirtualBox 4.3.20 for OS X hosts: x86/amd64
 - VirtualBox 4.3.20 for Linux hosts: x86/amd64
 - VirtualBox 4.3.20 for Solaris hosts: amd64 

Download the one that best matches your operating system.

Once the program has finished downloading, run the installer. It will
take some time to install.

### Install Ubuntu 14.04 LTS as a Guest

#### Download Ubuntu 14.04 Net Install

The development environment does not need everything that comes with a
desktop ubuntu installation. Luckily, Canonical provides a minimal
installation image which has only the essentials needed for a basic
system. You can download an image for your architecture from:
http://cdimage.ubuntu.com/netboot/14.04/

If you're not sure of your architecture it's probably `amd_64`.

#### Create the Virtuall Machine

A virtual machine needs to be created to represent hardware that would
be used. It's like shopping for a new computer but instead of buying
hardware with 512MB of ram and an 8GB hard drive, VirtualBox uses your
current computer to represent that new computer.

Most of VirtualBox's default options are perfect and they provide good
descriptions of what the different options do. You could create a
different machine which works equivalently with different settings.
What follows are exact settings that I use.

Launch VirtualBox. Click `New` and enter the following information:

	- Name and Operating System
		- Name: Ubuntu Meld Development
		- Type: Linux
		- Version: Ubuntu (64 bit)

The default or suggested memory size is usually a good bet:

	- Memory Size
		- 512MB

You'll want to create a new virtual hard drive:

	- Hard Drive
		- Create a virtual hard drive now

	- Hard Drive File Type
		- VDI (VirtualBox Disk Image)
	- Storage on Physical Hard Drive
		- Dynamically Allocated
	- File Location and Size
		- Location: Ubuntu Meld Development
		- Size: 8.00 GB

#### Connect the Virtual Machine to your Network

The Virtual Machine needs to connect to the internet and to the host
computer (it doesn't *need* to connect to host computer but it is very
useful if it does).

Select your virtual machine (Ubuntu Meld Development) and then click
the `Settings` button. Then set the following:

	- Network
		- Adapter 1
			- Enable Network Adapter: Enable
			- Attached To: Bridged Adpater
			- Name: wlan0

Note that the name `wlan0` may be different depending on your host's
configuration. It should be interface used to connect to the internet.
People typically connect with their 1st wireless adapter (hence
`wlan0`). If you connect with your ethernet cable it may be `eth0`.

#### Adjust the Settings of the Virtual Machine

We need to "put the CD" into the virtual machine and have it boot from
that. To do that select your virtual machine (Ubuntu Meld Development)
and then click the `Settings` button. Then look for:
`Storage / Controller: IDE - Empty`. Click "Empty" then look for 
a CD icon on the right. Click the CD icon and select the `.iso` image
that was downloaded previously (from Download Ubuntu 14.04 Net Install).

Check out the following link for a clear picture of the buttons to click
when "inserting the cd."
http://www.psychocats.net/ubuntu/images/virtualboxprecise10.jpg 

#### Install and Configure Ubuntu

Click the `Start` button to boot the virtual machine. 

Follow the installation. The default options are usually correct.
TODO: add details

Congratulations! You should now have a working Ubuntu virtual machine.

### Install the Development Environment

Now that you have a virtual machine we'll install the development tools.

Download the script that I attached to this email. I'll assume you saved
it as `~/Downloads/install.sh`. Then run the following on the host
computer:

	cd ~/Downloads/
	python -m SimpleHTTPServer

On the guest run:

	arp -a

It should list some (2?) IP addresses. One of those two is the IP
address of the host (ie Mac OSX) as seen by the guest (Ubuntu). You can
guess if you're not sure (it's probably not the one that ends in `1`).

Then on the guest run:

	wget IP_ADDRESS_OF_HOST:8000/install.sh

For example, I ran:

	wget 192.168.0.121:8000/install.sh

Then (also on the guest) make the script executable and run it:

	chmod +x install.sh
	sudo ./install.sh programs

Once the dependencies have installed you need to reboot the virtual
machine (just turn it off and back on). Then install cloud9 and some
files to play with:

	./install.sh cloud9
	./install.sh files

Doesn't hurt to reboot after this too.

### Start the development environment

Everytime you reboot the virtual machine you need to run (on the guest)
the following command to start cloud9 and the file server:

	~/meld/run.sh serve

It should then tell you how to access those files on your host
computer.

To run the tests:

	~/meld/run.sh test

