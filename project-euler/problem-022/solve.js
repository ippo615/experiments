/** Names scores
 *
 * Using names.txt (right click and 'Save Link/Target As...'), a
 * 46K text file containing over five-thousand first names, begin
 * by sorting it into alphabetical order. Then working out the
 * alphabetical value for each name, multiply this value by its
 * alphabetical position in the list to obtain a name score.
 * 
 * For example, when the list is sorted into alphabetical order,
 * COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th
 * name in the list. So, COLIN would obtain a score of
 * 938 × 53 = 49714.
 * 
 * What is the total of all the name scores in the file?
 * 
 */

function alphabetical_value( letters ){
	var value = 0;
	var i, nLetters = letters.length;
	var asciiOffset = 64; // 'A' is 65
	for( i=0; i<nLetters; i+=1 ){
		value += letters.charCodeAt(i)-asciiOffset;
		//console.info( i+': '+ letters.charCodeAt(i)+' - '+(letters.charCodeAt(i)-asciiOffset) );
	}
	return value;
}

function handle_file( contents ){
	// The names are on a single line and separated by commas
	// Each name is also quoted: ie "ADAM","JOHN",...
	// let's convert it to an array
	var names = contents.replace(/"/g,'').split(',');

	// Sort alphabetically
	var sortedNames = names.sort();

	// Compute the scores
	var totalScore = 0;
	var alphaScore = 0;
	var i, nNames = sortedNames.length;
	for( i=0; i<nNames; i+=1 ){
		alphaScore = alphabetical_value( sortedNames[i] );
		totalScore += (i+1)*alphaScore;
	}

	return totalScore;
}

// nodeJs only stuff

fs = require('fs');
fs.readFile('names.txt', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	console.info( handle_file( data ) );
});

/** 871198282
 * Congratulations, the answer you gave to problem 22 is correct.
 * 
 * You are the 69877th person to have solved this problem.
 */
