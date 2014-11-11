/**
 * Exercise 4.3.2 : Suppose we have n bits of memory available, and
 * our set S has m members. Instead of using k hash functions, we could
 * divide the n bits into k arrays, and hash once to each array. As a
 * function of n, m, and k, what is the probability of a false
 * positive? How does it compare with using k hash functions into a
 * single array?
 */

// I think this question is very poorly worded because it does not say
// how the k arrays will be used. How do choose which array to check?
// Do we pick randomly? Do we treat them all the same?

// Assuming we treat them all the same then its like we have an array
// of n/k bits instead of n bits:
// original: ((n-1)/n)^m     ~ exp(-km/n)
// k-arrays: ((n/k-1)/n/k)^m ~ exp(-m/(kn))
// False positives:
// original: 1-exp(-km/n)
// k-arrays: 1-exp(-m/(kn))
