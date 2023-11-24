# Installing Files

You can install files to a specific location. It's very easy actually.
Just pretend your directory is the root of the filesystem. If I wanted
to (for example) store a file in `/usr/local/bin`, I would put that file
in `myhelloworld_1.0-1/usr/local/bin`. 

In this example I'm installing a basic shell script called which prints
'Hello World!' when the user runs `hi`.

The files retain their permissions when extracted. This means we can
make our script executable by running:

	chmod a+x myhelloworld_1.0-1/usr/local/bin/hi

Then when the package is built and installed the installed script
will have the appropriate permissions.

## Naming conventions

Projects are typically named:

	<project>_<major version>.<minor version>-<package revision>

So we'll follow that structure for our folder:

	myhelloworld_1.0-1

## Special Folder `DEBIAN`

The `DEBIAN` folder contains the metadata that describes our package.
The control file (`DEBIAN/control`) contains information like maintainer,
platform, description, and dependencies.

## Building

After the folder structure is created and populated the `.deb` is built
with:

	dpkg --build myhelloworld_1.0-1

You could also use (I haven't noticed a difference):

	dpkg-deb --build myhelloworld_1.0-1

## Installing

After building your `.deb` you can distribute it and users can install it
with:

	dpkg --install myhelloworld_1.0-1.deb

## Uninstalling

You can `remove` (`-r`) or `purge` (`-P`) the package to uninstall it.
The following would delete ALL files installed by the package:

	dpkg --purge myhelloworld

The following deletes everything except configuration files installed
by the package:

	dpkg --remove myhelloworld

Also note: there is no version number required when removing or purging.
