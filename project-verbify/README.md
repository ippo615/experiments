project-verbify
==============================================================================

Templates for making `action(object).modifier(prop).modifier(prop)` patterns
in various languages.

Overview
------------------------------------------------------------------------------
Natural language is often structured: command - object - description,
for example 'move the ball to the corner'. 'move' is the command, 'the ball'
is the object and 'to the corner' is the description. In traditional code
that may look like:

	theBall.moveTo(0,0);

What if we could write it as:

	move(theBall).to(0,0);

That's a trivial example, let's consider something more complex:

> Move the ball 100 feet to the right but make sure it stays in the room.

In traditional code that would look like:

	// Move the ball 100 feet to the right
	theBall.x += 100;

	// Keep it in the room
	if( theBall.x > room.xMax ){
		theBall.x = room.xMax;
	}

Using a verbification pattern:

	move(ball).by(100,0).inside(room.xMax,room.yMax);

This projects trying to enable that pattern in various languages.

License
------------------------------------------------------------------------------
Copyright (c) 2013 Andrew Ippoliti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
