#!/usr/bin/env python
import sys

for line in sys.stdin:
	number_in = int(line)
	
	# find the left-most `1`
	left = 99
	for i in range(32,0,-1):
		mask = 1 << i
		if( ((mask & number_in) == mask) and left == 99 ):
			left = i
			break

	# Reverse all of the bits from the left edge to 0
	number_out = 0
	for i in range(0,left+1,1): 
		mask = 1 << i
		number_out |= ((mask & number_in) == mask) << (left - i)

	print str(number_out)
