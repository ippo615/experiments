A simple calculator
=============================================================================
Unary Operators
-----------------------------------------------------------------------------
You can think of functions as unary operators. (There is a more flexible way
to implement them...perhaps I'll do that later).

This code adds a bunch of trig functions and exponent/log functions. Note
the order of operations makes:

	sin 3*pi

Behave like:

	sin(3*pi)

Building The Code
-----------------------------------------------------------------------------
If you looked through my other examples you should be familar with running 
bison/flex/gcc. So I'm combining it into one script:

	bison -d calc.y
	flex calc.l
	gcc calc.tab.c lex.yy.c -lfl -lm
	chmod +x a.out

NOTE that I'm also linking with the `m` library for math functions like
`pow`. Then run it as usual:

	./a.out

Or pipe input to the program:

	echo '99-89' | ./a.out
	echo '0.01 + 111.1' | ./a.out

If you want to clean up the generated files (delete them and just see the
source) then run:

	rm a.out *tab* lex.yy.c
