// The import location is relative to the worker scripts location
importScripts( '../lib/add.js' );

// In this example the folder structure is:
// - index.html
// - workers\
// -   worker.js (this file)
// - lib\
// -   add.js (imported file)

this.addEventListener('message', function(e) {
	var arr1 = e.data.arr1;
	var arr2 = e.data.arr2;

	this.postMessage( addArray(arr1,arr2) );
}, false);
