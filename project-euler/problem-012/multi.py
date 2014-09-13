#!/usr/bin/python

def gauss_triangle(n):
	return int((float(n)+1.0)*(float(n)/2.0))

def get_factors(n):
	# 1 and n are always factors
	factors = [1,n]

	# There will never be a factor higher than sqrt(n)
	upperLimit = n**0.5

	# Actual factor finding
	i = 2.0
	while i < upperLimit:
		if n % i == 0:
			upperLimit = float(n)/float(i)
			factors.append( i )
			factors.append( upperLimit )
		i += 1

	# If the last factor was a perfect square - it was added twice 
	# so remove one
	if upperLimit*upperLimit == n and len(factors) > 2:
		factors.pop()

	return factors

from multiprocessing import Pool

def f(i):
	t = gauss_triangle(i)
	factors = get_factors( t )
	if len( factors ) > 500:
		print 'Solution: the %ith triangle number (%i) has %i divisors' % (i,t,len(factors))
	return len( factors )

if __name__ == '__main__':
	# Note you must create the pool AFTER defining the function it will run
	p = Pool(4)
	p.map(f, range(0,15000))
