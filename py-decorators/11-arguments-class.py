#!/usr/bin/python

# This shows how to pass arguments to decorators. It lets you specificy (tweak,
# parameterize, generalize) your decorators.
# This differs from my previous example because this uses a class a decorator
# which may be slightly clearer than using a function.

class html_wrap():
	def __init__(self,tag):
		self.tag = tag

	def __call__(self,f):
		def original(text):
			return '<'+self.tag+'>'+f(text)+'</'+self.tag+'>'
		return original

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

