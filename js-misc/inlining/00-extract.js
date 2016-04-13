
function extractFunctionSource( func ){
	var fullDef = func.toString();
	var start = fullDef.indexOf('{')+1;
	var end = fullDef.lastIndexOf('}');
	return fullDef.slice( start, end );
}

var action = function(){
	return 'my name is name';
}
function xyz(){
	var x = 1;
	var y = 2;
	var z = 3;
	return x+y+z;
}
console.info( extractFunctionSource( action ) );
console.info( extractFunctionSource( xyz ) );
console.info( extractFunctionSource( function(){ return x+y; } ) );
