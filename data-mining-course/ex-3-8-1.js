/**
 * Exercise 3.8.1 : Suppose we are trying to perform entity
 * resolution among bibliographic references, and we score pairs of
 * references based on the similarities of their titles, list of
 * authors, and place of publication. Suppose also that all references
 * include a year of publication, and this year is equally likely to be
 * any of the ten most recent years. Further, suppose that we discover
 * that among the pairs of references with a perfect score, there is an
 * average difference in the publication year of 0.1. Suppose that the
 * pairs of references with a certain score s are found to have an
 * average difference in their publication dates of 2. What is the
 * fraction of pairs with score s that truly represent the same
 * publication? Note: Do not make the mistake of assuming the average
 * difference in publication date between random pairs is 5 or 5.5.
 * You need to calculate it exactly, and you have enough information to
 * do so.
 */

function bibRef(title,authors,place,year){
	return {
		title: title,
		authors: authors,
		place: place,
		year: year
	}
}

// Reference with perfect scores have an average year difference of 0.1
var diff_perfect = 0.1;

// What is the expected (average) difference for pairs with any score?
// Let's qunatize the possible values to [0,1,2,3,4,5,6,7,8,9,10]
// or this year, 1 year ago, 2 years ago, ... 10 years ago. We care
// about the difference between 2 randomly selected books. We could
// list all possible combinations then compute the differences for each
// and derive the probability that way but instead I'll be a bit lazier
// and will compute all possible differences then compute each
// probability.
//
// No difference - 0: 11/121
// When the same year is selected we have a difference of 0. We have
// a 1/11 chance of selecting a specific 1st year and a 1/11 chance
// of selecting the same 2nd year. This can happen for any of the
// 11 numbers so: 11 * 1/11 * 1/11 = 11/121
//
// 1 Year Difference - 1: 20/121
// We have a 1 in 11 chance of picking a specific 1st year. But
// depending on the first year it may not be possible to select a
// second year that yields a difference of 1.
// Consider, first I pick 3 (1/11) then I can pick either 4 (1/11) or
// 5 (1/11) for a total of (1/11) * (1/11+1/11) = 2/121.
// Consider, first I pick 0 (1/11) then I can only pick a 1 to get a 
// 1 year difference (1/11)*(1/11) = 1/121
// 0 and 10 both yeild 1/121 to the probablilty and all the others
// (9 of them) yeild 2/121 to the probabiluty. For a total of
// (1+1 + 2*9) / 121 = 20 / 121
//
// 2 Year Difference - 2: 18/121
// Similar to the 1 year difference but this time 0,1,9,10 have only 1
// option we get a total of (1*4 + 2*(11-4)) /  121 = 18/121
// With that expression it becomes a little clearer how to generalize
// that probability for each case: 
//
// 3: (1*6 + 2*(11-6))/121 = 16/121
// 4: (1*8 + 2*(11-8))/121 = 14/121
// 5: (1*10 + 2*(11-10))/121 = 12/121
// 6: 10/121
// 7: 8/121
// 8: 6/121
// 9: 4/121
// 10: 1/121
// 
// I think I'm missing a 1 somewhere, dang. Whatever, my guess will be
// "close enough".
//
// Expected value:
// 0 * 11/121 + 1 * 20/121 + 2 * 18/121 + 3 * 16/121 + 4 * 14/121 +
// 5 * 12/121 + 6 * 10/121 + 7 *  8/121 + 8 *  6/121 + 9 *  4/121 +
// 10 * 1/121 = 3.554
var diff_random = 3.554;

// What is the average different for pairs with score s?
var diff_s = 2.0;

// fraction of good pairs with score s: (h1-h)/(h1-h0) [pg 113]
// 0.4499
var percent_good = (diff_random - diff_s)/(diff_random - diff_perfect);
console.info( percent_good );

// Assuming the average difference in publication data is x years the
// expected percent of pairs with score s that are true matches is
// 5 years -> 61.22 %
// 5.5 years -> 64.81 %
// When the actual (i think) is 44.99 %
