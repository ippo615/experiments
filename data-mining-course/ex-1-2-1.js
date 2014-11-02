/**
 * 
 * Exercise 1.2.1: Using the information from Section 1.2.3, what would
 * be the number of suspected pairs if the following changes were made
 * to the data (and all other numbers remained as they were in that
 * section)?
 * (a) The number of days of observation was raised to 2000.
 * (b) The number of people observed was raised to 2 billion (and
 * there were therefore 200,000 hotels).
 * (c) We only reported a pair as suspect if they were at the same
 * hotel at the same time on three different days
 * 
 */

var nDaysObserved = 1000;
var nPeople = 1000000000;
var nHotels = 100000;
var nDaysBetweenHotelVisits = 100;

var pGoToHotel = 1/nDaysBetweenHotelVisits;
var p2GoToHotel = pGoToHotel*pGoToHotel;
var pSameHotel = p2GoToHotel / nHotels;
var pSameHotelTwice = pSameHotel*pSameHotel;

// Approximates
var nPairsPeople = nPeople*nPeople / 2;
var nPairsDays = nDaysObserved*nDaysObserved / 2;

var nEvents = pSameHotelTwice * nPairsPeople*nPairsDays;
console.info( nEvents );
// answer = 250000

//
var nDaysObserved = 2000;
var nPeople = 2000000000;
var nHotels = 200000;
var nDaysBetweenHotelVisits = 100;
// answer = 100000

var pGoToHotel = 1/nDaysBetweenHotelVisits;
var p3GoToHotel = pGoToHotel*pGoToHotel*pGoToHotel;
var pSameHotel = p3GoToHotel / nHotels;
var pSameHotelTrice = pSameHotel*pSameHotel*pSameHotel;

// Bad? Approximations
var nPairsPeople = nPeople*nPeople*nPeople / 2;
var nPairsDays = nDaysObserved*nDaysObserved*nDaysObserved / 2;

var nEvents = pSameHotelTrice * nPairsPeople*nPairsDays;
console.info( nEvents );
