/**
 * Exercise 1.2.2 : Suppose we have information about the supermarket pur-
 * chases of 100 million people. Each person goes to the supermarket 100 times
 * in a year and buys 10 of the 1000 items that the supermarket sells. We believe
 * that a pair of terrorists will buy exactly the same set of 10 items (perhaps the
 * ingredients for a bomb?) at some time during the year. If we search for pairs of
 * people who have bought the same set of items, would we expect that any such
 * people found were truly terrorists?
 * 
 */

var nPeople = 100e6;
var nVisits = 100;
var nBought = 10;
var nSold = 1000;
var nObservations = 365; // not explicit, assumed

var pShoppingTrip = nVisits / nObservations;
var nShoppingEvents = pShoppingTrip * nPeople;

var pItem = nBought / nSold;

console.info( pItem*pItem * nShoppingEvents );
console.info( nVisits * nPeople );

// Total events: 10000000000
//                      2740? suspected terrorists
