Abstract Syntax Tree (AST)
=============================================================================
Overview
-----------------------------------------------------------------------------
I decided that I wanted to read an infix expression then do any of the
following:

 * Compute the result
 * Print the original input
 * Print the equivavent expression in [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language))

The first thing I need to do is read the input data and store it in some 
managable data structure. I will use a 'tree' like structure. This tree will
be made of nodes. Each node can have 0 or more nodes. Let's convert `5 + 3`
to this sctucture. The 'tree' will start with a `+` node which has 2 nodes:
`5` and `3`. It would look like:

	NODE: +
	|- NODE: 5
        |- NODE: 3

That was simple, so let's try a more complicated example: `5+3-2`. That
tree would look like:

	NODE: -
	|-- NODE: +
	| |-- NODE: 5
	| |-- NODE: 3
	|-- NODE: 2

With the tree constructed I just need to traverse the tree to create my
output. Let's say I wanted to compute the value. The root (or first) node is
a `- node`. It has 2 children: a `+ node` and a `2 node` which means I will
be subtracting the `2 node` from the `+ node` but what is the `+ node`? It
has 2 sub-nodes `5 node` and `3 node`. So the value of the `+ node` is `5+3`
or `8`. The `- node` is then `8-2` or `6`.

Did you notice that the compute operation is recursive? Well, look at the
code!