#!/bin/bash

# Start our custom mosquitto broker
sudo service mosquitto stop
mosquitto -c multi.conf

