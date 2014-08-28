
var s1 = new Set();
s1.addMember(1)
  .addMember(1)
  .addMember(2)
  .addMember(3);

console.info( s1 );

console.info( s1.contains(2) );
console.info( s1.remove( 2 ) );
console.info( s1.contains(2) );

// Equality
var a = new Set();
a.addMember(1).addMember(2).addMember(3);
var b = new Set();
b.addMember(1).addMember(2).addMember(3);
console.info( Set.isEqual(a,b) );
console.info( a.equals(b) );
console.info( b.equals(a) );

// Union Test
var a = new Set();
a.addMember(1).addMember(2).addMember(3);
var b = new Set();
b.addMember(3).addMember(4).addMember(5);
console.info( Set.union(a,b) );

// Intersection
var a = new Set();
a.addMember(1).addMember(2).addMember(3);
var b = new Set();
b.addMember(3).addMember(4).addMember(5);
console.info( Set.intersection(a,b) );

// Difference
var a = new Set();
a.addMember(1).addMember(2).addMember(3);
var b = new Set();
b.addMember(3).addMember(4).addMember(5);
console.info( Set.difference(a,b) );
console.info( Set.difference(b,a) );

// Symmetric difference
var a = new Set();
a.addMember(1).addMember(2).addMember(3);
var b = new Set();
b.addMember(3).addMember(4).addMember(5);
console.info( Set.symmetricDifference(a,b) );

