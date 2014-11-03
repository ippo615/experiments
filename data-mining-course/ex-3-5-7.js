/**
 * Exercise 3.5.7 : Find the edit distances (using only insertions
 * and deletions) between the following pairs of strings.
 * 
 * (a) abcdef and bdaefc.
 * (b) abccdabc and acbdcab.
 * (c) abcdef and baedfc.
 * 
 */

// The text suggests computing the LCS (longest common substring)
// and computing the edit distance as:
// a.length + b.length - 2*lcs(a,b)
// Instead I compute the edit distance directly:

function edit_distance(aString, bString, weights){

	var Al = aString.length;
	var Bl = bString.length;

	if(Al === 0){ return Bl; }
	if(Bl === 0){ return Al; }

	var dist = [];
	for(var a = 0; a<Al; a+=1){
		dist[a] = [];
		for(var b=0; b<Bl; b+=1){
			dist[a][b] = 0;
		}
	}
	for(var a=0; a<Al; a+=1){ dist[a][0] = a; }
	for(var b=0; b<Bl; b+=1){ dist[0][b] = b; }

	for(var b=1; b<Bl; b+=1){
		for(var a=1; a<Al; a+=1){
			if( aString.charAt(a) === bString.charAt(b) ){
				dist[a][b] = dist[a-1][b-1];
			}else{
				dist[a][b] = Math.min(
					dist[a-1][b  ] + weights[0], // deletion "xyz" -> "xy"
					dist[a  ][b-1] + weights[1], // insertion "xy" -> "xyz"
					dist[a-1][b-1] + weights[2]  // substitution "xya" -> "xyz"
				);
				// extra check for transposition "xyz" -> "xzy"
				// make sure we're inbounds
				if( a>1 && b>1 
				&& aString.charAt(a-1) === bString.charAt(b )
				&& aString.charAt(a  ) === bString.charAt(b-1) ){
					dist[a][b] = Math.min(dist[a][b],dist[a-2][b-2] + weights[3]);
				}
			}
		}
	}

	//the lower right corner is the distance we care about
	return dist[Al-1][Bl-1];
}

// To ignore a weight we set it to really high value
// the order of the weights is [del,ins,sub,switch]
console.info( edit_distance('abcdef','bdaefc',[1,1,9,9]) );   // 4
console.info( edit_distance('abccdabc','acbdcab',[1,1,9,9]) );// 5
console.info( edit_distance('abcdef','baedfc',[1,1,9,9]) );   // 6

// Use the worked examples to verify correct implementation
console.info( edit_distance('abcde','acfdeg',[1,1,9,9]) ); // 3, agrees
console.info( edit_distance('aba','bab',[1,1,9,9]) );      // 2, agrees
