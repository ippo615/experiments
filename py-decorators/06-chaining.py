#!/usr/bin/python

# This shows how to chain multiple decorators to a single function.
# Chaining means applying one decorator after another.

# Create 2 decorators: one makes italic text, the other bold
def italic(f):
	def newFunc(text):
		return '<i>'+f(text)+'</i>'
	return newFunc

def bold(f):
	def newFunc(text):
		return '<b>'+f(text)+'</b>'
	return newFunc

# Make some decorated functions
@bold
def sayHelloTo(name):
	return 'Hello, '+name

@italic
def sayByeTo(name):
	return 'Bye '+name+'!'

@bold
@italic
def barkAt(name):
	return 'Woof! '+name

@italic
@bold
def meowAt(name):
	return 'Meow! '+name

# Show the functions in action
print sayHelloTo('Andrew')
print sayByeTo('John')
print barkAt('the floor')
print meowAt('dat mouse')

# Expected output:
# <b>Hello, Andrew</b>
# <i>Bye John!</i>
# <b><i>Woof! the floor</i></b>
# <i><b>Meow! dat mouse</b></i>

