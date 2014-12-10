#!/bin/bash

# It's import to place everything relative to the directory this script
# is STORED in (not where it runs from). DIR holds that info
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

function install(){
	echo "Installing dependencies for writing/editing documentation."

	# Since I'm usually running these on a clean (new) system the repo
	# links need to be updated (otherwise some packages will fail)
	sudo apt-get update

	sudo apt-get install pandoc
	sudo apt-get install texlive
}

function create(){
	# Nothing yet
	return
}

function build(){
	# Nothing yet
	return
}

function serve(){
	# Nothing yet
	return
}

function clean(){
	rm -r "$DIR/dst/docs"
}

function run(){
	clean
	build
	serve
}

$1
