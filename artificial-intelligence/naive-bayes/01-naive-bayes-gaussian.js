function grep( objects, match ){
	var results = [];
	for( var i=0, l=objects.length; i<l; i+=1 ){
		var object = objects[i];
		for( var prop in match ){
			if( match.hasOwnProperty(prop) && object.hasOwnProperty(prop) ){
				if( object[prop] === match[prop] ){
					results.push( object );
				}
			}
		}
	}
	return results;
}
function extract( objects, property ){
	var results = [];
	for( var i=0, l=objects.length; i<l; i+=1 ){
		results.push( objects[i][property] );
	}
	return results;
}
function computeMean( values ){
	var total = 0;
	for( var i=0, l=values.length; i<l; i+=1 ){
		total += values[i];
	}
	return total / values.length;
}
function computeVariance( values, mean ){
	var total = 0;
	for( var i=0, l=values.length; i<l; i+=1 ){
		var e = values[i] - mean;
		total += e*e;
	}
	return total / values.length;
}
/*
var males = grep(
	[
		{class: 'male', height: 6, weight: 180, footSize: 12},
		{class: 'male', height: 5.92, weight: 190, footSize: 11},
		{class: 'male', height: 5.58, weight: 170, footSize: 12},
		{class: 'male', height: 5.92, weight: 165, footSize: 10},
		{class: 'female', height: 5, weight: 100, footSize: 6},
		{class: 'female', height: 5.5, weight: 150, footSize: 8},
		{class: 'female', height: 5.42, weight: 130, footSize: 7},
		{class: 'female', height: 5.75, weight: 150, footSize: 9}
	], 
	{class: 'male'}
);
console.info( males );
console.info( extract(males,'height') );
*/

var NaiveBayes = (function(){
	function NaiveBayes(){
		this.samples = {};
		this.sampleCount = 0;
		this.model = {};
		this.population = {};
		this.lastSample = {};
		this.strict = false;
	}
	
	// Gaussian
	NaiveBayes.prototype.computePopulationParameters = function( className ){
		var samples = this.samples[className];

		// Extract all of the parameter names for a sample
		var first = samples[0];
		var parameters = [];
		for( var param in first ){
			if( first.hasOwnProperty( param ) ){
				parameters.push( param );
			}
		}

		// Compute the mean and variance
		var results = {};
		for( var i=0, l=parameters.length; i<l; i+=1 ){
			var values = extract( samples, parameters[i] );
			var mean = computeMean( values );
			var variance = computeVariance( values, mean );
			results[parameters[i]] = {
				mean: mean,
				variance: variance,
				n: values.length
			}
		}

		return results;
	};
	NaiveBayes.prototype.pdf = function(mean,variance,x){
		var a = 1.0/Math.sqrt(2.0*Math.PI*variance);
		var e = Math.exp( -Math.pow(x-mean,2)/(2.0*variance) );
		return a*e;
	};
	
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
		for( var className in this.samples ){
			if( this.samples.hasOwnProperty( className ) ){
				var summary = this.population[className];

				var p = 1.0;// summary.n / this.sampleCount;
				for( var prop in summary ){
					p *= this.pdf( summary[prop].mean, summary[prop].variance, sample[prop] );
				}
				// probablity of the thing being in a class based on
				// population sample only (note: this clearly seems to
				// bias the classifier toward things it shown more)
				// NOTE: the [prop], should store this count elsewhere
				p *= summary[prop].n / this.sampleCount;
				
				if( p > maxProb ){
					maxProb = p;
					maxClass = className;
				}
			}
		}

		return maxClass;
	};
	
	NaiveBayes.prototype.learn = function(output){
		if( ! this.samples.hasOwnProperty(output) ){
			this.samples[output] = [];
		}
		this.samples[output].push( this.lastSample );
		this.sampleCount += 1;
		this.population[output] = this.computePopulationParameters( output );
	};

	return NaiveBayes;
})();

var nb = new NaiveBayes();
nb.process({height: 6, weight: 180, footSize: 12});
nb.learn('male');
nb.process({height: 5.92, weight: 190, footSize: 11});
nb.learn('male');
nb.process({height: 5, weight: 100, footSize: 6});
nb.learn('female');
nb.process({class: 'female', height: 5.5, weight: 150, footSize: 8});
nb.learn('female');

console.info( nb );

console.info( nb.process({height: 6, weight: 180, footSize: 12}) );
console.info( nb.process({height: 5, weight: 100, footSize: 6}) );
