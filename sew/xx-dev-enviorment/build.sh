#!/bin/bash

# It's import to place everything relative to the directory this script
# is STORED in (not where it runs from). DIR holds that info
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ----------------------------------------------------------------------
#                                                     Section for mdoc
# I think I'll remove this in favor of mkdocs.
# ----------------------------------------------------------------------

function mdoc(){

	function install(){
		echo "Setting up a development enviorment for writing/editing documentation."

		# We use the mdoc nodejs module for generating documentation from
		# markdown documents. We need to modify the installed script to
		# point to our node executable.
		apt-get install nodejs npm
		npm install -g mdoc
		sed -i -e's/env node$/env nodejs/' $(which mdoc)

		# TODO: better? nodejs installation
		# https://learn.bevry.me/node/install

		# Look at (for more options)
		# https://staticsitegenerators.net/

	}

	function create(){
		mkdir -p "$DIR/src/doc"
		mkdir -p "$DIR/dst/doc"
	}

	function build(){
		echo 'Building documentation.'
		mdoc --input="$DIR/src/doc" --output="$DIR/dst/doc"
	}

	function serve(){
		echo 'Serving documentation (use ctrl+c to stop).'

		# TODO: nodejs basic server
		cd "$DIR/dst/doc"
		python -m SimpleHTTPServer
	}

	function clean(){
		rm -r "$DIR/src/doc"
	}

	function run(){
		build_doc
		serve_doc
	}

	action=$1
	shift
	$action $@
}

# ----------------------------------------------------------------------
#                                                   Section for mkdocs
# ----------------------------------------------------------------------

function mkdocs(){

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

	action=$1
	shift
	$action $@
}

# ----------------------------------------------------------------------
#                                                   Section for pandoc
# ----------------------------------------------------------------------

function pandoc(){

	# WARNING pandoc has huge dependencies (fonts), it's a long install
	function install(){
		echo "Installing dependencies for pandoc."

		# Since I'm usually running these on a clean (new) system the repo
		# links need to be updated (otherwise some packages will fail)
		sudo apt-get update

		sudo apt-get install pandoc
		sudo apt-get install texlive
	}

	function create(){
		return
	}

	function build(){
		function pdf(){
			# TODO: find a better way to merge/order the documents
			pandoc "$DIR/src/docs/*" --toc -s -o "$DIR/dst/docs/meld-me-guide.pdf"
		}
		
		$1
	}

	function serve(){
		cd "$DIR/dst/docs"
		echo "Hold ctrl+c to stop the server."
		python -m SimpleHTTPServer
	}

	function clean(){
		rm -r "$DIR/dst/docs"
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

