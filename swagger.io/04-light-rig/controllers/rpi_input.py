
import json

class Knob():

	description = 'A knob that can be turned to "do something"'

	def __init__( self, name ):
		self.name = name
		self.minimum = 0
		self.maximum = 255
		self.value = 99
		self.units = 'none'
		self.type = 'knob'


	def as_dict( self ):
		return dict(
			name = self.name,
			minimum = self.minimum,
			maximum = self.maximum,
			value = self.value,
			units = self.units,
			type = self.type,
		)

knobs = dict(
	left = Knob('left'),
	right = Knob('right')
)

def listAll():
	jsonable = {}
	for name in knobs:
		jsonable[name] = {}
		jsonable[name]['url'] = '/inputs/%s' % name
		jsonable[name]['name'] = name
		jsonable[name]['description'] = knobs[name].description
	return jsonable

def getAll():
	jsonables = []
	for name in knobs:
		jsonables.append( knobs[name].as_dict() )
	return jsonables

def get( name ):
	return knobs[name].as_dict()
