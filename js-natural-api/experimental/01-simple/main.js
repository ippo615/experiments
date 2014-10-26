function generate_index( text ){
	var index = {};
	var regexp = /\b\w+\b/gi;
	var next = regexp.exec( text );
	while( next !== null ){
		// console.info( next );
		var word = next[0].toLowerCase();
		if( ! index.hasOwnProperty( word ) ){
			index[word] = [];
		}
		index[word].push( next.index );
		next = regexp.exec( text );
	}

	var clause_start = [0];
	var regexp = /[.?!]/gi;
	var next = regexp.exec( text );
	while( next !== null ){
		clause_start.push( next.index );
		next = regexp.exec( text );
	}

	return {
		words: index,
		clauses: clause_start
	};
}

var prepositions = "a,abaft,abeam,aboard,about,above,absent,across,afore,after,against,along,alongside,amid,amidst,among,amongst,an,anenst,apropos,apud,around,as,aside,astride,at,athwart,atop,barring,before,behind,below,beneath,beside,besides,between,beyond,but,by,circa,concerning,despite,down,during,except,excluding,failing,following,for,forenenst,from,given,in,including,inside,into,like,mid,midst,minus,modulo,near,next,notwithstanding,of,off,on,onto,opposite,out,outside,over,pace,past,per,plus,pro,qua,regarding,round,sans,save,since,than,through,thru,throughout,thruout,till,times,to,toward,towards,under,underneath,unlike,until,unto,up,upon,versus,via,vice,vis-a-vis,with,within,without,worth".split(',');
var questions = "who,what,when,where,why,how".split(',');
var pronouns = "i,we,you,he,she,it,they,me,us,him,her,them,these,those,that".split(',');
var articles = "the,a,an".split(',');
var being = "is,am,are".split(',');
var uninformative_words = [];
uninformative_words.push.apply(uninformative_words,prepositions);
uninformative_words.push.apply(uninformative_words,questions);
uninformative_words.push.apply(uninformative_words,pronouns);
uninformative_words.push.apply(uninformative_words,articles);
uninformative_words.push.apply(uninformative_words,being);

console.info(
	generate_index( 'The cat ran down the street. My cat is named fluffy. He eats flowers. John has a cat.' )
);

function rank_text( input, query ){
	var sentences = input.split( /[.?!]/gi );
	var important_words = query.replace(
		new RegExp( '\\b(?:'+uninformative_words.join('|')+')\\b', 'gi' ),
		''
	).replace(/\s+/g,' ').replace(/[.,?!]/g,'').split(' ');

	var w,nWords = important_words.length;

	var words = [];
	for( w=0; w<nWords; w+=1 ){
		words.push( new RegExp( important_words[w], 'i' ) );
	}

	var s,nSentences = sentences.length;
	var ranks = [];
	for( s=0; s<nSentences; s+=1 ){
		var score = 0;
		for( w=0; w<nWords; w+=1 ){
			//if( sentences[ s ].indexOf( important_words[w] ) > -1 ){
			if( sentences[ s ].match( words[w] ) ){
				score += 1;
			}
		}
		ranks.push( {
			score: score,
			text: sentences[s]
		} );
	}

	// rank by descending score (ie highest score at index 0)
	ranks.sort( function( a, b ){
		return b.score - a.score;
	});

	return {
		question: query,
		results: ranks
	};
}

// 3 words types
// trivial word:
//     no value is gained by matching these words (ie a, the, of)
//     many of these words are prepositions
//     they change neither the match score nor the uncertainity
// ambiguous word:
//     may or may not match, the mathing can only be determined by context
//     and understanding of the actual statment (ie he, she, this, that it)
//     they don't change the match score, but increase the uncertainty
// match word:
//     an exact match
//     increases the match score 

// Every sentence gets a score based on it's comparision to the question
// The score is made of:
// matchness - 
// uncertainity - amount by which the matchness may vary based



var paragraph = 'The cat ran down the street. My cat is named fluffy. He eats flowers. John has a cat.';

console.info( rank_text(paragraph, 'What is the cat named?') );
console.info( rank_text(paragraph, 'Where did the cat run?') );
console.info( rank_text(paragraph, 'What does John eat?') );
console.info( rank_text(paragraph, 'What does the cat eat?') );


