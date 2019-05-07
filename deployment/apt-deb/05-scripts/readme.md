# Event Actions

You can run scripts during specific events that occur during the
installation (or removal) process. This is useful if you need to (for
example) stop a system process from running before you un-install it
or start a system process after you install it.

## Scripts

There are 4 scripts you can configure:

	package/DEBIAN/preinst -- runs before the install
	package/DEBIAN/postinst -- runs after the install
	package/DEBIAN/prerm -- runs before the removal
	package/DEBIAN/postrm -- runs after the removal

You create those files and the installer automatically runs them at the
appropriate time. I believe those files can be any EXECUTABLE. It's
probably easiest and most convenient to use shell scripts, but I included
an example that is a python script (see `prerm`).

Also, make sure the permissions are correct for those files. The
permissions should be between 0555 and 0775. I just created the files
normally and ran:

	chmod +x package/DEBIAN/preinst
	chmod +x package/DEBIAN/postinst
	chmod +x package/DEBIAN/prerm
	chmod +x package/DEBIAN/postrm

## Build

Same as always:

	dpkg --build myhelloworld_1.0-1/

## Install

Same install:

	sudo dpkg --install myhelloworld_1.0-1.deb

To help you see how those scripts run below is the output of the
installation:

	Selecting previously unselected package myhelloworld.
	(Reading database ... 247505 files and directories currently installed.)
	Preparing to unpack myhelloworld_1.0-1.deb ...
	Running the pre-install script
	Unpacking myhelloworld (1.0-1) ...
	Setting up myhelloworld (1.0-1) ...
	Running the post install script

Note: `Running the pre-install script` is the string I'm echoing in
"package/DEBIAN/preinst" and `Running the post install script` is the
string I'm echoing in "package/DEBIAN/postinst".

## Remove

Same as always:

	sudo dpkg --remove myhelloworld

The output:

	(Reading database ... 247505 files and directories currently installed.)
	Removing myhelloworld (1.0-1) ...
	Running pre-removal script
	Running the post remove script

Note you can find those two strings in the *rm scripts.

## Updates

The package will automatically remove the last version of itself before
installing the 'new' version. You can see this when installing a new
version of your package without manually removing the old (ie you'll see
the output from prerm,postrm and then the output from preinst,postinst).
