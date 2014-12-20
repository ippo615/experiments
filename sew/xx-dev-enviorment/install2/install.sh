#!/bin/bash

function programs(){
	# Since I'm usually running these on a clean (new) system the repo
	# links need to be updated (otherwise some packages will fail)
	sudo apt-get update

	# ssh for easier command line
	sudo apt-get -y install openssh-server openssh-client

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
}

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
#                                           /etc/init/meld.cloud9.conf
# Config file that starts cloud9 on boot

cat << 'EOF' > /etc/init/meld.cloud9.conf
description "Cloud9 Development Environment for Meld"
author      "Andrew Ippoliti"
 
start on local-filesystems
stop on shutdown
 
respawn
respawn limit 10 5
 
script

	# Configuration
	homeDir=$(echo ~)
	projDir="$homeDir/meld"
	port="3131"
	username=$(echo $USER)
	password=$(echo $USER)

	# Display a how-to access message
	ipaddress=$(ip addr show eth0 | grep 'inet ' | awk '{print $2}' | sed -e 's_/.*$__')
	echo "You can access cloud9 by opening: http://$ipaddress:$port in a webrowser."
	echo "  Working in: $projDir"
	echo "  Username: $username"
	echo "  Password: $password"
	echo "  Hold ctrl+c to stop"

	# Start cloud9 (require a username and password)
	#~/cloud9/bin/cloud9.sh -w "$projDir" -l 0.0.0.0 -p "$port" --username "$username" --password "$password" 

	# Start cloud9 without a username and password
	~/cloud9/bin/cloud9.sh -w "$projDir" -l 0.0.0.0 -p "$port" 2>&1 >/var/log/meld.cloud9.log

end script
EOF

# ----------------------------------------------------------------------
#                                           /etc/init/meld.server.conf
# Config file that starts a basic http server on boot

cat << 'EOF' > /etc/init/meld.server.conf

description "Simple HTTP Server for Meld"
author      "Andrew Ippoliti"
 
start on local-filesystems
stop on shutdown
 
respawn
respawn limit 10 5
 
script

	cd ~/meld
	python -m SimpleHTTPServer

end script
EOF

# ----------------------------------------------------------------------
#                                               /etc/profile.d/meld.sh
# Tells the user how to access cloud9 after login

cat << 'EOF' > /etc/profile.d/meld.sh
#!/bin/bash

# Configuration
homeDir=$(echo ~)
projDir="$homeDir/meld"
port='3131'
username=$(echo $USER)
password=$(echo $USER)

# Display a how-to access message
ipaddress=$(ip addr show eth0 | grep 'inet ' | awk '{print $2}' | sed -e 's_/.*$__')
echo ""
echo "You can access cloud9 by opening: http://$ipaddress:$port in a webrowser."
echo "You can access a simple http server at: http://$ipaddress:8000"
echo ""
EOF

# ======================================================================
# ------------------------------------------------------------ Finish --
# ======================================================================

# Make sure root does not own files that belong to the user
sudo chown $USER:$USER -R ~/meld
sudo chown $USER:$USER -R ~/cloud9

# Start the services
sudo service meld.cloud9 start
sudo service meld.server start

# Show the 'how to access' message
source /etc/profile.d/meld.sh
