var watchers = [];

sensorNames = [
	'leftEar',
	'leftHead',
	'rightHead',
	'rightEar'
];
sensorTypes = 'ffff';



for( var i=0, l=watchers.length; i<l; i+=1 ){
	watchers[i].start( i*7 );
}

