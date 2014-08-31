function PriorityQueue(){
	this._elements = [];
}
PriorityQueue.prototype.insert = function(data,priority){

	// Binary search to find the proper location to insert the element
	var nElements = this._elements.length;

	var lower = 0;
	var upper = nElements;
	var middle = Math.floor( (lower + upper) / 2 );

	while( lower < upper ){
		if( priority < this._elements[middle].priority ){
			upper = middle;
		}else{
			lower = middle+1;
		}
		middle = Math.floor( lower + (upper-lower) / 2 );
	}

	this._elements.splice(middle,0,{
		data: data,
		priority: priority
	});

	return this;
};

PriorityQueue.prototype.pop = function(){
	return this._elements.pop().data;
};
PriorityQueue.prototype.shift = function(){
	return this._elements.shift().data;
};
PriorityQueue.prototype.isEmpty = function(){
	return this._elements.length === 0;
};

/*
var q = new PriorityQueue();
q.insert(0,0);
q.insert(1,1);
q.insert(2,2);
q.insert(3,3);
q.insert(4,4);
q.insert(5,5);
q.insert(6,4);
q.insert(7,3);
q.insert(8,1);
q.insert(9,2);
q.insert(10,0);
q.insert(11,5);
console.info( q );
console.info( q.pop() );
console.info( q.shift() );
*/

function AStarNode( data, parent, costFromStart, costToGoal ){
	this.data = data;
	this.parent = parent;
	this.costFromStart = costFromStart;
	this.costToGoal = costToGoal;
	this.totalCost = costFromStart+costToGoal;
}

function aStar( start, goal, world, getNextStates, computeScore ){
	var closedSet = [];
	var openSet = new PriorityQueue();
	var cameFrom = [];

	var score = computeScore( start, goal, world );
	openSet.insert( new AStarNode(
		start,
		null,
		0,
		score
	), score);

	var currentNode;
	var nextStates;
	while( ! openSet.isEmpty() ){
		// Remove the best node from the open set and append it to closed
		currentNode = openSet.shift();
		closedSet.push( currentNode );

		// If we reached the goal
		if( currentNode.data === goal ){
			var path = [];
			while( currentNode.parent !== null ){
				path.splice( 0, 0, currentNode.data );
				currentNode = currentNode.parent;
			}
			path.splice( 0, 0, currentNode.data );
			return path;
		}

		// Get a list of all the locations we can go from here
		nextStates = getNextStates( currentNode.data, world );
		
		// Remove states that are already in the open or closed set
		var i = nextStates.length;
		var nextState;
		var j, nOpen = openSet._elements.length;
		var nClosed = closedSet.length;
		while( i-- ){
			nextState = nextStates[i];

			// Ignore the state if we already have it in the open set
			var isInOpen = false;
			for( j=0; j<nOpen; j+=1 ){
				if( nextState === openSet._elements[j].data.data ){
					isInOpen = true;
					break;
				}
			}
			if( isInOpen ){
				continue;
			}

			// Ignore the state if it already is in the closed set
			var isInClosed = false;
			for( j=0; j<nClosed; j+=1 ){
				if( nextState === closedSet[j].data ){
					isInClosed = true;
					break;
				}
			}
			if( isInClosed ){
				continue;
			}

			// Compute the score for the state and add it to the open set
			var score = computeScore( nextState, goal, world );
			openSet.insert( new AStarNode(
				nextState,
				currentNode,
				currentNode.totalCost,
				score
			), currentNode.totalCost+score);
		}
		
	}

	return [];	
	
}

// Simple 1 dimensional test
// We start at 1 and want to reach 6 by only adding or subtracting 1
var getNextSatesAdd = function(current,world){
	return [
		current + 1,
		current - 1
	];
};
var scoreAdd = function( state, goal, world ){
	return goal - state;
};
console.info(
	aStar( 1, 6, {}, getNextSatesAdd, scoreAdd )
);


// Simple 1 dimensional test
// We start at 1 and want to reach 21 by only adding or subtracting 2 or 3
var getNextSatesAdd = function(current,world){
	return [
		current + 2,
		current + 3,
		current - 2,
		current - 3
	];
};
var scoreAdd = function( state, goal, world ){
	return Math.abs(goal - state);
};
console.info(
	aStar( 1, 21, {}, getNextSatesAdd, scoreAdd )
);

// Simple 1 dimensional test
// We start at 1 and want to reach 21 by only adding 3 or subtracting 2 
var getNextSatesAdd = function(current,world){
	return [
		current + 3,
		current - 2,
	];
};
var scoreAdd = function( state, goal, world ){
	return Math.abs(goal - state);
};
console.info(
	aStar( 1, 21, {}, getNextSatesAdd, scoreAdd )
);
