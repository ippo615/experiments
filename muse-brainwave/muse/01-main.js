
// Create the eeg charts 
var paths = [
	'/muse/elements/low_freqs_absolute',
	'/muse/elements/delta_absolute',
	'/muse/elements/theta_absolute',
	'/muse/elements/alpha_absolute',
	'/muse/elements/beta_absolute',
	'/muse/elements/gamma_absolute',
	'/muse/eeg',
	'/muse/eeg/quantization'
];

var charts = {};
for( var i=0, l=paths.length; i<l; i+=1 ){
	charts[paths[i]] = new EegChart();
	var domId = 'container' + paths[i].replace(/\//g,'_');
	var container = document.getElementById( domId );
	container.appendChild( charts[paths[i]].canvas );
}

function watch_file( path, delay ){
  setInterval( function(){
		$.get( 'data'+path+'.jsonfm', function(response){
			//charts[path].push( (new Date()).getTime(), JSON.parse(response) );
			charts[path].push( (new Date()).getTime(), {
				"_path": "/muse/elements/alpha_absolute",
				"leftEar": Math.random(),
				"leftHead": Math.random(),
				"rightEar": Math.random(),
				"rightHead": Math.random()
			} );
    	// console.info( JSON.parse(response) );
		});
	}, delay );
}

watch_file( '/muse/elements/low_freqs_absolute', 500 );
watch_file( '/muse/elements/delta_absolute', 500 );
watch_file( '/muse/elements/theta_absolute', 500 );
watch_file( '/muse/elements/alpha_absolute', 500 );
watch_file( '/muse/elements/beta_absolute', 500 );
watch_file( '/muse/elements/gamma_absolute', 500 );
watch_file( '/muse/eeg', 500 );
watch_file( '/muse/eeg/quantization', 500 );

