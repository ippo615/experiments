#!/usr/bin/python

class Cancelled(Exception):
	def __init__(self,message=""):
		Exception.__init__(self,"User cancelled action - %s"%message)

try:
	raise Cancelled("blah blah blah")
except:
	print "Some exception"

def action():
	raise Cancelled("from within a function")
	print "Hi"

try:
	action()
except Cancelled, e:
	# e is the error object (maybe we should embed data there)
	print "The action was cancelled"
except:
	print "An unknow error occurred"

