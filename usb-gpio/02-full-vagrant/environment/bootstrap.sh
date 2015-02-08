#!/usr/bin/env bash

# Install dependencies
sudo apt-get update
sudo apt-get --yes install build-essential libusb-1.0-0-dev swig cmake python-dev libconfuse-dev libboost-all-dev

# Build/install libftdi
wget http://www.intra2net.com/en/developer/libftdi/download/libftdi1-1.1.tar.bz2
tar xvf libftdi1-1.1.tar.bz2
cd libftdi1-1.1
mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX="/usr/" ../
make
sudo make install
cd ..

# Install Adafruit's GPIO library
wget https://github.com/adafruit/Adafruit_Python_GPIO/archive/master.tar.gz
tar xvf master.tar.gz
cd Adafruit_Python_GPIO-master
sudo python setup.py install
cd ..
