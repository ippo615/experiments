
function viterbi( observations, states, pStart, pChange, pObserve ){
	var V = [{}];
	var path = {};
	
	// Initialize the path (sequence of steps) and the probablities of
	// the most likely path in time (V).
	for( var i=0, l=states.length; i<l; i+=1 ){
		var state = states[i];
		V[0][state] = pStart[state] * pObserve[state][[observations[0]]];
		path[state] = [state];
	}

	// Create the path/table of most likely probabilities for each
	// observation
	for( var t=1, tEnd=observations.length; t<tEnd; t+=1 ){
		V.push( {} );
		var newPath = {};
		
		// For each possible state 
		for( var i=0, l=states.length; i<l; i+=1 ){
			var state = states[i];
			
			// Find the state with the maximum likily hood of being
			// overserved/transitioned to from the previous state
			var maxProb = V[t-1][states[0]] * pChange[states[0]][state] * pObserve[state][observations[t]];
			var maxState = states[0];
			for( var j=1; j<l; j+=1 ){
				var lastState = states[j];
				var prob = V[t-1][lastState] * pChange[lastState][state] * pObserve[state][observations[t]];
				if( prob > maxProb ){
					maxProb = prob;
					maxState = states[j];
				}
			}
			V[t][state] = maxProb;
			newPath[state] = path[maxState].slice(0);
			newPath[state].push( state );
			
		}
		path = newPath;
	}

	// Look through the final list for the actual result
	var n = observations.length-1;
	var maxState = states[0];
	var maxProb = V[n][maxState];
	for( var i=1, l=states.length; i<l; i+=1 ){
		var state = states[i];
		var prob = V[n][state];
		if( prob > maxProb ){
			maxProb = prob;
			maxState = state;
		}
	}
	
	return {
		state: maxState,
		p: maxProb,
		path: path[maxState]
	};
}

var states = [
	'Healthy', 
	'Fever'
];
var observations = [
	'normal', 
	'cold',
	'dizzy'
];
var pStart = {
	'Healthy': 0.6,
	'Fever': 0.4
};
var pChange = {
	'Healthy': {
		'Healthy': 0.7,
		'Fever': 0.3
	},
	'Fever': {
		'Healthy': 0.4,
		'Fever': 0.6
	}
};
var pObserve = {
	'Healthy': {
		'normal': 0.5,
		'cold': 0.4,
		'dizzy': 0.1
	},
	'Fever': {
		'normal': 0.1,
		'cold': 0.3,
		'dizzy': 0.6
	}
};

console.info( viterbi( observations, states, pStart, pChange, pObserve ) );
