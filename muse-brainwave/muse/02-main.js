
sensorNames = [
	'leftEar',
	'leftHead',
	'rightHead',
	'rightEar'
]
sensorTypes = 'ffff'

var watchers = [];

watchers.push( new MuseWatcher( '/muse/elements/low_freqs_absolute', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/delta_absolute', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/theta_absolute', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/alpha_absolute', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/beta_absolute', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/gamma_absolute', sensorTypes, sensorNames ) )

watchers.push( new MuseWatcher( '/muse/elements/delta_relative', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/theta_relative', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/alpha_relative', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/beta_relative', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/gamma_relative', sensorTypes, sensorNames ) )

watchers.push( new MuseWatcher( '/muse/elements/delta_session_score', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/theta_session_score', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/alpha_session_score', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/beta_session_score', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/gamma_session_score', sensorTypes, sensorNames ) )

watchers.push( new MuseWatcher( '/muse/eeg', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/eeg/quantization', sensorTypes, sensorNames ) )

watchers.push( new MuseWatcher( '/muse/elements/horseshoe', sensorTypes, sensorNames ) )
watchers.push( new MuseWatcher( '/muse/elements/is_good', sensorTypes, sensorNames ) )

watchers.push( new MuseWatcher( '/muse/acc', 'fff', 'y x z'.split(' ') ) )
watchers.push( new MuseWatcher( '/muse/elements/blink', 'i', ['blink'] ) )
watchers.push( new MuseWatcher( '/muse/elements/jaw_clench', 'i', ['jaw_clench'] ) )

watchers.push( new MuseWatcher( '/muse/batt', 'ffff', [
	'charge',
	'voltageGuage',
	'voltageAdc',
	'temperature'
] ) )

watchers.push( new MuseWatcher( '/muse/elements/experimental/concentration', 'f', ['value'] ) )
watchers.push( new MuseWatcher( '/muse/elements/experimental/mellow', 'f', ['value'] ) )

for( var i=0, l=watchers.length; i<l; i+=1 ){
	watchers[i].start( i*7 );
}

