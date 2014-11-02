/**
 * Exercise 3.2.3 : What is the largest number of k-shingles a document
 * of n bytes can have? You may assume that the size of the alphabet is
 * large enough that the number of possible strings of length k is at
 * least as n.
 */

/**
 * If we assume this uses bags instead of sets. Then we can make a
 * k-shingle for all characters have at least `k` characters after them.
 * In this case there are a total of `n` characters so `n-k` characters
 * fit that  condition. That means there can be at most `n-k` k-shingles
 * in that text.
 */
