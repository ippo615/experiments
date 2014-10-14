import inspect

def prefix_lines( text, prefix='\t' ):
	lineStart = '\n%s' % prefix
	return '%s%s' % (prefix, lineStart.join( text.split('\n' ) ) )

def code_class_instance( class_ ):
	return '%s = %s(%s)' % (
		class_.__name__.lower(),
		class_.__name__,
		# the first arg is always `self` so we skip that one
		','.join( inspect.getargspec( class_.__init__ ).args[1:] )
	)

def code_method_call( class_, member ):
	return '%s.%s(%s)' % (
		class_.__name__.lower(),
		member[0],
		','.join( inspect.getargspec( member[1] ).args[1:] ),
	)

def make_test_function( class_, member ):
	code  = 'def test_%s(self):\n' % member[0]
	create = code_class_instance( class_ )
	run = code_method_call( class_, member )
	check = 'self.assertEqual(excpected,actual,reason)'
	code += prefix_lines( '\n'.join([create,run,check]), '\t' )
	return code

def make_test_class( class_ ):
	code  = 'class Test_%s(unittest.TestCase):\n' % class_.__name__
	code += '\t"""Good description"""\n\n'
	for member in inspect.getmembers(class_,predicate=inspect.ismethod):
		code += prefix_lines( make_test_function( class_, member ), '\t' )
		code += '\n\n'
	return code

if __name__ == '__main__':
	import point
	print make_test_class( point.Point )
