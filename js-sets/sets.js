# Sets

Set theory is an important part of mathemathics. It deals with the
relationship between an object and a set. An object can be a member or
an element of a set.

	function Set(config){
		this._members = [] || config.members;
		this._rangeMin = -Infinity;
		this._rangeMax = -Infinity;
		this._allowRepeats = false;
	}

I need an `assert` function for the embedded unit tests. I here is a simple
definition:

	function assert( isTrue, errorText ){
		if( ! isTrue ){
			throw new Error(errorText || '');
		}
	}

## Example

You can create a set easily:

	var a = new Set();

Raising an error for completeness sake:

	throw new Error( "Ha ha" );

