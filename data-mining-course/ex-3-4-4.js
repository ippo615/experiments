/**
 * Exercise 3.4.4 : Suppose we wish to implement LSH by MapReduce.
 * Specifically, assume chunks of the signature matrix consist of
 * columns, and elements are key-value pairs where the key is the
 * column number and the value is the signature itself (i.e., a
 * vector of values).
 * 
 * (a) Show how to produce the buckets for all the bands as output
 *     of a single MapReduce process. Hint : Remember that a Map
 *     function can produce several key-value pairs from a single
 *     element.
 * 
 * (b) Show how another MapReduce process can convert the output 
 *     of (a) to a list of pairs that need to be compared.
 *     Specifically, for each column i, there should be a list of
 *     those columns j > i with which i needs to be compared.
 */

// NOT DONE
