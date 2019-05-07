# Simple .deb

This is an example of a basic debian package WITHOUT contents. You can
think of it as a template for making more complicated packages.

## Naming conventions

Projects are typically named:

	<project>_<major version>.<minor version>-<package revision>

So we'll follow that structure for our folder:

	myproject_1.0-1

## Special Folder `DEBIAN`

The `DEBIAN` folder contains the metadata that describes our package.
The control file (`DEBIAN/control`) contains information like maintainer,
platform, description, and dependencies.

## Building

After the folder structure is created and populated the `.deb` is built
with:

	dpkg --build myproject_1.0-1

You could also use (I haven't noticed a difference):

	dpkg-deb --build myproject_1.0-1

## Installing

After building your `.deb` you can distribute it and users can install it
with:

	dpkg --install myproject_1.0-1.deb

## Uninstalling

You can `remove` (`-r`) or `purge` (`-P`) the package to uninstall it.
The following would delete ALL files installed by the package:

	dpkg --purge myproject

The following deletes everything except configuration files installed
by the package:

	dpkg --remove myproject

Also note: there is no version number required when removing or purging.
