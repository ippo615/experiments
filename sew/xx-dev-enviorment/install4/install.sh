#!/bin/bash

function programs(){
	# Since I'm usually running these on a clean (new) system the repo
	# links need to be updated (otherwise some packages will fail)
	sudo apt-get update

	# ssh for easier command line
	sudo apt-get -y install openssh-server openssh-client

	# Git for source code version control
	sudo apt-get -y install git

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

}

function cloud9(){
	# Cloud9 web-based development enviornment
	git clone https://github.com/ajaxorg/cloud9.git ~/cloud9
	cd ~/cloud9
	sudo npm install
}

function files(){
# ======================================================================
# ------------------------------------------------------------- Files --
# ======================================================================

mkdir -p ~/meld/src
mkdir -p ~/meld/test

# ----------------------------------------------------------------------
#                                                 ~/meld/src/vector.js
# Example source file (just some basic vector math).

cat << 'EOF' > ~/meld/src/vector.js

var Vector = (function(){

	function Vector(x,y){
		this.x = x;
		this.y = y;
	}
	Vector.prototype.clone = function( ){
		return new Vector( this.x, this.y );
	};

	// Vector
	Vector.prototype.add = function( other ){
		this.x += other.x;
		this.y += other.y;
		return this;
	};
	Vector.prototype.sub = function( other ){
		this.x -= other.x;
		this.y -= other.y;
		return this;
	};
	Vector.prototype.mul = function( other ){
		this.x *= other.x;
		this.y *= other.y;
		return this;
	};
	Vector.prototype.div = function( other ){
		this.x /= other.x;
		this.y /= other.y;
		return this;
	};

	// Scalar
	Vector.prototype.addScalar = function( s ){
		this.x += s;
		this.y += s;
		return this;
	};
	Vector.prototype.subScalar = function( s ){
		this.x -= s;
		this.y -= s;
		return this;
	};
	Vector.prototype.mulScalar = function( s ){
		this.x *= s;
		this.y *= s;
		return this;
	};
	Vector.prototype.divScalar = function( s ){
		this.x /= s;
		this.y /= s;
		return this;
	};

	Vector.prototype.lengthSq = function(){
		return this.x*this.x + this.y*this.y;
	};
	Vector.prototype.length = function(){
		return Math.sqrt(this.lengthSq());
	};
	Vector.prototype.normalize = function(){
		return this.divScalar( this.length() );
	};
	Vector.prototype.perpendicular = function(){
		var swap = this.x;
		this.x = -this.y;
		this.y = swap;
		return this;
	};

	return Vector;
})();

exports.Vector = Vector;
EOF

# ----------------------------------------------------------------------
#                                                ~/meld/test/vector.js
# Example mocha test file (for vector.js).

cat << 'EOF' > ~/meld/test/vector.js
/* global: bug, describe, it */

var Vector = require('../src/vector.js').Vector;
var assert = require('assert');

describe( 'Vector', function(){
        it('should have x,y properties',function(){
                var a = new Vector(5,2);
                assert( a.x === 5 );
                assert( a.y === 2 );
        });
        it('should be created with the new keyword');
        it('should be created without the new keyword');
        describe( '.add', function(){
                it('should edit the vector in place',function(){
                        var a = new Vector(1,2);
                        var b = new Vector(0,3);
                        a.add( b );
                        assert( a.x === 1 );
                        assert( a.y === 5 );
                });
                it('should not affect the argument',function(){
                        var a = new Vector(1,2);
                        var b = new Vector(0,3);
                        a.add(b);
                        assert( b.x === 0 );
                        assert( b.y === 3 );
                });
        });
});
EOF

# ----------------------------------------------------------------------
#                                                        ~/meld/run.sh
# Simple utilities

cat << 'EOF' > ~/meld/run.sh
#!/bin/bash

function serve(){
	# Configuration
	homeDir=$(echo ~)
	projDir="$homeDir/meld"
	port="3131"
	username=$(echo $USER)
	password=$(echo $USER)

	# Display a how-to access message
	ipaddress=$(ip addr show eth0 | grep 'inet ' | awk '{print $2}' | sed -e 's_/.*$__')
	echo ""
	echo "You can access cloud9 by opening: http://$ipaddress:$port in a webrowser."
	echo "You can access a simple http server at: http://$ipaddress:8000"
	echo ""

	# Start cloud9 (require a username and password)
	#~/cloud9/bin/cloud9.sh -w "$projDir" -l 0.0.0.0 -p "$port" --username "$username" --password "$password" 
	# Start cloud9 without a username and password
	~/cloud9/bin/cloud9.sh -w "$projDir" -l 0.0.0.0 -p "$port" >~/cloud9.log 2>&1 &

	# Start a simple http server
	cd ~/meld
	python -m SimpleHTTPServer >~/server.log 2>&1 &
}

function test(){
	# It's import to place everything relative to the directory this script
	# is STORED in (not where it runs from). DIR holds that info
	DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
	cd $DIR
	istanbul --dir='reports/coverage' cover _mocha -- -R spec

	# Tell where to see coverage
	ipaddress=$(ip addr show eth0 | grep 'inet ' | awk '{print $2}' | sed -e 's_/.*$__')
	echo ""
	echo "View line-by-line coverage results at http://$ipaddress:8000/reports/coverage/lcov-report/"
	echo ""
}

$1

EOF

# ----------------------------------------------------------------------
#                                               /etc/profile.d/meld.sh
# Tells the user how to access cloud9 after login

sudo cat << 'EOF' >> ~/.bashrc
#!/bin/bash

echo ""
echo "To start the server: ~/meld/run.sh serve"
echo "To run the tests: ~/meld/run.sh test" 
echo ""

EOF

# Make the run script executable
chmod +x ~/meld/run.sh

}
# ======================================================================
# -------------------------------------------------------------- Main --
# ======================================================================

$1

