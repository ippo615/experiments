importScripts( 'morphology.js' );

this.isRunning = false;

this.addEventListener('message', function(e) {

	if( this.isRunning ){
		return;
	}else{
		this.isRunning = true;
	}

	//console.info( e.data );
	//console.info( e.data.src.data );
	//console.info( e.data.dst );
	var src = e.data.src;
	var dst = e.data.dst;

	var ping = _copyImageData( src );
	var pong = _copyImageData( src );
	var i = 0, nTimes = 3;
	for( i=0; i<nTimes; i+=2 ){
		imageErode( ping, pong );
		imageErode( pong, ping );
	}
	imageErode( ping, dst );

	this.postMessage( {
		src: src,
		dst: dst
	});

	this.isRunning = false;

}, false);
