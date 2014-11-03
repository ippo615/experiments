/**
 * Exercise 3.3.6 : One might expect that we could estimate the
 * Jaccard similarity of columns without using all possible
 * permutations of rows. For example, we could only allow cyclic
 * permutations; i.e., start at a randomly chosen row r, which becomes
 * the first in the order, followed by rows r + 1, r + 2, and so on,
 * down to the last row, and then continuing with the first row, second
 * row, and so on, down to row r - 1. There are only n such
 * permutations if there are n rows. However, these permutations
 * are not sufficient to estimate the Jaccard similarity correctly.
 * Give an example of a two-column matrix where averaging over all the
 * cyclic permutations does not give the Jaccard similarity.
 */


