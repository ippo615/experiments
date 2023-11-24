# Muse 

This stuff is working with the Muse brainwave reader:
http://www.choosemuse.com/

## Installing Muse

You can install (on Linux) it by running:

	wget http://storage.googleapis.com/musesdk/musesdk-3.2.2-linux-installer.run -O musesdk.install
	chmod a+x musesdk.install
	./musesdk.install

It will launch a graphical installer.

You can also read:
https://sites.google.com/a/interaxon.ca/muse-developer-site/download

## Dependencies

After (or before) installing Muse you need to install some dependencies,
specifically: [liblo](http://liblo.sourceforge.net/) and
[pyliblo](http://das.nasophon.de/pyliblo/). You can run:

	sudo apt-get install liblo7 python-liblo

Some extra packages which may be helpful:

	sudo apt-get install liblo-tools python-liblo-docs

You should open a new terminal because Muse provides 

WARNING: You may be running a 64-bit operating system. Unfortunately,
Muse does not currently have a 64-bit version so we need to install
the 32-bit versions.


Error:

	./muse-io: error while loading shared libraries: libbluetooth.so.3: cannot open shared object file: No such file or directory

Resolution:

	sudo apt-get install libbluetooth3

Then run muse-io as root (`sudo ./muse-io`) and get other errors.

Error:

	./muse-io: error while loading shared libraries: liblsl.so: cannot open shared object file: No such file or directory

I dug through all of the dependencies and found that one for the i386
architecture that was missing: `libstdc++.so.6`. How do I install it? I
tried:

	sudo apt-get install libstdc++6:i386

Which stated it was installed and at the newest version.

Notes:

https://sites.google.com/a/interaxon.ca/muse-developer-site/developer-getting-started-guide
https://sites.google.com/a/interaxon.ca/muse-developer-site/museio
https://sites.google.com/a/interaxon.ca/muse-developer-site/museio/tutorial
https://sites.google.com/a/interaxon.ca/muse-developer-site/download
https://sites.google.com/a/interaxon.ca/muse-developer-site/muselab/tutorial

## Setting Up a 32-Bit Bluetooth Enabled VM

First download and install VirtualBox from
https://www.virtualbox.org/wiki/Downloads
Do NOT use `apt-get install virtualbox` (or similar) because we do not
want the open source edition, we want the closed source one which you 
get by downloading from the website. (If you've already installed
VirtualBox with `apt-get` you can uninstall it and install the new one
without deleting anything).

Once VirtualBox is installed, download the extension pack (also on the 
download page: https://www.virtualbox.org/wiki/Downloads
Install the extension pack by starting VirtualBox and clicking
`File / Preferences / Extensions`. There is a button on the right side
of the popup window that can be used to install the extension.

We need to add the current user to the `vboxusers` group so that they
have permission to see the USB devices in VirtualBox. Exit VirtualBox,
open a terminal and run:

	sudo usermod -a -G vboxusers $USER

Then log out and log back in. The user should now have access to USB
devices in guest machines.

Now we'll install a 32-bit version of Ubuntu as the guest os. Just
download and setup the 32-bit release of Ubuntu 14.04 in VirtualBox.

	sudo usermod -a -G bluetooth $USER

Also note: 3d acceleration must be enabled but it still did not work.

Find the MAC Address of your Muse (you can do this by pairing or ...).
Press the button on the inner right side of the Muse.
Start MuseIO specifying the MAC address of your Muse as the device:

	muse-io --device 00:06:66:6C:1F:EF --osc osc.udp://localhost:5001,osc.udp://localhost:5002

