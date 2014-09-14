/** Number letter counts
 * If the numbers 1 to 5 are written out in words: one, two, three, four,
 * five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
 * 
 * If all the numbers from 1 to 1000 (one thousand) inclusive were
 * written out in words, how many letters would be used?
 * 
 * NOTE: Do not count spaces or hyphens. For example, 342 (three hundred
 * and forty-two) contains 23 letters and 115 (one hundred and fifteen)
 * contains 20 letters. The use of "and" when writing out numbers is in
 * compliance with British usage.
 */

function get_digit_word( n ){
	switch(n){
		case 1: return "one";
		case 2: return "two";
		case 3: return "three";
		case 4: return "four";
		case 5: return "five";
		case 6: return "six";
		case 7: return "seven";
		case 8: return "eight";
		case 9: return "nine";
		default: return "";
	}
}

function number_to_words(number){
	var thousands = Math.floor(number / 1000);
	var hundreds = Math.floor((number - (thousands*1000)) / 100);
	var tens = Math.floor( (number - (thousands*1000 + hundreds*100)) / 10 );
	var ones = Math.floor( (number - (thousands*1000 + hundreds*100 + tens*10)) );
	var phrase = "";
	if(thousands != 0){
		phrase += get_digit_word( thousands );
		phrase += " thousand "
	}
	if(hundreds != 0){
		phrase += get_digit_word( hundreds );
		phrase += " hundred "
	}
	var hasUpper = (thousands !== 0 || hundreds !== 0);
	var hasLower = (tens !== 0 || ones !== 0);
	var hasAnd = hasUpper && hasLower;
	if( hasAnd ){
		phrase += "and ";
	}
	if(tens == 1){
		switch(ones){
			case 0: phrase += "ten"; break;
			case 1: phrase += "eleven"; break;
			case 2: phrase += "twelve"; break;
			case 3: phrase += "thirteen"; break;
			case 4: phrase += "fourteen"; break;
			case 5: phrase += "fifteen"; break;
			case 6: phrase += "sixteen"; break;
			case 7: phrase += "seventeen"; break;
			case 8: phrase += "eighteen"; break;
			case 9: phrase += "nineteen"; break;
			default: break;
		}
	}else{
		switch(tens){
			case 2: phrase += "twenty-"; break;
			case 3: phrase += "thirty-"; break;
			case 4: phrase += "forty-"; break;
			case 5: phrase += "fifty-"; break;
			case 6: phrase += "sixty-"; break;
			case 7: phrase += "seventy-"; break;
			case 8: phrase += "eighty-"; break;
			case 9: phrase += "ninety-"; break;
			default: break;
		}
		phrase += get_digit_word( ones );
	}
	return phrase;
}

function count_letters( word ){
	var sum = 0;
	var i,c,nLetters=word.length;
	for( i=0; i<nLetters; i+=1 ){
		c = word.charAt(i);
		if( 'a' <= c && c <= 'z' ){
			sum += 1;
		}
	}
	return sum;
}

console.info( number_to_words(342) );
console.info( count_letters( number_to_words(342) ) );

console.info( number_to_words(115) );
console.info( count_letters( number_to_words(115) ) );

function solve( lowerLimit, upperLimit ){

	var phrases = [];
	for( var i=lowerLimit; i<=upperLimit; i+=1 ){
		phrases.push( number_to_words(i) );
	}
	
	var sum = 0;
	var nPhrases = phrases.length;
	for( var i=0; i<nPhrases; i+=1 ){
		sum += count_letters( phrases[i] );
	}

	return sum;
}

console.info( ' -- Solving -- ' );
console.info( solve( 1, 5 ) );
console.info( solve( 1, 1000 ) );

/** 21124
 * Congratulations, the answer you gave to problem 17 is correct.
 * 
 * You are the 76542nd person to have solved this problem.
 */
