#!/usr/bin/python

class Action():
	def __init__(self, action, args, kwargs, exceptions ):
		self.action = action
		self.args = args
		self.kwargs = kwargs
		self.exceptions = exceptions

class AllFailedError(Exception):
	def __init__(self,message):
		Exception.__init__(self,message)

def return_first_class( actions ):

	for action in actions:
		try:
			result = action.action(*action.args,**action.kwargs)
		except action.exceptions as e:
			print e
			continue
		else:
			return result

	raise AllFailedError('All %s actions failed' % len(actions) )

def action1(a,b,c,d='text'):
	raise Exception('Error: %s %s %s -- %s' % (a,b,c,d))

def action2(n):
	raise IOError('Error: Action %s failed' % n)

def action3(n):
	return n

print return_first_class( [
	Action(
		action1,
		['a', 'b', 'c'],
		dict( d='d' ),
		Exception
	),
	Action(
		action2,
		[2],
		dict(  ),
		(Exception, IOError)
	),
	Action(
		action3,
		[3],
		dict(  ),
		Exception
	)
] )
