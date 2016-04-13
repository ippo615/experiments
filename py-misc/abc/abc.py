import sys

def _cry( thing, baseClass ):
	raise NotImplementedError( 'Class `%s` does not implment .%s of `%s` (see %s)' % (
		thing.__class__.__name__,
		sys._getframe(1).f_code.co_name,
		baseClass.__name__,
		sys._getframe(1).f_code.co_filename
	) )
	

class BaseStuff( ):
	def __init__( self ):
		cry( self, BaseStuff )
		
	def doStuff( self ):
		cry( self, BaseStuff )

class Stuff( BaseStuff ):
	def __init__( self ):
		pass
		
x = Stuff()
x.doStuff()

