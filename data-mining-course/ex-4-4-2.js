/**
 * Exercise 4.4.2 : Do you see any problems with the choice of hash
 * functions in Exercise 4.4.1? What advice could you give someone
 * who was going to use a hash function of the form
 * h(x) = ax + b mod 2^k ?
 */

// Don't be dumb. Hash functions should be mod (a prime number). By
// using a prime number, there is a better distribution of results.
// Perhaps a and b could be selected in such a way to help the
// distribution (I'll have to investigate that by plotting the
// resulting distributions for varying a,b,k).

// I'd seriously confused by this. The hash function that I thought
// was WORST gave the most accurate estimate of the number of unique
// elements (c). The hashes that seemed better (a,b) gave horrible
// estimates of the number of unique elements.

// NOT DONE
