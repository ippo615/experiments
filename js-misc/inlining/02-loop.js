
function extractFunctionSource( func ){
	var fullDef = func.toString();
	var start = fullDef.indexOf('{')+1;
	var end = fullDef.lastIndexOf('}');
	return fullDef.slice( start, end );
}

function buildFunction( argNames, funcBody ){
	var source = '';
	source += 'function _action('+argNames.join(',')+'){';
	source += funcBody;
	source += '}';
	eval( source );
	return _action;
}

function add(){
	return x+y;
}
function sub(){
	return x-y;
}

function makeApplyToAll(action){
	var source = '';
		source += 'function _action( x, y'
}
