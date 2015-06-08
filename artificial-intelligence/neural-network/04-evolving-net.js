
var Neuron = (function(){
	function Neuron(options){
		this.weights = [];
		this.activationFunction = function( n ){ return (n > 0.5) ? 1.0 : 0.0; };
		
		if( options.hasOwnProperty('weights') ){
			this.setWeights( options.weights, true );
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
	
	Neuron.prototype.setWeights = function( weights, allowResize ){
		if( ! allowResize ){
			if( weights.length !== this.weights.length ){
				 throw new Error('Number of new neuron weights ('+weights+') do not match number of old neuron weights ('+this.weights.length+')' );
			}
		}
		this.weights.splice(0,this.weights);
		for( var i=0, l=weights.length; i<l; i+=1 ){
			this.weights.push( weights[i] );
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
	
	Neuron.prototype.copy = function(){
		return new Neuron( { weights: this.weights } );
	};
	
	return Neuron;
})();

var NeuronLayer = (function(){
	NeuronLayer = function(options){
		this.neurons = [];
		if( options.hasOwnProperty('neurons') ){
			var neurons = options.neurons;
			for( var i=0, l=neurons.length; i<l; i+=1 ){
				this.neurons.push( neurons[i].copy() );
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
	
	NeuronLayer.prototype.copy = function(){
		return new NeuronLayer( { neurons: this.neurons } );
	};
	
	return NeuronLayer;
})();

var NeuralNet = (function(){
	function NeuralNet(options){
		this.layers = [];
		if( options.hasOwnProperty('layers') ){
			var layers = options.layers;
			for( var i=0, l=layers.length; i<l; i+=1 ){
				this.layers.push( layers[i].copy() );
			}
		}
	}
	
	NeuralNet.prototype.process = function( inputs ){
		var outputs = this.layers[0].process(inputs);
		for( var i=1, l=this.layers.length; i<l; i+=1 ){
			outputs = this.layers[i].process( outputs );
		}
		return outputs;
	};
	
	NeuralNet.prototype.copy = function(){
		return new NeuralNet( {
			layers: this.layers
		} );
	};
	
	return NeuralNet;
})();

var aNet = new NeuralNet({
	layers: [
		new NeuronLayer({ nNeurons: 5 }),
		new NeuronLayer({ nNeurons: 5 }),
		new NeuronLayer({ nNeurons: 5 }),
		new NeuronLayer({ nNeurons: 5 })
	]
});
console.info( aNet.copy() );

// Everything starts with random weights
function TrainingData( input, output ){
	this.input = input;
	this.output = output;
}

var trainingSet = [
	new TrainingData( [0,1,1,1,1], [0,0,0,0,1] ),
	new TrainingData( [1,0,1,1,1], [0,0,0,1,0] ),
	new TrainingData( [1,1,0,1,1], [0,0,1,0,0] ),
	new TrainingData( [1,1,1,0,1], [0,0,0,1,0] ),
	new TrainingData( [1,1,1,1,0], [0,0,0,0,1] )
];

// Randomly generate nets and keep the one that has the most correct
// try up to 100 nets.
// NOTE: This methods does NOT work very well.
var bestNet = aNet.copy();
var bestScore = 0;
for( var i=0; i<100; i+=1 ){
	var net = new NeuralNet({
		layers: [
			new NeuronLayer({ nNeurons: 5 }),
			new NeuronLayer({ nNeurons: 5 }),
			new NeuronLayer({ nNeurons: 5 }),
			new NeuronLayer({ nNeurons: 5 })
		]
	});
	
	var score = 0;
	for( var t=0, l=trainingSet.length; t<l; t+=1 ){
		var data = trainingSet[t];
		if( net.process( data.input ) === data.output ){
			score += 1;
		}else{
			score -= 1;
		}
	}
	
	if( score > bestScore ){
		bestNet = net.copy();
		bestScore = score;
	}
}

console.info( bestScore );
console.info( bestNet );
for( var t=0, l=trainingSet.length; t<l; t+=1 ){
	var data = trainingSet[t];
	console.info( net.process( data.input ) );
}

var binaryInvertLayer = new NeuronLayer({
	neurons: [
		new Neuron({
			weights: [0,1]
		}),
		new Neuron({
			weights: [1,0]
		})
	]
});

console.info( 'Binary Inverting Layer' );
console.info( binaryInvertLayer.process([1,0]) );
console.info( binaryInvertLayer.process([0,1]) );
