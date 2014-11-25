#!/usr/bin/python

from distutils.core import setup

setup(
	name = 'sample-module-install',
	version = '2',
	description = 'A simple example of distutils',
	author = 'Andrew',
	author_email = 'user@example.com',
	url = 'http://website.com',
	long_description = '''Really long text here.''',
	packages = ['my-geometry'],
    package_data = {'my-geometry': [
		'my-geometry/*'
	] }
)
