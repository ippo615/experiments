import math

from easings import Easings

if __name__ == '__main__':
	import time
	nSamples = 20
	for i in range(0,nSamples+1):
		print '%s of %s -- %s' % (i,nSamples,Easings.CubicIn(float(i)/float(nSamples)))

