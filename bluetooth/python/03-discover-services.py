#!/usr/bin/python

# Adapted from:
# https://code.google.com/p/pybluez/source/browse/examples/simple/sdp-browse.py

import bluetooth

target = None
services = bluetooth.find_service(address=target)

if len(services) > 0:
    print 'found %d services on %s' % (len(services), target))
    print ''
else:
    print 'no services found'

for svc in services:
	print 'Device Name: %s' % bluetooth.lookup_name(svc['host'])
	print 'Service Name: %s'    % svc['name']
	print '    Host:        %s' % svc['host']
	print '    Description: %s' % svc['description']
	print '    Provided By: %s' % svc['provider']
	print '    Protocol:    %s' % svc['protocol']
	print '    channel/PSM: %s' % svc['port']
	print '    svc classes: %s' % svc['service-classes']
	print '    profiles:    %s' % svc['profiles']
	print '    service id:  %s' % svc['service-id']
	print ''
