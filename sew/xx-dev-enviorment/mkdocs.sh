#!/bin/bash

# It's import to place everything relative to the directory this script
# is STORED in (not where it runs from). DIR holds that info
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

function install(){
	echo "Installing dependencies for writing/editing documentation."

	# Since I'm usually running these on a clean (new) system the repo
	# links need to be updated (otherwise some packages will fail)
	sudo apt-get update

	sudo apt-get install python python-pip
	sudo pip install mkdocs
}

function create(){
	echo "Creating folder structures and default configuration"

	mkdir -p "$DIR/src/docs"
	mkdir -p "$DIR/dst/docs"

	# A name is required
	echo 'site_name: meld.me Guide' >  "$DIR/src/mkdocs.yml"

	# Follow our folder structure
	echo 'docs_dir: docs'           >> "$DIR/src/mkdocs.yml"
	echo 'site_dir: ../dst/docs'    >> "$DIR/src/mkdocs.yml"

	# Allow access from local network on port 8000
	# Useful if you want to run `mkdocs serve` (this seems broken)
	echo 'dev_addr: 0.0.0.0:8000'   >> "$DIR/src/mkdocs.yml"

	# More config info http://www.mkdocs.org/user-guide/configuration/
	echo 'theme: readthedocs'

	# Add a very simple hello world index file
	echo '#Hello World' > "$DIR/src/docs/index.md"
}

function build(){
	cd "$DIR/src"
	mkdocs build
}

function serve(){
	cd "$DIR/dst/docs"
	echo "Hold ctrl+c to stop the server."
	python -m SimpleHTTPServer

	# I can't actually access the files this way:
	# cd "$DIR/src"
	# mkdocs serve
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
