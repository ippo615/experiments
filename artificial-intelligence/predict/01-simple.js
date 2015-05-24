
/*********************************************************************
 * I was going to explain everything but I didn't. (Is it obvious?)
 *********************************************************************/

function Branch(){
	this.nSamples = 0;
	this.options = {};
}
Branch.prototype.addOption = function( option ){
	if( ! this.options.hasOwnProperty( option ) ){
		this.options[option] = 0;
	}
	this.options[option] += 1;
	this.nSamples += 1;
};
Branch.prototype.getProbabilities = function(){
	var probs = {};
	for( var opt in this.options ){
		if( this.options.hasOwnProperty( opt ) ){
			probs[ opt ] = this.options[opt]/this.nSamples;
		}
	}
	return probs;
};

function Predictor(){
	this.branches = {};
}
Predictor.prototype.trainPair = function( sequence ){
	var a = sequence[0];
	var b = sequence[1];
	if( ! this.branches.hasOwnProperty(a) ){
		this.branches[a] = new Branch();
	}
	this.branches[a].addOption( b );
};
Predictor.prototype.predict = function( first ){
	if( this.branches.hasOwnProperty(first) ){
		return this.branches[first].getProbabilities();
	}
	return '';
};

var douWords = 'AA,AB,AD,AE,AG,AH,AI,AL,AM,AN,AR,AS,AT,AW,AX,AY,BA,BE,BI,BO,BY,DE,DO,ED,EF,EH,EL,EM,EN,ER,ES,ET,EX,FA,FE,GO,HA,HE,HI,HM,HO,ID,IF,IN,IS,IT,JO,KA,KI,LA,LI,LO,MA,ME,MI,MM,MO,MU,MY,NA,NE,NO,NU,OD,OE,OF,OH,OI,OM,ON,OP,OR,OS,OW,OX,OY,PA,PE,PI,QI,RE,SH,SI,SO,TA,TI,TO,UH,UM,UN,UP,US,UT,WE,WO,XI,XU,YA,YE,YO,ZA'.split(',');
var p = new Predictor();
for( var i=0, l=douWords.length; i<l; i+=1 ){
	p.trainPair( douWords[i].split('') );
}

console.info( '\nA:' );
console.info( p.predict('A') );

console.info( '\nB:' );
console.info( p.predict('B') );

console.info( '\nC:' );
console.info( p.predict('C') );

console.info( '\nD:' );
console.info( p.predict('D') );
