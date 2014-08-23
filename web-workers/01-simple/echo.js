// echo.js - a web worker that 'returns' whatever data was passed to it

this.addEventListener('message', function(e) {
	this.postMessage(e.data);
}, false);
