#!/usr/bin/python

from distutils.core import setup

# List all of the files to include (relative to this file)
files = ['']

setup(
	name = 'appname',
	version = '100',
	description = 'A simple example of distutils',
	author = 'Andrew',
	author_email = 'user@example.com',
	url = 'http://website.com',
	scripts = ['runner'],
	long_description = '''Really long text here.'''
)
