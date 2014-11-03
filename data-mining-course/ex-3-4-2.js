/**
 * Exercise 3.4.2 : For each of the (r, b) pairs in Exercise 3.4.1,
 * compute the threshold, that is, the value of s for which the value
 * of 1-(1-s**r)**b is exactly 1/2.
 * 
 * How does this value compare with the estimate of (1/b)**1/r that
 * was suggested in Section 3.4.2?
 * 
 *     r = 3 and b = 10
 *     r = 6 and b = 20
 *     r = 5 and b = 50
 */

/**
 * We'll solve the general case of `y = 1-(1-s**r)**b` then use y = 1/2
 * 
 *     y = 1-(1-s^r)^b
 *     y + (1-s^r)^b = 1
 *     (1-s^r)^b = 1-y
 *     ((1-s^r)^b)^(1/b) = (1-y)^(1/b)
 *     (1-s^r) = (1-y)^(1/b)
 *     1-s^r = (1-y)^(1/b)
 *     1 = (1-y)^(1/b) + s^r
 *     1 - (1-y)^(1/b) = s^r
 *     (1 - (1-y)^(1/b))^(1/r) = (s^r)^(1/r)
 *     (1 - (1-y)^(1/b))^(1/r) = s
 *     s = (1 - (1-y)^(1/b))^(1/r)
 * 
 */

function s_curve_inv( y, r, b ){
	return Math.pow( 1 - Math.pow( 1-y, 1/b ) , 1/r );
}
function s_curve_est_half( r, b ){
	return Math.pow( 1/b , 1/r );
}
function s_curve( s, r, b ){
	return 1 - Math.pow( 1- Math.pow(s,r), b );
}

console.info(
	'Actual: ' + s_curve_inv( 0.5, 3, 10 ) +
	'; Estimate: '+ s_curve_est_half( 3, 10 )
);
console.info(
	'Actual: ' + s_curve_inv( 0.5, 6, 20 ) +
	'; Estimate: '+ s_curve_est_half( 6, 20 )
);
console.info(
	'Actual: ' + s_curve_inv( 0.5, 5, 50 ) +
	'; Estimate: '+ s_curve_est_half( 5, 50 )
);

// Actual: 0.4060881340677083; Estimate: 0.4641588833612779
// Actual: 0.5693533868256982; Estimate: 0.6069622310029172
// Actual: 0.4243944803687326; Estimate: 0.45730505192732634
// The estimate (in these examples) is within 0.06 of the actual.
