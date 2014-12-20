#!/bin/bash

# Since I'm usually running these on a clean (new) system the repo
# links need to be updated (otherwise some packages will fail)
sudo apt-get update

# Mkdocs for documentation
sudo apt-get -y install python python-pip
sudo pip install mkdocs

# Pandoc with PDF support (warning: huge)
#sudo apt-get -y install pandoc
#sudo apt-get -y install texlive

# Nodejs (symbolic link fixing naming conflict)
sudo apt-get -y install nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node

# Mocha testing + Istanbul code coverage
sudo npm install -g mocha
sudo npm install -g istanbul

# Jshint code style/quality checker
# http://jshint.com/docs/options/
sudo npm install -g jshint

# Cloud9 web-based development enviornment
sudo apt-get -y install git
git clone https://github.com/ajaxorg/cloud9.git ~/cloud9
cd ~/cloud9
sudo npm install
