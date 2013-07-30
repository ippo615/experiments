Using Types and Bison
=============================================================================
First you need to run `bison` to generate some header files that will be
included in the input to `flex`. Run:

	bison -d types.y

That should create `types.tab.c` and `types.tab.h`. Then you can run your
data through `flex` by running:

	flex types.l

Which should create `lex.yy.c`. Now we have to compile all of that. Remember
we need to compile both the 'main file' (`lex.yy.c`) and the grammer file
(`types.tab.c`):

	gcc types.tab.c lex.yy.c -lfl

That should create `a.out` which you can run:

	chmod +x a.out
	./a.out

