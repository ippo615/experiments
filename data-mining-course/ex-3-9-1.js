/**
 * Exercise 3.9.1 : Suppose our universal set is the lower-case
 * letters, and the order of elements is taken to be the vowels,
 * in alphabetic order, followed by the consonants in reverse
 * alphabetic order. Represent the following sets as strings.
 * 
 * (a) {q, w, e, r, t, y}.
 * (b) {a, s, d, f, g, h, j, u, i}.
 */

function setify( bucket, universal ){
	var result = [];
	for( var i=0,l=universal.length; i<l; i+=1 ){
		if( bucket.indexOf( universal[i] ) > -1 ){
			result.push( universal[i] );
		}
	}
	return result;
}

// Note, the alphabet: abcdefghijklmnopqrstuvwxyz
var universal = 'aeiouzyxwvtsrqpnmlkjhgfdcb'.split('');
console.info( setify( 'qwerty'.split(''), universal ).join('') );
console.info( setify( 'asdfghjui'.split(''), universal ).join('') );

// eywtrq
// aiusjhgfd
