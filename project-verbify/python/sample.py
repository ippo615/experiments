#!/usr/bin/python

# This is a class that is effectively a dictionary but I can
# access the elements with a '.' ie point.x instead of point['x']
class DICDOC(dict):
    def __getattr__(self, attr):
        return self.get(attr, None)
    __setattr__= dict.__setitem__
    __delattr__= dict.__delitem__

# Some modifier functions
def move_by(x,y):
	_move.data.x += x
	_move.data.y += y
	return _move

def move_to(x,y):
	_move.data.x = x
	_move.data.y = y
	return _move

# The hidden dictionary that will hold the data that we are
# working on and will return the methods we want to use
_move = DICDOC()
_move.by = move_by
_move.to = move_to

# The 'verb' - the starting function that sets up the data
# and returns the methods we can use on it
def move(data):
	_move.data = data
	return _move

# Create a point
myPoint = DICDOC()
myPoint.x = 0
myPoint.y = 0

# Move the point, it should end up at x:49, y:51
# Note that this chain has to be on 1 line
move(myPoint).to(50,50).by(-1,1)

# Prove it worked
print myPoint