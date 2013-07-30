A simple calculator
=============================================================================
Complex numbers
-----------------------------------------------------------------------------
Working with built-in C data types is fine for simple applications but what
if you want to do something more complicated? Then you'll need to use your
own custom data types. This example shows how to use cusotm data types.

The big different here is that all of the functions and data structures
responsible for manipulating complex numbers are in their own files:
`complex.h` and `complex.c`. This completely separates them from the parser.

I have to write a better explaination of how to properly integrate them into
the bison and flex code (once I figure out the details). Oh! I also need to 
figure out the best way to compile/link this stuff.

I have all working functions for complex numbers and I think they're actually
correct! If you ever wondered what `arccos(1+i)` is - you can find out!
(even if you never wondered that you can learn anyway). 

I have some shift/reduce and reduce/reduce conflicts. Those errors are not 
good. They mean that my grammer is ambiguous (ie certain inputs can be
parsed in multiple ways). Which constructs are causing this? These are:

	| LOGBASE exp exp                         { $$ = complex_log($2,$3); }
	| LOGBASE LPAREN exp COMMA exp RPAREN     { $$ = complex_log($3,$5); }
	| LOGBASE LCURLY exp COMMA exp RCURLY     { $$ = complex_log($3,$5); }
	| LOGBASE LBRACKET exp COMMA exp RBRACKET { $$ = complex_log($3,$5); }
	| I exp %prec R_UNARY                     { $$ = complex_i($2); } 
	| exp I %prec L_UNARY                     { $$ = complex_i($1); } 
	| I                                       { $$ = complex_i(complex_make(1.0f)); }

There is a way to fix it. I just need to remove:

	| LOGBASE exp exp                         { $$ = complex_log($2,$3); }

But my other functions (ie `sin`, `cos`, `ln`, ...) can be written without
brackets (ie `sin 5` is the same as `sin(5)`). However, those functions only
accept 1 input argument. `LOGBASE` takes 2. I created 3 specific
constructions that allow you to write any of the following:

	logbase(2,8)
	logbase[4,64]
	logbase{10,1000}

The additional contruct allows you to write:

	logbase 2 8

Which makes the grammer ambiguous. The other contructs that I mentioned just
add to the number of conflicts but are not problems themselves.

Are there other ways of allowing this flexible syntax without grammar
conflicts? Yes. The obvious one - make 2 grammers and run the input through
2 parsers, then whichever doesn't output a syntax error is correct! That's
not the best solution but it will work. Another solution is to add to the
complexity of the grammar to break up that contruction into non-ambiguous
parts but (in general) that may not be possible and I don't know how to do 
it at my current skill level.

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

	echo '2**(8i+9)' | ./a.out
	cat test | ./a.out

If you want to clean up the generated files (delete them and just see the
source) then run:

	rm a.out *tab* lex.yy.c

I also created a `test` file which lets you (you guessed it) test the parser.
To test the parser run:

	cat 'test' | ./a.out
