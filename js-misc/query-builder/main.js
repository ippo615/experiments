/*
 * milk, eggs, cheese -- has milk (and/or?) eggs (and/or?) cheese
>5 -- at least 5 ingredients
<7 -- at most 5 ingredients
+milk -- may have milk but not required
milk -- may have milk but not required


at_least, at_most, must_have, may_have, must_not_have
*/

function QueryBuilder( options ){
	options = options || {};
	this.listToken = options.listToken || ',';
	this.keywordToken = options.keyworkToken || ':';
	this.parameters = {};
}
QueryBuilder.prototype.addParameter = function( options ){
	// options.name = name of parameter
	// options.aliases = list of other names for parameter
	// options.validate = validation function
	// options.operator = single character operator
	// options.isSingle = boolean, may appear at most ONCE in a query
	// options.isRequired = boolean, must appear in a query
	this.parameters[options.name] = options;
};
QueryBuilder.prototype.findOperators = function(text){
	// returns [operatorText,...]
	var names = [];
	for( var paramName in this.parameters ){
		var param = this.parameters[paramName];
		names.push( param.name );
		for( var i=0,l=param.aliases.length; i<l; i+=1 ){
			names.push( param.aliases[i] );
		}
	}
	var prefix = '(?:';
	var postfix = this.keywordToken+')';
	var regexStr = prefix+names.join( postfix+'|'+prefix )+postfix;
	var regex = new RegExp( '('+regexStr+')+?' , 'g');
	return text.match(regex);
};
QueryBuilder.prototype.getOperatorName = function( text ){
	for( var paramName in this.parameters ){
		var param = this.parameters[paramName];
		if( param.name === text ){
			return param.name;
		}
		for( var i=0, l=param.aliases.length; i<l; i+=1 ){
			if( param.aliases[i] === text ){
				return param.name;
			}
		}
		if( param.operator === text ){
			return param.name;
		}
	}
	return '';
};
QueryBuilder.prototype.parse = function( text ){
	
	var results = {};
	for( var i in this.parameters ){
		results[this.parameters[i].name] = [];
	}
	var txt = text;
	
	// Find locations of all of the operators
	var operators = this.findOperators( text );
	
	// Loop through all the matches and extract the stuff in between
	for( var i=0, l=operators.length; i<l; i+=1 ){
		var opName = this.getOperatorName( operators[i].split(':')[0] );
		//if( ! results.hasOwnProperty( opName ) ){
		//	results[opName] = [];
		//}
		var valueStartIndex = txt.search( operators[i] )+operators[i].length;
		if( i+1 < l ){
			var valueEndIndex = txt.slice(valueStartIndex).search( operators[i+1] )+valueStartIndex;
			var value = txt.slice( valueStartIndex, valueEndIndex );
			txt = txt.slice( valueEndIndex );
		}else{
			var value = txt.slice( valueStartIndex );
			txt = txt.slice( valueEndIndex );
		}
		results[opName].push( value ); // TODO: conversion function
	}
	return results;
};

var recipeQueryBuilder = new QueryBuilder();
recipeQueryBuilder.addParameter({
	name: 'atLeast',
	aliases: ['atleast','at_least'],
	operator: '>',
	isSingle: true
});
recipeQueryBuilder.addParameter({
	name: 'atMost',
	aliases: ['atmost','at_most'],
	operator: '<',
	isSingle: true
});
recipeQueryBuilder.addParameter({
	name: 'mustHave',
	aliases: ['musthave','must_have']
});
recipeQueryBuilder.addParameter({
	name: 'mayHave',
	aliases: ['mayhave','may_have']
});
recipeQueryBuilder.addParameter({
	name: 'mustNotHave',
	aliases: ['mustnothave','must_not_have']
});

console.info( recipeQueryBuilder.findOperators( 'atLeast:5 atMost:10 mustHave:apples must_have:banana' ) );
console.info( recipeQueryBuilder.parse( 'atLeast:5 atMost:10 mustHave:apples must_have:banana' ) );

console.info( 'hello: 123 my_name:andrew'.split(/hello:|my_name:/g) );
console.info( ', 123 ,andrew'.split(',') );
