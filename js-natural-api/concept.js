function Concept( base ){
	this.base = base;
	this.synonyms = [];
	this.antonyms = [];
	this.hypernyms = [];
	this.hyponyms = [];
	this.meronyms = [];
	this.holonyms = [];
	this.troponyms = [];
	this.coordinate_terms = [];
	this.relateds = [];
}

Concept.prototype.is_same_as = function( word ){
	this.synonyms.push( word );
};

function make_storage( obj, property, alias ){
	obj[property+'s'] = [];
	obj.__proto__['add_'+property] = function( word ){
		if( word instanceof Array ){
			this[property+'s'].push.apply( this[property+'s'], word );
		}else{
			this[property+'s'].push( word );
		}
		return this;
	};

	if( alias instanceof Array ){
		var _alias = alias;
	}else{
		var _alias = [alias];
	}
	var a, i, l=_alias.length;
	for( i=0; i<l; i+=1 ){
		a = _alias[i];
		obj.__proto__[a] = obj.__proto__['add_'+property];
	}
}

var c = {};
make_storage( c, 'synonym', 'is_same_as' );
make_storage( c, 'antonyn', 'is_opposite_of' );
make_storage( c, 'hyponym', ['is_a_generic_term_for','generalizes'] );
make_storage( c, 'hypernym', 'is_a' );
make_storage( c, 'meronym', 'is_made_of' );
make_storage( c, 'holonym', 'is_part_of' );
make_storage( c, 'troponym', 'is_a_manner_of' );

c.base = 'word';
c.is_same_as( 'word,lexeme'.split(',') );
c.is_a( 'term,sign,symbol'.split(',') );
c.generalizes( 'swearword,buzzword,noun,adjective,pronoun'.split(',') );



console.info( c );

