
import json

def merge( src, dst ):
	for key in src:
		if not key in dst:
			dst[key] = src[key]
	return dst

def flatten( data ):
	nestData = {}
	flatData = {}
	for key in data:
		value = data[key]
		if isinstance( value, dict ):
			nestData[key] = value
		else:
			flatData[key] = value
	
	for key in nestData:
		merge( flatData, nestData[key] )
	
	return nestData

flat = flatten({
	'abc': 123,
	'xyz': 555,
	'amy': {
		'name': 'amy',
		'age': 23,
		'stuff': {
			'phone': 1234567890,
			'email': 'a@b.c'
		}
	},
	'bob': {
		'name': 'bob',
		'age': 22
	},
	'carol': {
		'name': 'carol',
		'age': 22
	},
	'david': {
		'name': 'david',
		'age': 40,
		'stuff': {
			'phone': 1234567890,
			'email': 'd@b.c'
		}
	}
})

print json.dumps( flat, separators=(',',': '), indent=4 )
