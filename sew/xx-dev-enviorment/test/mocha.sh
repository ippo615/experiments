#!/bin/bash

# It's import to place everything relative to the directory this script
# is STORED in (not where it runs from). DIR holds that info
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ----------------------------------------------------------------------
#                                                    Section for mocha
# ----------------------------------------------------------------------

function mocha(){

	function install(){
		echo "Installing dependencies for test driven development."

		# Since I'm usually running these on a clean (new) system the repo
		# links need to be updated (otherwise some packages will fail)
		sudo apt-get update

		sudo apt-get install nodejs npm          # node + npm install
		sudo ln -s /usr/bin/nodejs /usr/bin/node # fix naming confict
		sudo npm install -g mocha                # testing framework
		sudo npm install -g istanbul             # coverage tool
	}

	function create(){
		return
	}

	function build(){
		cd "$DIR"
		istanbul --dir='reports/coverage' cover _mocha -- -R spec
	}

	function serve(){
		cd "$DIR/reports"
		python -m SimpleHTTPServer 
	}

	function clean(){
		cd "$DIR"
		rm -r 'reports'
	}

	function run(){
		clean
		build
		serve
	}

	action=$1
	shift
	$action $@
}

# ----------------------------------------------------------------------
#                                                                 Main
# ----------------------------------------------------------------------

# Run the first arguments, pass along the remaining
action=$1
shift
$action $@

