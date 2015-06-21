// -------------------------------------------------------------------
//                                             Gaussian Distribution
// -------------------------------------------------------------------
function Gaussian(){
	this.values = [];
	this.mean = 0;
	this.variance = 0;
}
Gaussian.prototype.push = function( value ){
	this.values.push( value );
	this.compute();
};
Gaussian.prototype._computeMean = function(values){
	var total = 0;
	for( var i=0, l=values.length; i<l; i+=1 ){
		total += values[i];
	}
	return total / values.length;	
};
Gaussian.prototype._computeVariance = function( values, mean ){
	var total = 0;
	for( var i=0, l=values.length; i<l; i+=1 ){
		var e = values[i] - mean;
		total += e*e;
	}
	return total / values.length;
};
Gaussian.prototype.compute = function(){
	this.mean = this._computeMean( this.values );
	this.variance = this._computeVariance( this.values, this.mean );
	return {
		mean: this.mean,
		variance: this.variance
	};
};
Gaussian.prototype.pdf = function(x){
	var a = 1.0/Math.sqrt(2.0*Math.PI*this.variance);
	var e = Math.exp( -Math.pow(x-this.mean,2)/(2.0*this.variance) );
	return a*e;
};


// -------------------------------------------------------------------
//                                            Naive Bayes Classifier
// -------------------------------------------------------------------
var NaiveBayes = (function(){

	function NaiveBayes(distribution){
		// Actual samples, total number of samples, count of each class
		this.samples = {};
		this.sampleCount = 0;
		this.sampleCounts = {};
		
		// Doing the actaul stats
		this.distribution = distribution;
		this.distributions = {};
		
		// For learning the last processed data point
		this.lastSample = {};
		
		// Is error checking strict or not?
		this.strict = false;
	}
	
	function extract( objects, property ){
		var results = [];
		for( var i=0, l=objects.length; i<l; i+=1 ){
			results.push( objects[i][property] );
		}
		return results;
	}
	
	NaiveBayes.prototype.process = function(sample){
		if( this.strict ){
			// check if sample properties match this.model properties
			// if missing -> error
			// if extra -> warning
		}
		
		// If we want to learn what this is later
		this.lastSample = sample;
		
		var maxProb = 0;
		var maxClass = '';
		for( var className in this.distributions ){
			if( this.distributions.hasOwnProperty( className ) ){
				var distribution = this.distributions[className];

				// probablity of the thing being in a class based on
				// population sample only (note: this clearly seems to
				// bias the classifier toward things it is shown more)
				var p = this.sampleCounts[className] / this.sampleCount;
				for( var prop in distribution ){
					p *= distribution[prop].pdf( sample[prop] );
				}
				
				if( p > maxProb ){
					maxProb = p;
					maxClass = className;
				}
			}
		}

		return maxClass;
	};
	
	NaiveBayes.prototype.learn = function(output){
		
		if( ! this.distributions.hasOwnProperty(output) ){
			this.distributions[output] = {};
			for( var prop in this.lastSample ){
				if( this.lastSample.hasOwnProperty(prop) ){
					this.distributions[output][prop] = new this.distribution();
				}
			}
			
			this.sampleCounts[output] = 0;
		}
		
		for( var prop in this.lastSample ){
			if( this.lastSample.hasOwnProperty(prop) ){
				this.distributions[output][prop].push( this.lastSample[prop] );
				this.distributions[output][prop].compute();
			}
		}

		this.sampleCounts[output] += 1;
		this.sampleCount += 1;

	};

	return NaiveBayes;
})();

function TrainingData( input, output ){
	this.input = input;
	this.output = output;
}
var trainingSamples = [
	new TrainingData( {height: 6, weight: 180, footSize: 12}, 'male' ),
	new TrainingData( {height: 5.92, weight: 190, footSize: 11}, 'male' ),
	new TrainingData( {height: 5.58, weight: 170, footSize: 12}, 'male' ),
	new TrainingData( {height: 5.92, weight: 165, footSize: 10}, 'male' ),
	new TrainingData( {height: 5, weight: 100, footSize: 6}, 'female' ),
	new TrainingData( {height: 5.5, weight: 150, footSize: 8}, 'female' ),
	new TrainingData( {height: 5.42, weight: 130, footSize: 7}, 'female' ),
	new TrainingData( {height: 5.75, weight: 150, footSize: 9}, 'female' )
];

var nb = new NaiveBayes(Gaussian);
for( var i=0, l=trainingSamples.length; i<l; i+=1 ){
	nb.process( trainingSamples[i].input );
	nb.learn( trainingSamples[i].output );
}

console.info( nb );
console.info( nb.process({height: 6, weight: 180, footSize: 12}) );
console.info( nb.process({height: 5, weight: 100, footSize: 6}) );
