#!/usr/bin/env bash

# Since I'm usually running these on a clean (new) system the repo
# links need to be updated (otherwise some packages will fail)
apt-get update

# ssh for easier command line (already done by vagrant?)
# apt-get -y install openssh-server openssh-client

# Git for source code version control
apt-get -y install git

# daux.io runs on php5.4 (or newer)
apt-get -y install php5

# pull the latest daux repo
git clone https://github.com/justinwalsh/daux.io.git

# Nodejs stuff is optional
# Nodejs (symbolic link fixes naming problem)
#apt-get -y install nodejs npm
#ln -s /usr/bin/nodejs /usr/bin/node
