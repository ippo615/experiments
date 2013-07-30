A simple calculator
=============================================================================

Grammer Notes
-----------------------------------------------------------------------------
To get the parser to handle multiple lines you need to create a grammer that
looks similar to the following:

	lines
	        : lines line { }
	        | line       { }
	        ;
	line    
	        : exp EOL { printf("The result is: %f\n",$1); }
	        ;
	exp
		: exp PLUS exp    { $$ = $1+$3; }
		| exp MINUS exp   { $$ = $1-$3; }
		| FLOAT  { $$ = $1; }
		;

`lines` is a collections of `line`(s). The entire 'file' to be parsed can be
thought of as `lines`. `line` is used to pringt the result of what we are 
evaluating. `exp` is the 'stuff' that we are evaluating and how we are
evaluating it.

What if we did not have `lines`? Then the program would crash (with a parse
error) after it read a `line`.

What if we did not have `line`? Then the program would never output the
answer, it would just compute whatever we entered until we created a syntax
error or typed `ctrl+d`.

Building The Code
-----------------------------------------------------------------------------
First you need to run `bison` to generate some header files that will be
included in the input to `flex`. Run:

	bison -d calc.y

That should create `types.tab.c` and `types.tab.h`. Then you can run your
data through `flex` by running:

	flex calc.l

Which should create `lex.yy.c`. Now we have to compile all of that. Remember
we need to compile both the 'main file' (`lex.yy.c`) and the grammer file
(`types.tab.c`):

	gcc calc.tab.c lex.yy.c -lfl

That should create `a.out` which you can run:

	chmod +x a.out
	./a.out

You can also pipe input to the program:

	echo '99-89' | ./a.out
	echo '0.01 + 111.1' | ./a.out