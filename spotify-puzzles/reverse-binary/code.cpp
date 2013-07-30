#include <iostream>
#include <sstream>
#include <string>

int main(){

	std::string line;
	int input;
	while( std::getline(std::cin, line)){

		// Convert the line to a number
		std::stringstream ss_line(line);
		if( ! (ss_line >> input) ){
			std::cout << "Hey! You call '" << line << "' an integer?\n";
		}

		// Find the left 'edge' of the integer (the left-most `1`)
		// (uh-oh potential endian-ness problem)
		int left = 99;
		int mask;
		int i;
		for( i=32; i>0; i-=1 ){
			mask = 1 << (i-1);
			if( ((mask & input) == mask) && left == 99 ){
				left = i-1;
				break;
			}
		}
		
		// Reverse all of the bits from the left edge to 0
		int output = 0;
		for( i=0; i<=left; i+=1 ){
			mask = 1 << i;
			output |= ((mask & input) == mask) << (left - i);
		}
		
		std::cout << output << std::endl;
	}
	

	return 0;
}