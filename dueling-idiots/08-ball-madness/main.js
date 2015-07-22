
var Ball = (function(){
	function Ball( color ){
		this.color = color;
	}
	return Ball;
})();

var Urn = (function( Ball ){
	function Urn( color, nBalls ){
		this.balls = [];
		for( var i=0; i<nBalls; i+=1 ){
			this.balls.push( new Ball( color ) );
		}
	}
	Urn.prototype.remove = function( index ){
		return this.balls.splice( index, 1 )[0];
	};
	Urn.prototype.insert = function( ball ){
		this.balls.push( ball );
	};
	Urn.prototype.getBallDistribution = function(){
		var colors = {};
		for( var i=0, l=this.balls.length; i<l; i+=1 ){
			var ball = this.balls[i];
			if( colors.hasOwnProperty(ball.color) ){
				colors[ ball.color ] += 1;
			}else{
				colors[ ball.color ] = 1;
			}
		}
		return colors;
	};
	return Urn;
})(Ball);

var blackUrn = new Urn( 'black', 50 );
var whiteUrn = new Urn( 'white', 50 );
for( var i=0; i<100; i+=1 ){
	var r = Math.floor( Math.random()*blackUrn.balls.length );
	var bBall = blackUrn.remove( r );
	var r = Math.floor( Math.random()*whiteUrn.balls.length );
	var wBall = whiteUrn.remove( r );
	blackUrn.insert( wBall );
	whiteUrn.insert( bBall );
	console.info( '\nT = '+i );
	console.info( blackUrn.getBallDistribution() );
	console.info( whiteUrn.getBallDistribution() );
}

// --------------------------------------------------------------------

// Probability of repeating on 1st draw: 0
// 2nd draw: 1/n
// 3rd draw: miss on 2nd then match; (n-1)/n * 2/n
// 4th draw: miss on 2,3 then match: (n-2)/n * (n-1)/n * 3/n
function pRepeatBefore( trial, nTotal ){
	var p = trial / nTotal;
	for( var i=0; i<trial; i+=1 ){
		p *= (nTotal - i) / nTotal;
	}
	return p;
}

// find the average number of draws before a ball is drawn again
// that's the sum from n = 0 to nTotal of n*pRepear
function expectedDraws( n ){
	var avg = 0;
	for( var i=0; i<n; i+=1 ){
		avg += i * pRepeatBefore( i, n );
	}
	return avg;
}

console.info( expectedDraws( 10 ) );
console.info( expectedDraws( 100 ) );
console.info( expectedDraws( 1000 ) );
console.info( expectedDraws( 10000 ) );
console.info( expectedDraws( 100000 ) );

