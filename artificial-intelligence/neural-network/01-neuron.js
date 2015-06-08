
var Neuron = (function(){
	function Neuron(options){
		this.weights = [];
		this.activationFunction = function( n ){ return n > 0.5; };
		
		if( options.hasOwnProperty('weights') ){
			var weights = options.weights;
			for( var i=0, l=weights.length; i<l; i+=1 ){
				this.weights.push( weights[i] );
			}
		}else if( options.hasOwnProperty('nInputs') ){
			for( var i=0; i<options.nInputs; i+=1 ){
				this.weights.push( Math.random() );
			}
		}else{
			throw new Error( 'Neuron requires either an array of `weights` or an integer number of inputs `nInputs`' );
		}

		if( options.hasOwnProperty('activationFunction') ){
			this.activationFunction = options.activationFunction;
		}
		
	}
	
	Neuron.prototype.process = function( inputs ){
		if( inputs.length !== this.weights.length ){
			throw new Error( 'Number of inputs (currently: '+inputs.length+') must match number of weights ('+this.weights.length+')' );
		}
		
		var sum = 0;
		for( var i=0, l=inputs.length; i<l; i+=1 ){
			sum += this.weights[i] * inputs[i];
		}
		
		return this.activationFunction( sum );
	}
	
	return Neuron;
})();

var a = new Neuron({
	weights: [
		0.0,
		1.0,
		0.5
	],
	activationFunction: function( n ){
		return n > 0.5;
	}
});

console.info( a.process( [0,1,0] ) );
console.info( a.process( [1,0,0] ) );
