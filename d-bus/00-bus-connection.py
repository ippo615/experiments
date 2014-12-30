#!/usr/bin/python

import dbus

# The system bus is global (for the entire operating system)
systemBus = dbus.SystemBus()
print 'Connected to the system wide bus:'
print systemBus

# The session bus is per user
sessionBus = dbus.SessionBus()
print 'Connected to the session bus:'
print sessionBus
