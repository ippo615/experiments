var Vector = require('../src/vector.js').Vector;
var assert = require('assert');

describe( 'Vector', function(){
        it('should have x,y properties',function(){
                var a = new Vector(5,2);
                assert( a.x === 5 );
                assert( a.y === 2 );
        });
        it('should be created with the new keyword');
        it('should be created without the new keyword');
        describe( '.add', function(){
                it('should edit the vector in place',function(){
                        var a = new Vector(1,2);
                        var b = new Vector(0,3);
                        a.add( b );
                        assert( a.x === 1 );
                        assert( a.y === 5 );
                });
                it('should not affect the argument',function(){
                        var a = new Vector(1,2);
                        var b = new Vector(0,3);
                        a.add(b);
                        assert( b.x === 0 );
                        assert( b.y === 3 );
                });
        });
});
