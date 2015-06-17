
try:
	raise ValueError()
except ValueError, IOError:
	print 'Some error occured, I do not know which'

try:
	raise ValueError()
except ValueError:
	print 'Value Error Occured'
except IOError:
	print 'IO Error Happened'


try:
	raise ValueError()
except ValueError as e:
	print 'Value Error: %s' % e
except IOError as e:
	print 'IO Error: %s' % e

try:
	raise ValueError()
except ValueError as e:
	print 'Value Error: %s' % e
except KeyError as e:
	print 'Value Error: %s' % e
except RuntimeError as e:
	print 'Value Error: %s' % e
except IOError as e:
	print 'IO Error: %s' % e

# Things that don't work but would be nice:
#try:
#	raise ValueError()
#except ValueError as e:    # falls through to next block
#except KeyError as e:      # falls through to next block
#except RuntimeError as e:
#	print 'Value Error: %s' % e
#except IOError as e:
#	print 'IO Error: %s' % e

# Closest we can do:
try:
	raise ValueError('Value 123')
	#raise KeyError('Key 123')
	#raise RuntimeError('I feel like walking')

except (
	ValueError,
	KeyError,
	RuntimeError
) as e:
	print 'Some Error: %s' % e
	
except IOError as e:
	print 'IO Error: %s' % e
