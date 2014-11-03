/**
 * Exercise 3.4.3 : Use the techniques explained in Section 1.3.5
 * to approximate the S-curve 1 - (1 - s^r)^b when s^r is very small.
 */

// Key points of 1.3.5:
//
// (1+a)^b ~~ exp(ab) when `a` is small.
// (1-a)^b ~~ exp(-ab) when `a` is small.
//
// So s-curve is approximately 1-exp( -(s^r)*b ) for small
// values of `s^r`

function s_curve_approx( s, r, b ){
	return 1 - Math.exp( -b*Math.pow( s, r ) );
}
