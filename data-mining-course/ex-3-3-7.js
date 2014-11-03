/**
 * Exercise 3.3.7 : Suppose we want to use a MapReduce framework to
 * compute minhash signatures. If the matrix is stored in chunks that
 * correspond to some columns, then it is quite easy to exploit
 * parallelism. Each Map task gets some of the columns and all the hash
 * functions, and computes the minhash signatures of its given columns.
 * However, suppose the matrix were chunked by rows, so that a Map task
 * is given the hash functions and a set of rows to work on. Design Map
 * and Reduce functions to exploit MapReduce with data in this form.
 */


