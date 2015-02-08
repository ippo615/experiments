# USB Devices in Vagrant (VirtualBox)

Start the environmen by running:

	vagrant up

Then access it with:

	vagrant ssh

Verify that you can see the USB device by running:

	lsusb

You should see the following (or something similar) in the list:

	Bus 001 Device 002: ID 0403:6014 Future Technology Devices International, Ltd FT232H Single HS USB-UART/FIFO IC

## Adding a USB device to a Vagrant machine

First determine the vendor and product ID of the device you want to add
by running lsusb:

	lsusb

The output will look like:

	Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
	Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
	Bus 001 Device 004: ID 064e:e374 Suyin Corp. 
	Bus 001 Device 006: ID 0930:0220 Toshiba Corp. 
	Bus 001 Device 003: ID 0bda:0129 Realtek Semiconductor Corp. RTS5129 Card Reader Controller
	Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
	Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
	Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
	Bus 003 Device 002: ID 046d:c03d Logitech, Inc. M-BT96a Pilot Optical Mouse
	Bus 003 Device 005: ID 0403:6014 Future Technology Devices International, Ltd FT232H Single HS USB-UART/FIFO IC
	Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

The device I want to add is the FT232H:

	Bus 003 Device 005: ID 0403:6014 Future Technology Devices International, Ltd FT232H Single HS USB-UART/FIFO IC

So I take note of the vendor id `0403` and the product id `6014`. Then
I add a VirtualBox USB filter to my `vagrantfile`:

	config.vm.provider :virtualbox do |vb|
	  vb.customize ['modifyvm', :id, '--usb', 'on']
	  vb.customize [
	    'usbfilter',
	    'add',
	    '0',
	    '--target', :id,
	    '--name', 'ft232h',
	    '--vendorid', '0x0403',
	    '--productid', '0x6014'
	  ]
	end

What exactly is it doing? First we enable USB on the virtual machine:

	vb.customize ['modifyvm', :id, '--usb', 'on']

Then we `add` a `usbfilter` in the `0`th slot called `ft232h` (you can
make any name you want). `'--target', :id` limits this filter to the
current virtual machine. The `vendorid` and `productid` are taken from
the `lsusb` command and should correspond the device you want to access.
