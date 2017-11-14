
class Light():

	description = 'A filming light'

	def __init__( self, name ):
		self.name = name
		self.brightness = 0
		self.colorTemperature = 0
		self.blueBrightness = 0
		self.redBrightness = 0
		self.hue = 0

	def update( self, **kwargs ):
		self.brightness = kwargs.get('brightness', self.brightness)
		self.colorTemperature = kwargs.get('colorTemperature', self.colorTemperature)
		self.blueBrightness = kwargs.get('blueBrightness', self.blueBrightness)
		self.redBrightness = kwargs.get('redBrightness', self.redBrightness)
		self.hue = kwargs.get('hue', self.hue)

	def as_dict( self ):
		return dict(
			name = self.name,
			brightness = self.brightness,
			colorTemperature = self.colorTemperature,
			blueBrightness = self.blueBrightness,
			hue = self.hue,
			redBrightness = self.redBrightness
		)

lights = dict(
	left = Light('left'),
	right = Light('right')
)

def listAll():
	jsonable = {}
	for name in lights:
		jsonable[name] = {}
		jsonable[name]['url'] = '/lights/%s' % name
		jsonable[name]['name'] = name
		jsonable[name]['description'] = lights[name].description
	return jsonable

def getAll():
	jsonables = []
	for name in lights:
		jsonables.append( lights[name].as_dict() )
	return jsonables

def get( name ):
	return lights[name].as_dict()

def post( light, name ):

	_light = lights[name]
	_light.update( **light )

	return _light.as_dict() 
