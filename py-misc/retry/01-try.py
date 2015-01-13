#!/usr/bin/python

class AllFailedError(Exception):
	def __init__(self,message):
		Exception.__init__(self,message)

def return_first( actions, exception ):

	for action in actions:
		try:
			result = action()
		except exception as e:
			print e
			continue
		else:
			return result

	raise AllFailedError('All %s actions failed' % len(actions) )

def action1():
	raise Exception('Action1 failed')

def action2():
	raise Exception('Action 2 failed')

def action3():
	return 3

print return_first( [
	action1,
	action2,
	action3
], Exception )
