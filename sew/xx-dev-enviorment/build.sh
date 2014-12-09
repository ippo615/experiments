#!/bin/bash

# It's import to place everything relative to the directory this script
# is STORED in (not where it runs from). DIR holds that info
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

function setup_doc(){
	echo "Setting up a development enviorment for writing/editing documentation."

	# We use the mdoc nodejs module for generating documentation from
	# markdown documents. We need to modify the installed script to
	# point to our node executable.
	apt-get install nodejs npm
	npm install -g mdoc
	sed -i -e's/env node$/env nodejs/' $(which mdoc)

	mkdir -p "$DIR/src/doc"
	mkdir -p "$DIR/dst/doc"

	# TODO: better? nodejs installation
	# https://learn.bevry.me/node/install

	# Look at (for more options)
	# https://staticsitegenerators.net/

}

function build_doc(){
	echo 'Building documentation.'
	mdoc --input="$DIR/src/doc" --output="$DIR/dst/doc"
}

function serve_doc(){
	echo 'Serving documentation (use ctrl+c to stop).'

	# TODO: nodejs basic server
	cd "$DIR/dst/doc"
	python -m SimpleHTTPServer
}

function run_doc(){
	build_doc
	serve_doc
}

function setup_all(){
	setup_doc
}

$1
