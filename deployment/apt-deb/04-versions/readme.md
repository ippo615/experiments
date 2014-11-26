# Versioning

Typically we want to create different versions, for example the user
starts with version 1 then we update we're at version 2 then version 3
etc... This explores how multiple versions are handled and if anything
special needs to happen.

## Building

We can build the different versions using

	dpkg --build myhelloworld_1.0-1
	dpkg --build myhelloworld_1.0-2
	dpkg --build myhelloworld_1.1-1

## Install

No matter what the version number is, the last one you install will be
the one that remains. For example:

	dpkg --install myhelloworld_1.0-1.deb
	dpkg --install myhelloworld_1.0-2.deb
	dpkg --install myhelloworld_1.1-1.deb

Will leave version `1.1-1` installed. If you then run:

	dpkg --install myhelloworld_1.0-1.deb

You'll have version `1.0-1` installed.

## Uninstalling

When you uninstall you do not specify a package version so the same
command will remove whichever version was last installed:

	sudo dpkg --remove myhelloworld

