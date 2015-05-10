// ---------------------------------------------------------------------
// Imagine n switches in series to form a row
// Imagine n rows in parallel to form a sheet of n^2 switches
// Imagine n sheets in series to form a cube of n^3 switches
//
// Each of the n switches is either closed (with probability p) or open
// with probability (1-p).
// 
// What is the probability that the lamp connected to this will turn
// on.
// ---------------------------------------------------------------------

// For the first row to turn on we need ALL of the switches to turn on
// the probability of this happening is p^n.

// For a sheet to turn on we need any of the rows to be on. I can't 
// combine those with 'any' so how will it not be on? When ALL of the
// rows are off which is (1-p)^n but we want to know when it will be 
// on, not off. So the probability of it being on is 1-p(off) or 
// 1-(1-p)^n.

// For the cube to turn on we need ALL of the sheets to be on, the
// probability of this happening is p^n.

// We need all of those conditions to hold so:
// p(on) = (p^n)*(1-(1-p)^n)*(p^n)

// Is that the correct way or do I need to feed the probabilty from 1
// stage into the next? Then I would get a nested expression:
// pRow = pOn^n
// pSheet = (1-(1-pRow)^n)
// pCube = pSheet ^ n = (1-(1-pRow)^n)^n = (1-(1-pOn^n)^n)^n

function pLampOnSibling( rowSize, sheetSize, cubeSize, pOn ){
	var rowOn = Math.pow(pOn,rowSize);
	var sheetOn = 1-Math.pow(1-pOn,rowSize);
	var cubeOn = Math.pow(pOn,cubeSize);
	return rowOn*sheetOn*cubeOn;
}

function pLampOnNested( rowSize, sheetSize, cubeSize, pOn ){
	var pRowOn = Math.pow(pOn,rowSize);
	var pSheetOn = 1-Math.pow(1-pRowOn,rowSize);
	var pCubeOn = Math.pow(pSheetOn,cubeSize);
	return pCubeOn;
}

for( var i=0; i<100; i+=10 ){
	console.info( '\nTesting (series,parallel,series): ('+i+','+i+','+i+')' );
	console.info( pLampOnSibling( i, i, i, 0.5 ) );
	console.info( pLampOnNested( i, i, i, 0.5 ) );
}

// Checking the solution: THE NESTED ONE IS CORRECT
var pLampOn1 = pLampOnNested;

// 2nd Part what happens if the sheets are connected in parallel
// instead of series?
// pRow = pOn^n
// pSheet = (1-(1-pRow)^n)
// pCube = (1-(1-pSheet)^n)
//       = (1-(1-(1-(1-pRow)^n))^n)
//       = (1-(1-(1-(1-pOn^n)^n))^n)
// 

function pLampOn2( rowSize, sheetSize, cubeSize, pOn ){
	var pRowOn = Math.pow(pOn,rowSize);
	var pSheetOn = 1-Math.pow(1-pRowOn,rowSize);
	var pCubeOn = 1-Math.pow(1-pSheetOn,cubeSize);
	return pCubeOn;
}

for( var i=0; i<10; i+=1 ){
	console.info( '' );
	console.info( 'Series Sheets  : '+ pLampOn1( i, i, i, 0.5 ) );
	console.info( 'Parallel Sheets: '+ pLampOn2( i, i, i, 0.5 ) );
}

// Imagine you have 3 series connected modules of parallel connected
// switches there are inifinite switches in parallel.
//
// At t=0, all switches are open.
// Every microsecond, 1 of 2 events occurs:
//  97% - nothing
//   3% - exactly 1 switch closes
//
// Plot the probability of the blub's glowing as a function of time.

function simulate1( pNone, pClose, nSwitches, nModules ){
	// We'll do this by printing when a switch closes
	var done = 
}

console.info( pLampOnNested( 3, 3, 3, 0.5 ) );
