importScripts( 'add.js' );

this.addEventListener('message', function(e) {
	var arr1 = e.data.arr1;
	var arr2 = e.data.arr2;

	var that = this;
	setTimeout( function(){
		that.postMessage( addArray(arr1,arr2) );
	}, 5000 );
}, false);
