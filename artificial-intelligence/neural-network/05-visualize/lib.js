
function TrainingData( input, output ){
	this.input = input;
	this.output = output;
}

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

	Neuron.prototype.drawWeights = function(ctx,x,y,inputTargets){
		ctx.save();
		for( var i=0, l=this.weights.length; i<l; i+=1 ){
			ctx.globalAlpha = Math.abs(this.weights[i]);
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(inputTargets[i].x,inputTargets[i].y);
			ctx.stroke();
		}
		ctx.restore();
	};
	Neuron.prototype.drawNeuron = function(ctx,x,y,r){
		ctx.save();
		ctx.globalAlpha = (this.rawOutput+5)/10;
		// Draw circle
		ctx.beginPath();
		ctx.arc( x, y, r, 0, 2 * Math.PI, false);
		ctx.stroke();
		ctx.fill();
		// Add caption
		ctx.fillStyle = 'red';
		ctx.font = r+'px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText( this.rawOutput.toPrecision(2), x, y+2 );
		ctx.restore();
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

	NeuronLayer.prototype.drawWeights = function(ctx,x,y,w,h,inputTargets){
		for( var i=0, l=this.neurons.length; i<l; i+=1 ){
			this.neurons[i].drawWeights( ctx, x, y+0.5*h*(i+0.5-l*0.5), inputTargets );
		}
	};
	NeuronLayer.prototype.drawNeuron = function(ctx,x,y,w,h,r){
		for( var i=0, l=this.neurons.length; i<l; i+=1 ){
			this.neurons[i].drawNeuron( ctx, x, y+0.5*h*(i+0.5-l*0.5), r );
		}
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

	NeuralNet.prototype.drawWeights = function(ctx,x,y,w,h){
		for( var i=1, l=this.layers.length; i<l; i+=1 ){
			// TODO compute input targets
			var layer = this.layers[i-1];
			var inputTargets = [];
			for( var j=0, jl=layer.neurons.length; j<jl; j+=1 ){
				inputTargets.push( {
					x: x+0.5*w*(i-0.5-l*0.5),
					y: y+0.5*h*(j+0.5-jl*0.5)
				} );
			}

			this.layers[i].drawWeights( ctx, x+0.5*w*(i+0.5-l*0.5), y, w/l, h, inputTargets );
		}
	};
	NeuralNet.prototype.drawNeuron = function(ctx,x,y,w,h){
		for( var i=0, l=this.layers.length; i<l; i+=1 ){
			this.layers[i].drawNeuron( ctx, x+0.5*w*(i+0.5-l*0.5), y, w/l, h, Math.min(w,h)/(2*l) );
		}
	};
	
	return NeuralNet;
})();
