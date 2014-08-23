importScripts( '../lib/blob-map.js' );

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

	var blobLabels = blobMap(src);
	ColorTheBlobs(dst,blobLabels,[
        [0,0,0,255],
        [255,0,0,255],
        [0,255,0,255],
        [0,0,255,255],
        [255,255,0,255],
        [255,0,255,255],
        [0,255,255,255]
    ]);

	this.postMessage( {
		src: src,
		dst: dst
	});

	this.isRunning = false;

}, false);
