
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

var NeuronLayer = (function(){
	NeuronLayer = function(options){
		this.neurons = [];
		if( options.hasOwnProperty('neurons') ){
			var neurons = options.neurons;
			for( var i=0, l=neurons.length; i<l; i+=1 ){
				this.neurons.push( neurons[i] );
			}
		}else if( options.hasOwnProperty( 'nNeurons' ) ){
			// For now limit the inputs to the same as the number of 
			// neurons
			for( var i=0, l=options.nNeurons; i<l; i+=1 ){
				this.neurons.push( new Neuron({nInputs:l}) );
			}
		}
	}
	
	NeuronLayer.prototype.process = function( inputs ){
		if( inputs.length !== this.neurons.length ){
			throw new Error( 'Number of inputs (currently: '+inputs.length+') must match number of neurons ('+this.neurons.length+')' );
		}
		var outputs = [];
		for( var i=0, l=inputs.length; i<l; i+=1 ){
			outputs.push( this.neurons[i].process( inputs ) );
		}
		return outputs;
	}
	
	return NeuronLayer;
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

var aLayer = new NeuronLayer({
	neurons: [
		new Neuron({
			weights: [1,0,0],
		}),
		new Neuron({
			weights: [0,1,0],
		}),
		new Neuron({
			weights: [0,0,1],
		})
	]
});

console.info( aLayer.process( [1,0,0] ) );
console.info( aLayer.process( [0,1,0] ) );
console.info( aLayer.process( [0,0,1] ) );
