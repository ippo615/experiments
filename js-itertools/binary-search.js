function binary_search(min,max,tries,goal,calc){
	var val_in = (min+max) / 2;
	var val_out = 0;
	while( tries-- ){
		val_out = calc(val_in);
		if( val_out > goal ){
			max = val_in;
		}else{
			min = val_in;
		}
		val_in = (min+max) / 2;
	}
	return val_in;
}

function test_line(){
	console.info( "Tries , Error" );
	var bs_result;
	var line = function(x){
		return x;
	};
	for( var i=0; i<20; i+=2 ){
		bs_result = binary_search( 0, 100, i, 74, line );
		console.info( i+' , '+ (74-bs_result) );
	}
}

function test_square(){
	console.info( "Tries , Error" );
	var bs_result;
	var correct = 8.602325267042627;
	var action = function(x){
		return x*x;
	};
	for( var i=0; i<20; i+=2 ){
		bs_result = binary_search( 0, 100, i, 74, action );
		console.info( i+' , '+ (correct-bs_result) );
	}
}

function test_pow(){
	console.info( "Tries , Error" );
	var bs_result;
	var correct = 3.7598958028519647;
	var action = function(x){
		return Math.pow(Math.PI,x);
	};
	for( var i=0; i<20; i+=2 ){
		bs_result = binary_search( 0, 100, i, 74, action );
		console.info( i+' , '+ (correct-bs_result) );
	}
}

function test_cube(){
	console.info( "Tries , Error" );
	var bs_result;
	var correct = 4.198336453808407;
	var action = function(x){
		return x*x*x;
	};
	for( var i=0; i<20; i+=2 ){
		bs_result = binary_search( 0, 100, i, 74, action );
		console.info( i+' , '+ (correct-bs_result) );
	}
}

test_line();
test_square();
test_cube();
test_pow();