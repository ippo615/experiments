#!/usr/bin/python

import dbus, json

bus = dbus.SystemBus()
proxy = bus.get_object(
	'org.freedesktop.NetworkManager',
	'/org/freedesktop/NetworkManager'
)
manager = dbus.Interface(proxy, 'org.freedesktop.NetworkManager')

# .GetDevices is a method provided by the NetworkManager API which 
# returns a list of object paths that can be used to get those objects
# from D-Bus.
# https://wiki.gnome.org/Projects/NetworkManager/Developers
devices = manager.GetDevices()
for dev in devices:
	deviceProxy = bus.get_object( 'org.freedesktop.NetworkManager', dev )
	print ''
	print dev
	print deviceProxy

	# This is a standard interface provided by DBus:
	# http://dbus.freedesktop.org/doc/dbus-specification.html#standard-interfaces-properties
	propertiesInterface = dbus.Interface(
		deviceProxy,
		'org.freedesktop.DBus.Properties'
	)
	props = propertiesInterface.GetAll('org.freedesktop.NetworkManager.Device')
	print json.dumps(props, indent=2)
