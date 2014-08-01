#!/bin/python

def rangeMaxMin(initMin,initMax,foundMin,foundMax):

	if foundMin == initMax and foundMax == initMin:
		index = initMin
		while index < initMax:
			yield index
			index += 1
	else:
		index = initMin
		while index < foundMin:
			yield index
			index += 1

		index = foundMax
		while index < initMax:
			yield index
			index += 1

def test_special_range(data):

	xMin = len(data[0])
	xMax = 0
	yMin = len(data)
	yMax = 0

	count = 0

	for y in range(0,len(data)):
		for x in rangeMaxMin(0,len(data[0]),xMin,xMax):
			count += 1
			if data[y][x] == 1:
				if x < xMin: xMin = x
				if x > xMax: xMax = x
				if y < yMin: yMin = y
				if y > yMax: yMax = y

	return (xMin,xMax,count)

def test_range(data):

	xMin = len(data[0])
	xMax = 0
	yMin = len(data)
	yMax = 0

	count = 0

	for y in range(0,len(data)):
		for x in range(0,len(data[0])):
			count += 1
			if data[y][x] == 1:
				if x < xMin: xMin = x
				if x > xMax: xMax = x
				if y < yMin: yMin = y
				if y > yMax: yMax = y

	return (xMin,xMax,count)


data = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,1,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0],
	[0,0,0,0,0,0,1,0,0]
]

print 'Fast? Min,Max (%s,%s) in %s iterations' % test_special_range(data)
print 'Range Min,Max (%s,%s) in %s iterations' % test_range(data)

