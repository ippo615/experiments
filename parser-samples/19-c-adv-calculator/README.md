A simple calculator
=============================================================================
Separating Grammar and Code
-----------------------------------------------------------------------------
I don't like having code directly in my grammer. I would rather only have a
specific set of function in my grammer. This allows you to keep the code
that use to manipulate the data separate from the grammer. Why would you
want to do that? Seems silly to change:

	exp: exp PLUS exp { $$ = $1+$3; }

To:

	// some where else:
	float add(float a, float b){
		return a+b;
	}
	// In the grammer
	exp: exp PLUS exp { $$ = add($1,$3); }

But maybe you want to `add` vectors:

	// Note this is psuedo-code (not usable C code)
	vector add(vector a, vector b){
		vector c;
		c.x = a.x+b.x;
		c.y = a.y+b.y;
		return c; 
	}

	// In the grammer
	exp: exp PLUS exp { $$ = add($1,$3); }

Notice how the grammer didn't change even though we're using a different
data type. By constructing our grammer in this manner we gain a ton of
flexibility.

Building The Code
-----------------------------------------------------------------------------
If you looked through my other examples you should be familiar with running 
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