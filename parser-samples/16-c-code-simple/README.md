Intro to Using Flex with C
=============================================================================
First you want to run `simple.l` through `flex` by running:

	flex simple.l

That should create `lex.yy.c`. Then you can compile that with:

	gcc lex.yy.c -lfl

Which should create `a.out`. Note that we need to link with the flex library
by specifying `-lfl` as an option to `gcc`. You can then run your parser:

	chmod +x a.out
	./a.out

It will wait for you to type a full line then it will parse your input. This
simple code just says if you entered a string, float, or int. To exit the
program press `ctrl+d`.
