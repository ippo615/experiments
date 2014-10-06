
class Subscription():

	def __init__(self):
		self.events = {}

	def on( self, event, action ):
		if not event in self.events:
			self.events[event] = []
		self.events[event].append( action )

	def off( self, event, action ):
		self.events[event].remove( action )

	def fire( self, event, args=(), kwargs={} ):
		for action in self.events[event]:
			action( *args, **kwargs )

	def register_class( self, class_ ):
		# Create an instance of the class, register it, and return it
		instance = class_()
		self.register_instance( instance )
		return instance

	def register_instance( self, instance ):
		# regiser all of it's methods as events
		# the methods should be named 'on...' or 'on_...'
		for x in dir(instance):
			if x[0:3] == 'on_':
				self.on( x[3:], getattr(instance, x) )
			elif x[0:2] == 'on':
				self.on( x[2:], getattr(instance, x) )

		# return the instance so other things can use it
		return instance

	def unregister_instance( self, instance ):
		for event in self.events:
			for action in self.events[event]:
				try:
					if action.__self__ is instance:
						self.off( event, action )
				except AttributeError:
					pass


class Player():

	def __init__(self):
		self.x = 0
		self.y = 0

	def __str__(self):
		return '(%s,%s)' % (self.x,self.y)

	def onkeypress(self,key):
		
		if key & 1 == 1:
			self.x += 1
		if key & 2 == 2:
			self.y += 1
		if key & 4 == 4:
			self.x -= 1
		if key & 8 == 8:
			self.y -= 1

events = Subscription()

player1 = Player()
events.register_instance( player1 )

events.fire( 'keypress', (1,) )
events.fire( 'keypress', (1,) )

ball = events.register_class( Player )
events.fire( 'keypress', (1,) )
events.fire( 'keypress', (1,) )

def print_key_data( key ):
	print '%s was pressed' % key
events.on( 'keypress', print_key_data )

events.fire( 'keypress', (2,) )
events.fire( 'keypress', (5,) )

print ball
print player1

print 'Stopping print key on keypress'
print 'Disabling player 1'
events.off( 'keypress', print_key_data )
events.unregister_instance( player1 )

events.fire( 'keypress', (1,) )
events.fire( 'keypress', (1,) )

print ball
print player1
