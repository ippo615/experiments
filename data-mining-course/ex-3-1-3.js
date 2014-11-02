/**
 * Exercise 3.1.3 : Suppose we have a universal set U of n elements,
 * and we choose two subsets S and T at random, each with m of the
 * n elements. What is the expected value of the Jaccard similarity
 * of S and T ?
 */

/**
 * We have 2 sets of m elements selected from a set of n elements.
 * We pick an element for S at random. What is the probabliy we pick
 * that same element for T at random? 1/m. 
 * We pick the next element for S at random. What is the probabliy
 * we pick that same element for T at random? This time we have fewer 
 * elements to pick from (since we picked on already) so 1/(m-1).
 * This continues n times.
 * The probability of picking identical sets is ...
 * WAIT! I think that's wrong... lemme try again
 */

/**
 * Let's assume m = n, the Jaccard similarity should be 1 because
 * each set HAS to have the same elements.
 * 
 * Let's assume m = n-1. Then we would expect one of 2 conditions:
 * 
 *   - S == T
 *   - S != T
 * 
 * Looking at the case where S==T the Jaccard similarity is 1.
 * Looking at the case where S!=T the number of elements in 
 * union(S,T) is m and the number of elements in intersect(S,T)
 * is n-1.
 * So the Jaccard similarity is n-1 / m.
 * 
 * There are 2 outcomes so the probability of either event is 0.5.
 * The expected Jaccard similarity is therfore:
 *     
 *     0.5 * 1 + 0.5 * (n-1)/m
 *     0.5 * (1 + (n-1)/m)
 *     0.5 * ( m/m + (n-1)/m )
 *     0.5 * (m+n-1)/m 
 *     (m+n-1) / (2*m)
 *     (m+n-2+1) / (2*m)
 * 
 * How about for m = n-2. There are still 2 outcomes but they have
 * different probabilities:
 * 
 *     J = 1       -> Probability = 1/3
 *     J = n-1 / m -> Probability = 1/3
 *     J = n-2 / m -> Probability = 1/3
 * 
 * So the expected similarity is:
 * 
 *    (1/3) * ( 1 + (n-1+n-2)/m )
 *    (1/3) * ( 1 + (2n - 3)/m )
 *    (1/3) * ( 1 + ((3-1)*n - 3)/m )
 * 
 * That was for m = n - 2. Let's try to rearrage that and get a 3:
 * 
 *    m = n - 2
 *    2 = m - n
 *    2+1 = m-n+1
 *    3 = m-n+1
 * 
 * Therefore, I think the expected value is:
 *
 *    (1/(m-n+1)) * ( 1 + ((m-n+1-1)*n - (m-n+1))/m )
 *    (1/(m-n+1)) * ( 1 + ((m-n)*n - (m-n+1))/m )
 * 
 *      1      (m-n)*n - (m-n+1) 
 *    ----- + -------------------
 *    m-n+1       (m-n+1) * m
 *
 *      1      (m-n)*n        (m-n+1) 
 *    ----- + ----------- - -----------
 *    m-n+1   (m-n+1) * m   (m-n+1) * m
 *
 *      1     (m-n+1-1)*n    1
 *    ----- + ----------- - ---
 *    m-n+1   (m-n+1) * m    m
 *
 *      1     n*(m-n+1)       n        1
 *    ----- + --------- - --------- - ---
 *    m-n+1   (m-n+1)*m   (m-n+1)*m    m
 * 
 *      1     n       n        1
 *    ----- + - - --------- - ---
 *    m-n+1   m   (m-n+1)*m    m
 * 
 *      1         n        1     n
 *    ----- - --------- - --- + ---
 *    m-n+1   (m-n+1)*m    m     m
 *
 *        m-n        1+n
 *    ----------- - -----
 *     (m-n+1)*m      m
 *
 */
