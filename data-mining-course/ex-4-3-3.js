/**
 * Exercise 4.3.3 : As a function of n, the number of bits and m the
 * number of members in the set S, what number of hash functions
 * minimizes the false-positive rate?
 */

//                      (1-exp(-km/n))^k
// False positive rate: Math.pow(1-Math.exp(-km/n),k)

// I cheated a bit on this one by runng ex-4-3-1 for all k from 1 to 99.
// The minimum was k=6 (and m=8 billion bits, n=1 billion)
// So my guess is k = log( m ) - log( n ) - 1
// Probably should go back and do some more guessing.

// NOT DONE
