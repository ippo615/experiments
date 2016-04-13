
function buildFunction( funcBody ){
	var source = '';
	source += 'function _action(){';
	source += funcBody;
	source += '}';
	eval( source );
	return _action;
}

var sayHi = buildFunction( 'console.info("Hello world!");' );
var add = buildFunction( 'return arguments[0]+arguments[1]' );

sayHi();
console.info( add( 1,2 ) );
