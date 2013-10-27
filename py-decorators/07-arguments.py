#!/usr/bin/python

# This shows how to pass arguments to decorators. It lets you specificy (tweak,
# parameterize, generalize) your decorators.
# The general method is to create a function that returns a decorator.

# Create a function that returns a decorator (aka another function).
# Notice `html_wrap` (the function that makes the decorator) only accepts
# arguments which are the parameters to the decorator. 
def html_wrap(tag):

	# The decorator ONLY accepts 1 argument - the function to wrap
	def decorator(f):

		# This is the original decorator - I called it `original` but it can
		# be called anything
		def original(text):
			return '<'+tag+'>'+f(text)+'</'+tag+'>'
		return original

	return decorator

# Make some decorated functions
@html_wrap('p')
def sayHelloTo(name):
	return 'Hello, '+name

@html_wrap('div')
def sayByeTo(name):
	return 'Bye '+name+'!'

@html_wrap('div')
@html_wrap('b')
def barkAt(name):
	return 'Woof! '+name

@html_wrap('p')
@html_wrap('i')
def meowAt(name):
	return 'Meow! '+name

# Show the functions in action
print sayHelloTo('Andrew')
print sayByeTo('John')
print barkAt('the floor')
print meowAt('dat mouse')

# Expected output:
# <p>Hello, Andrew</p>
# <div>Bye John!</div>
# <div><b>Woof! the floor</b></div>
# <p><i>Meow! dat mouse</i></p>

