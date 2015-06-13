
var ActivationFunction = (function(){
	function ActivationFunction(f,df){
		this.f = f;
		this.df = df;
	}
	return ActivationFunction;
})();

var logSigmoid = new ActivationFunction(
	function(a){
		return 1/(1+Math.exp(-a));
	},
	function(a){
		var ea = Math.exp(a);
		return ea / Math.pow(1+ea,2);
	}
);


var Neuron = (function(){
	function Neuron(options){
		this.weights = [];
		this.inputs = [];
		this.rawOutput = 0;
		this.error = 0;
		this.activationFunction = logSigmoid;
		
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
	};
	
	Neuron.prototype.process = function( inputs ){
		if( inputs.length !== this.weights.length ){
			throw new Error( 'Number of inputs (currently: '+inputs.length+') must match number of weights ('+this.weights.length+')' );
		}
		
		this.inputs = [];
		var sum = 0;
		for( var i=0, l=inputs.length; i<l; i+=1 ){
			this.inputs.push( inputs[i] );
			sum += this.weights[i] * inputs[i];
		}
		this.rawOutput = sum;
		
		return this.activationFunction.f( sum );
	};
	
	Neuron.prototype.learn = function( error, rate ){
	
		this.error  = this.activationFunction.df( this.rawOutput );
		this.error *= error;
		
		for( var i=0, l=this.weights.length; i<l; i+=1 ){
			this.weights[i] = this.weights[i] + rate * this.error * this.inputs[i];
		}
	};
	
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
	};
	
	NeuronLayer.prototype.learn = function( errors, rate ){
		if( errors.length !== this.neurons.length ){
			throw new Error( 'Number of errors (currently: '+errors.length+') must match number of neurons ('+this.neurons.length+')' );
		}
		
		for( var i=0, l=errors.length; i<l; i+=1 ){
			this.neurons[i].learn( errors[i], rate );
		}
	};
	
	NeuronLayer.prototype.getErrors = function( ){
		var errors = [];
		for( var i=0, l=this.neurons.length; i<l; i+=1 ){
			errors.push( this.neurons[i].error );
		}
		return errors;
	};
	
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
	
	NeuralNet.prototype.learn = function( targets, rate ){
		var outputLayer = this.layers[this.layers.length-1];
		if( targets.length !== outputLayer.neurons.length ){
			throw new Error( 'Number of targets (currently: '+targets.length+') must match number of neurons of the output layer ('+outputLayer.neurons.length+')' );
		}
		
		// Calculate the initial errors and update the output layer
		var errors = [];
		for( var i=0, l=targets.length; i<l; i+=1 ){
			var neuron = outputLayer.neurons[i];
			errors.push( targets[i] - neuron.activationFunction.f( neuron.rawOutput ) );
		}
		outputLayer.learn( errors, rate );
		
		// 
		for( var i=this.layers.length-2; i>0; i-=1 ){
			this.layers[i].learn( this.layers[i+1].getErrors(), rate );
		}
	};
	
	NeuralNet.prototype.copy = function(){
		return new NeuralNet( {
			layers: this.layers
		} );
	};
	
	return NeuralNet;
})();

// --------------------------------------------------------------------
//                           Example: Capitalization of ASCII Letters
// --------------------------------------------------------------------
function asciiToInput(ascii){
	var val = ascii.charCodeAt(0);
	return [
		(val & 1<<0) === (1<<0) ? 1 : 0,
		(val & 1<<1) === (1<<1) ? 1 : 0,
		(val & 1<<2) === (1<<2) ? 1 : 0,
		(val & 1<<3) === (1<<3) ? 1 : 0,
		(val & 1<<4) === (1<<4) ? 1 : 0,
		(val & 1<<5) === (1<<5) ? 1 : 0,
		(val & 1<<6) === (1<<6) ? 1 : 0,
		(val & 1<<7) === (1<<7) ? 1 : 0
	];
}
function inputToAscii(value){
	var code = 0;
	code += (value[0] > 0.5) ?   1 : 0;
	code += (value[1] > 0.5) ?   2 : 0;
	code += (value[2] > 0.5) ?   4 : 0;
	code += (value[3] > 0.5) ?   8 : 0;
	code += (value[4] > 0.5) ?  16 : 0;
	code += (value[5] > 0.5) ?  32 : 0;
	code += (value[6] > 0.5) ?  64 : 0;
	code += (value[7] > 0.5) ? 127 : 0;
	return String.fromCharCode(code);
}

var dataSet = [
	new TrainingData( asciiToInput('a'), asciiToInput('A') ),
	new TrainingData( asciiToInput('b'), asciiToInput('B') ),
	new TrainingData( asciiToInput('c'), asciiToInput('C') ),
	new TrainingData( asciiToInput('d'), asciiToInput('D') ),
	new TrainingData( asciiToInput('e'), asciiToInput('E') ),
	new TrainingData( asciiToInput('f'), asciiToInput('F') ),
	new TrainingData( asciiToInput('g'), asciiToInput('G') ),
	new TrainingData( asciiToInput('h'), asciiToInput('H') ),
	new TrainingData( asciiToInput('i'), asciiToInput('I') ),
	new TrainingData( asciiToInput('j'), asciiToInput('J') ),
	new TrainingData( asciiToInput('k'), asciiToInput('K') ),
	new TrainingData( asciiToInput('l'), asciiToInput('L') ),
	new TrainingData( asciiToInput('m'), asciiToInput('M') ),
	new TrainingData( asciiToInput('n'), asciiToInput('N') ),
	new TrainingData( asciiToInput('o'), asciiToInput('O') ),
	new TrainingData( asciiToInput('p'), asciiToInput('P') ),
	new TrainingData( asciiToInput('q'), asciiToInput('Q') ),
	new TrainingData( asciiToInput('r'), asciiToInput('R') ),
	new TrainingData( asciiToInput('s'), asciiToInput('S') ),
	new TrainingData( asciiToInput('t'), asciiToInput('T') ),
	new TrainingData( asciiToInput('u'), asciiToInput('U') ),
	new TrainingData( asciiToInput('v'), asciiToInput('V') ),
	new TrainingData( asciiToInput('w'), asciiToInput('W') ),
	new TrainingData( asciiToInput('x'), asciiToInput('X') ),
	new TrainingData( asciiToInput('y'), asciiToInput('Y') ),
	new TrainingData( asciiToInput('z'), asciiToInput('Z') )
];

var capNet = new NeuralNet({
	layers: [
		new NeuronLayer({ nNeurons: 8 }),
		new NeuronLayer({ nNeurons: 8 }),
		new NeuronLayer({ nNeurons: 8 })
	]
});

// Only train on some of the data, you'll see it works better when
// trained on all of the data.
// Also notice that the net is biased toward outputs it was taught.
var trainingSampleCount = 26;

for( var i=0; i<10000; i+=1 ){
	for( var t=0, l=trainingSampleCount; t<l; t+=1 ){
		capNet.process( dataSet[t].input );
		capNet.learn( dataSet[t].output, 2 );
	}
}

for( var t=0, l=dataSet.length; t<l; t+=1 ){
	console.info(
		inputToAscii( dataSet[t].input )
		+ ' -> '
		+ inputToAscii( capNet.process( dataSet[t].input ) )
	);
}

