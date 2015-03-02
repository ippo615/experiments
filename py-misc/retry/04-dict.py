#!/usr/bin/python

class AllFailedError(Exception):
	def __init__(self,message):
		Exception.__init__(self,message)

def return_first_dict( actions ):

	for action in actions:
		try:
			result = action['action'](*action['args'],**action['kwargs'])
		except action['exceptions'] as e:
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

print return_first_dict( [
	dict(
		action=action1,
		args=['a', 'b', 'c'],
		kwargs=dict( d='d' ),
		exceptions=Exception
	),
	dict(
		action=action2,
		args=[2],
		kwargs=dict(  ),
		exceptions=(Exception, IOError)
	),
	dict(
		action=action3,
		args=[3],
		kwargs=dict(  ),
		exceptions=Exception
	)
] )
