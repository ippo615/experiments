/**
 * Exercise 3.9.2 : Suppose we filter candidate pairs based only on
 * length, as in Section 3.9.3. If s is a string of length 20, with
 * what strings is s compared when J, the lower bound on Jaccard
 * similarity has the following values: (a) J = 0.85 (b) J = 0.95
 * (c) J = 0.98?
 */

// Recall Jaccard similarity is the number of elements in the
// intersection of the sets per elements in the union of the sets or:
// J = intersetion/union
//
// Assuming equal strings of length 20: J = 20/20
// 1 difference (same length): J = 19 / 21
// 2 difference (same length): J = 18 / 22
//
// We only care about the best cases (ie everything possible matches).
// Assume the other string is longer and that 20 values match then the
// union is the length of the longer string. 
// J = 20 / L -> L = 20 / J
//
// The other case is that the other string is shorter. In this case the
// union must be 20 and the intersection is less (assume it to be the
// length of the shorter string) yielding:
// J = L / 20 -> L = 20 * J
//
// For those 2 cases and the question we can compute the following table:
//
// q    J     Shortest      Longest
// a  0.85  20*0.85 = 17  20/0.85 = 24
// b  0.95  20*0.95 = 19  20/0.95 = 22
// c  0.98  20*0.98 = 20  20/0.98 = 21
//
