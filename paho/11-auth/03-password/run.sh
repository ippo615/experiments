#!/bin/bash

# Create the password file and add 2 users
mosquitto_passwd -c passwords
mosquitto_passwd -b passwords 'the-publisher' 'alicePublisherPASSWORD2015'
mosquitto_passwd -b passwords 'the-subscriber' 'bobSubscriberPASSWORD2015'

# Start our custom mosquitto broker
sudo service mosquitto stop
mosquitto -c multi.conf

