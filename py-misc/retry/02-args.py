#!/usr/bin/python

class AllFailedError(Exception):
	def __init__(self,message):
		Exception.__init__(self,message)

def return_first_args( actions, args, kwargs, exception ):

	for i in range(len(actions)):
		try:
			result = actions[i](*args[i],**kwargs[i])
		except exception as e:
			print e
			continue
		else:
			return result

	raise AllFailedError('All %s actions failed' % len(actions) )

def action1(a,b,c,d='text'):
	raise Exception('Error: %s %s %s -- %s' % (a,b,c,d))

def action2(n):
	raise Exception('Error: Action %s failed' % n)

def action3(n):
	return n

print return_first_args( [
	action1,
	action2,
	action3
	], [
		['a', 'b', 'c'],
		[ 2 ],
		[ 3 ]
	], [
		dict(d='d'),
		dict(),
		dict()
	],
 	Exception
)
