# Specifying Dependencies

You can specify dependencies in the `DEBIAN/control` file. For example:

	Depends: libwebcam0, nano-tiny (>= 2.2.6)

This states that the package depends on 2 other packages. The first,
libwebcam0, does not have a specific version. The second, nano-tiny,
has a specific version required (version 2.2.6 or newer).

## Build

	dpkg --build mydepend_1.0-1

## Install

	dpkg --install mydepend_1.0-1.deb

You will get an error if you do not have the dependencies installed.
To automatically install the dependencies, run:

	gdebi mydepend_1.0-1.deb

If you don't have gdebi run:

	dpkg --install mydepend_1.0-1.deb
	apt-get -f install
	dpkg --install mydepend_1.0-1.deb

The way the last 3 commands work is: first it tries to install the
`pydepend` package and fails because there are unmet dependencies.
Then `apt-get` tries to fix (`-f`) those missing dependencies (by
installing them). The dependencies should now be installed and you
should be able to install your package.

## Uninstall

Same as before:
	
	dpkg --remove mydepend

or 

	dpkg --purge mydepend

Neither of the 2 commands above will remove the 2 dependencies that
were installed and are no longer used. To remove unused dependencies
(across the entire system) run:

	sudo apt-get autoremove
