// -------------------------------------------------------------------
//                                                          Patterns
// -------------------------------------------------------------------

// ## Big Picture
//
// I want to create something with can take a bunch of input and find
// the pattern (more like "similarity" or "form") in the set of
// inputs.
//
// The idea below is that a Pattern is an data structure made of
// strings. Each string is an `example`. All of these strings share
// *somthing* implicit in common but that implicit similar is not
// directly stated by a user (hence "implicit").
//
// The goal of the Pattern class is to take of those inputs and find
// what makes them similar then create a generalized form of the
// inputs.
// 
// An example:
//     Inputs: [
//         '1+2',
//         '7+8',
//         '9+3',
//         '1234+5',
//         '678+9'
//     ]
//     Pattern: [one_or_more_digits] [plus_sign] [one_or_more_digits]
//
// ## The Little Details
// 
// The patternized needs to know what a basic unit of somthing is.
// It can be as simple as a single character or a more complicated
// string. For now, we'll go with a string because it generalizes
// the character (a character is a string of length 0) and is easier
// to work with. I will call these basic units `tokens`.
//
// Generating/processing the statistics of these tokens in the
// examples forms the core of pattern extraction.
// 
// In the simple addition example lets assume we have the following
// tokens available: `+,-,*,/,=,0,1,2,3,4,5,6,7,8,9`. The only token
// that appears in every example is: `+`. The tokens which do not
// appear in any examples are: `-,*,/,0`. The tokens which appear in
// some but not all of the examples are: `1,2,3,4,5,6,7,8,9`.
//
// Since `+` appears in EVERY example it is a "primary" or
// "static" or "constanst" or "" part of this pattern.
//
// Since `-,*,/,0` do NOT appear in ANY examples they are NOT included
// as ANY part of the pattern. (note: this will change in the future
// to accomodate inference and generalization).
//
// Since `1,2,3,4,5,6,7,8,9` appear in some but not all examples they
// form the "secondary" or "dynamic" or "variable" parts of this
// pattern.
//
// The generalized pattern will be formed by replacing the "constant"
// components with that token and the "variable" components with the 
// "least constricting regular expression of it". I'll illustrate the
// meaning of the last quotation with an example, given `12376` as the
// variable string and `1,2,3,4,5,6` as the tokens then there are 2 
// options which I'll talk about in detail:
//
// `((1)|(2)|(3)|(6)|(7))+` represents the string-specific version.
// `[12376]+` represents the character-specific version which is
// slightly more general. Quite frankly, I don't know which is more
// appropriate. I'm leaning toward the string-specific version
// because it will match fewer patterns but is still generalizes the
// string concept. Perhaps `[12376]+` over-generalizes the concept?
// Consider tokens: `bo` and `ob`. In one case the generalized example
// would be `((bo)|(ob))+` and in the other: `[bo]+`. I suppose the
// question that needs to be answered is: are there times where I want
// to match the string version but not the character version? Looking
// to the future: characters, strings, regular expressions, and
// numbers will be replaced by a general "pattern" concept which will
// behave more like the string version (and not the character
// version). I suppose that is my reason for favoring `((bo)|(ob))+`
// over `[bo]+`.
//
// Initally, I tought I would need to specify the tokens available to
// the patternizer but then I realized that would make it dependent on
// "external data". To avoid this external dependency I can generate
// all possible tokens from the input sequence. Implementationwise, I
// would have a separate token-generator that would process the
// inputs and generate a set of usable tokens.

function Pattern( example ){

	this.examples = [];
	this.counts = {};

	if( example ){
		this.push( example );
	}
	
}

Pattern.prototype.push = function(example){
	if( this.counts.hasOwnProperty( example ) ){
		this.counts[ example ] += 1;
	}else{
		this.counts[ example ] = 1;
		this.examples.push( example );
	}
};

Pattern.prototype.tokensInAll = function( tokens ){

	var matches = [];

	for( var t=0,nt=tokens.length; t<nt; t+=1 ){
		var token = tokens[t];
		var tokenIsInAll = true;
		for( var e=0,ne=this.examples.length; e<ne; e+=1 ){
			if( this.examples[e].indexOf(token) === -1 ){
				tokenIsInAll = false;
				break;
			}
		}
		if( tokenIsInAll ){
			matches.push( token );
		}
	}

	return matches;
};

Pattern.prototype.tokensInAny = function( tokens ){

	var matches = [];

	for( var t=0,nt=tokens.length; t<nt; t+=1 ){
		var token = tokens[t];
		var tokenIsInAny = false;
		for( var e=0,ne=this.examples.length; e<ne; e+=1 ){
			if( this.examples[e].indexOf(token) > -1 ){
				tokenIsInAny = true;
				break;
			}
		}
		if( tokenIsInAny ){
			matches.push( token );
		}
	}

	return matches;
};
Pattern.prototype.containsToken = function( token ){
	var matches = [];
	for( var e=0,ne=this.examples.length; e<ne; e+=1 ){
		if( this.examples[e].indexOf(token) > -1 ){
			matches.push( this.examples[e] );
		}
	}
	return matches;
};
Pattern.prototype.tokenHistogram = function( tokens ){
	var histogram = {};

	for( var t=0,nt=tokens.length; t<nt; t+=1 ){
		var token = tokens[t];
		histogram[token] = 0;
		for( var e=0,ne=this.examples.length; e<ne; e+=1 ){
			if( this.examples[e].indexOf(token) > -1 ){
				histogram[token] += 1;
			}
		}
	}

	return histogram;
};
Pattern.prototype.variableRegexpStr = function( variableTokens ){
	var cleaned = [];
	for( var i=0, l=variableTokens.length; i<l; i+=1 ){
		cleaned.push( regexpStrEscape(variableTokens[i]) );
	}
	return '(?:(?:'+cleaned.join(')|(?:')+'))+';
};
function regexpStrEscape( str ){
	var s = str;
	s = s.replace( /\+/g, '\\+' );
	s = s.replace( /\*/g, '\\*' );
	s = s.replace( /\?/g, '\\?' );
	s = s.replace( /\)/g, '\\)' );
	s = s.replace( /\(/g, '\\(' );
	s = s.replace( /\]/g, '\\]' );
	s = s.replace( /\[/g, '\\[' );
	s = s.replace( /\//g, '\\/' );
	return s;
};
Pattern.prototype.constantRegexpStr = function( constantTokens ){
	var strings = [];
	for( var i=0, l=constantTokens.length; i<l; i+=1 ){
		strings.push( regexpStrEscape(constantTokens[i]) );
	}
	return strings;
};
Pattern.prototype.generalize = function(tokens){

	// Create a list of the tokens in all examples and a list of the
	// tokens that appear in some but not all of the examples
	var constantTokens = this.tokensInAll( tokens );
	var variableTokens = this.tokensInAny( tokens );
	for( var c=0, nc=constantTokens.length; c<nc; c+=1 ){
		for( var v=variableTokens.length; v>=0; v-=1 ){
			if( variableTokens[v] === constantTokens[c] ){
				variableTokens.splice(v,1);
				break;
			}
		}
	}
	//console.info( variableTokens );
	//console.info( constantTokens );

	// Create a string and regular expression of the variable tokens
	var variableRegexpStr = this.variableRegexpStr( variableTokens );
	var variableRegexp = new RegExp(variableRegexpStr,'g');
	//console.info( variableRegexp );

	// Create a string and regular expression for each of the static
	// constant that make up the pattern
	var constantRegexpStrs = this.constantRegexpStr( constantTokens );
	var constantRegexps = [];
	for( var i=0, ni=constantRegexpStrs.length; i<ni; i+=1 ){
		constantRegexps.push( new RegExp( constantRegexpStrs[i] ) );
	}
	//console.info( constantRegexpStrs );

	// Convert every example to a regular expression string
	// they should all agree
	var templateRegexps = [];
	for( var i=0, ni = this.examples.length; i<ni; i+=1 ){
		var splits = this.examples[i].split( variableRegexp );
		console.info( splits );
		var template = '';
		for( var s=0, ns=splits.length; s<ns; s+=1 ){
			if( splits[s] === '' ){
				template += variableRegexpStr;
			}else{
				for( var c=0, nc=constantRegexps.length; c<nc; c+=1 ){
					if( constantRegexps[c].test( splits[s] ) ){
						template += constantRegexpStrs[c];
						break;
					}
				}
			}
		}
		templateRegexps.push( template );
	}
	
	// Check for repeats?
	for( var i=1, ni=templateRegexps.length; i<ni; i+=1 ){
		if( templateRegexps[i] !== templateRegexps[0] ){
			// hmm... this may (or may not) be bad
			//console.info( "DISAGREE" );
			//console.info( templateRegexps[i] );
		}
	}
	
	return templateRegexps[0];
};

function normalizeHistogram( histogram ){
	var total = 0;
	var normalized = {};
	var keys = [];
	for( var key in histogram ){
		if( histogram.hasOwnProperty(key) ){
			keys.push( key );
			total += histogram[key];
		}
	}
	for( var i=0, l=keys.length; i<l; i+=1 ){
		var key = keys[i];
		normalized[key] = histogram[key] / total;
	}
	return normalized;
};

function generateAscii( start, end ){
	var ascii = [];
	for( var i=start; i<=end; i+=1 ){
		ascii.push( String.fromCharCode(i) );
	}
	return ascii;
}
function printableAscii(){
	return generateAscii(32,126);
}

function generateTokens( samples ){
	var chars = {};
	for( var i=0, l=samples.length; i<l; i+=1 ){
		var sample = samples[i];
		for( var j=0, c=sample.length; j<c; j+=1 ){
			chars[ sample[j] ] = 1;
		}
	}
	var tokens;
	for( var c in chars ){
		
	}
}

// -------------------------------------------------------------------
//                                                          Examples
// -------------------------------------------------------------------


// This is a simple example to show the different token functions
var p = new Pattern();
p.push( 'abc' );
p.push( 'aaaaachoo' );
p.push( 'acdc' );
p.push( 'adc' );
console.info( p.tokensInAll( printableAscii() ) );
console.info( p.tokensInAny( printableAscii() ) );
console.info( p.tokenHistogram( 'abcd'.split('') ) );
console.info( normalizeHistogram( p.tokenHistogram( 'abcd'.split('') ) ) );
console.info( p.containsToken( 'd' ) );


// Another simple example that "learns" the form of an addition
// expression
var math = new Pattern();
math.push( '1+2' );
math.push( '12+17' );
math.push( '8+9' );
math.push( '432+77' );
var tokens = '+-*/1234567890(){}[]'.split('');
var operator = math.tokensInAll( tokens )[0];
console.info( operator );
console.info( math.generalize( tokens ) );


// An example that does not work because there are characters that 
// belong in the static and dynamic groups...
var h1 = new Pattern();
h1.push( '<h1>What is this?</h1>' );
h1.push( '<h1>Title</h1>' );
h1.push( '<h1>Hehe, this will not work</h1>' );
h1.push( '<h1>A problem is present</h1>' );
var tokens = printableAscii();
tokens.splice( 0,0, '<h1>' );
tokens.splice( 0,0, '</h1>' );
console.info( h1.generalize( tokens ) );

// ## After Thoughts
// 
// The general maybe applicable to more scenarios but the current
// implementation is very limited.
//
// In the last example we want to find: `<h1>[a-zA-Z]+</h1>` but we
// don't. The problem arises because some token characters fall into
// 2 categories. We want the constants to be `<h1>` and `</h1>` but
// we cannot get that output if our tokens are all characters. If we
// add `<h1>` and `</h1>` as tokens we can get closer but the inner
// (ie variable) part of the pattern is wrong because some characters
// appear in every example but are not important to the structure of
// the pattern.
//
// This raises the question: how can we allow tokens to be in multiple
// groups? It also seems to suggest (and I alluded to this previously)
// that all tokens/symbols/patterns should be the same thing.
// Currently, a pattern is made of strings (which are made of
// characters) and a pattern is generalized with tokens (which are
// strings). It should actually be: a pattern is made of patterns
// which are in tern made of patterns whose patterns are made of
// patterns until the pattern cannot be divided anymore. The "highest
// level" (in terms of heirarchy) patterns should be most important.
//
// An example to illustrate the previous paragraph. Let's continue
// with `<h1>BLAH BLAH BLAH</h1>`. The ideal pattern heirarchy would
// be:
// 
//     HTML H1 Heading:  <h1>BLAH BLAH BLAH</h1>
//     |- Opening H1 Tag: <h1>
//     |  |- Less:        <
//     |  |- h character: h
//     |  |- 1 character: 1
//     |  |- Greater:     >
//     |- Any Character: [a-zA-Z]+
//     |  | - ... list of characters ...
//     |- Closing H1 Tag: </h1>
//     |  |- Less:        <
//     |  |- Slash:       /
//     |  |- h character: h
//     |  |- 1 character: 1
//     |  |- Greater:     >
// 

// Look! An empty string can be a dictionary key:
var x = {};
x[''] = 'hello_world';
console.info( x );
for( var i in x ){
	console.info( 'x['+i+'] = '+x[i] );
}

// An idea:
// have token generating functions, for example:
//  - split at spaces/tabs/commas/semi-colons/periods
//  - split at each inidivual character
// Send all of the inputs through several token generators
// use that list of generated tokens to create histograms of
// tokensets (ie are letters good tokens? are punctations good tokens?)
// use "max count" and distribution to determine which token set is
// best
// select best(s?) symbol from token set to delimit and parse data

