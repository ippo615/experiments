import time

from liblo import ServerThread

class OscSetup( object ):

	def __init__( self, path, types, names, callback= lambda x:x ):
		self.path = path
		self.types = types
		self.names = names
		self.callback = callback

class OscWriter(ServerThread):

	def __init__( self, callback ):
		self.callback = callback
		ServerThread.__init__(self, 5001)

	def add_method(self, oscSetup ):
		that = self
		def action( path, args ):
			data = dict(zip(oscSetup.names,args))
			data['_path'] = path
			oscSetup.callback( data )
			that.callback( data )

		ServerThread.add_method( self, oscSetup.path, oscSetup.types, action )


sensorNames = [
	'leftEar',
	'leftHead',
	'rightHead',
	'rightEar'
]
sensorTypes = 'ffff'

def writeDictAsJson( data ):
	import os
	import json
	directory = './data%s' % os.path.join(os.path.split(data['_path'])[:-1])
	if not os.path.exists(directory):
		os.makedirs(directory)
	with open( './data%s.json' % data['_path'], 'w' ) as f:
		f.write( json.dumps( data ) )

def writeDictAsJsonFm( data ):
	import os
	import json
	directory = '../../data%s' % os.path.join(os.path.split(data['_path'])[:-1])
	if not os.path.exists(directory):
		os.makedirs(directory)
	with open( '../../data%s.jsonfm' % data['_path'], 'w' ) as f:
		f.write( json.dumps(
			data,
			sort_keys = True,
			indent = 2,
			separators = (',', ': ')
		) )

museWriter = OscWriter( writeDictAsJsonFm )

museWriter.add_method( OscSetup( '/muse/elements/low_freqs_absolute', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/delta_absolute', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/theta_absolute', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/alpha_absolute', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/beta_absolute', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/gamma_absolute', sensorTypes, sensorNames ) )

museWriter.add_method( OscSetup( '/muse/elements/delta_relative', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/theta_relative', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/alpha_relative', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/beta_relative', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/gamma_relative', sensorTypes, sensorNames ) )

museWriter.add_method( OscSetup( '/muse/elements/delta_session_score', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/theta_session_score', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/alpha_session_score', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/beta_session_score', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/gamma_session_score', sensorTypes, sensorNames ) )

# Is headband worn properly
museWriter.add_method( OscSetup( '/muse/elements/horseshoe', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/elements/is_good', sensorTypes, sensorNames ) )

# Raw Data
museWriter.add_method( OscSetup( '/muse/eeg', sensorTypes, sensorNames ) )
museWriter.add_method( OscSetup( '/muse/eeg/quantization', sensorTypes, sensorNames ) )

# Hardware Status
museWriter.add_method( OscSetup( '/muse/acc', 'fff', 'y x z'.split(' ') ) )
museWriter.add_method( OscSetup( '/muse/batt', 'ffff', [
	'charge',
	'voltageGuage',
	'voltageAdc',
	'temperature'
] ) )

# Derived Data
museWriter.add_method( OscSetup( '/muse/elements/blink', 'i', ['blink'] ) )
museWriter.add_method( OscSetup( '/muse/elements/jaw_clench', 'i', ['jaw_clench'] ) )
museWriter.add_method( OscSetup( '/muse/elements/experimental/concentration', 'f', ['value'] ) )
museWriter.add_method( OscSetup( '/muse/elements/experimental/mellow', 'f', ['value'] ) )

museWriter.start()

while 1:
	time.sleep(1)

