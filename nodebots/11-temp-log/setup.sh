#!/bin/bash

scriptDir='vendor'
mkdir ${scriptDir}
wget http://cdnjs.cloudflare.com/ajax/libs/rickshaw/1.5.1/rickshaw.min.js -O ${scriptDir}/rickshaw.min.js
wget http://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js -O ${scriptDir}/d3.min.js
#TODO: add jquery and socket.io
