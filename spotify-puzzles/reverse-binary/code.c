// To compile: gcc code.c
// Or you can also use: g++ code.c
#include <stdlib.h>
#include <stdio.h>

int main(){

	// Try reading an integer
	unsigned int input;
	if( fscanf(stdin,"%u",&input) == 0 ){
		fprintf(stdout,"Hey! scanf couldn't understand your number...\n");
		return 1;
	}

	// Find the left 'edge' of the integer (the left-most `1`)
	// (uh-oh potential endian-ness problem)
	unsigned int left = 99;
	unsigned int mask;
	unsigned int i;
	for( i=32; i>0; i-=1 ){
		mask = 1 << (i-1);
		if( ((mask & input) == mask) && left == 99 ){
			left = i-1;
			break;
		}
	}

	// Reverse all of the bits from the left edge to 0
	unsigned int output = 0;
	for( i=0; i<=left; i+=1 ){
		mask = 1 << i;
		output |= ((mask & input) == mask) << (left - i);
	}

	// Print the output
	fprintf(stdout,"%u\n",output);
	return 0;
}
