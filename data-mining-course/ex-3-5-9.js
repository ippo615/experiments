/**
 * Exercise 3.5.9 : Prove that the edit distance discussed in Exercise
 * 3.5.8 is indeed a distance measure.
 *
 */

// In addition to insertion and deletion we consider:
// 
// i. Mutation, where one symbol is replaced by another symbol. Note
//    that a mutation can always be performed by an insertion followed
//    by a deletion, but if we allow mutations, then this change counts
//    for only 1, not 2, when computing the edit distance.
// 
// ii. Transposition, where two adjacent symbols have their positions
//     swapped. Like a mutation, we can simulate a transposition by
//     one insertion followed by one deletion, but here we count only
//     1 for these two steps.
// 

// There are 4 axioms that must be satisfied:
//
// 1. d(x, y) >= 0 (no negative distances).
//
//    This is true because we start at 0 and cannot perform
//    any subtractions; therefore, the distance must be greater
//    than or equal to 0.
//
// 2. d(x, y) = 0 if and only if x = y (distances are positive,
//    except for the distance from a point to itself).
//
//    This is true by the definition of the function.
//
// 3. d(x, y) = d(y, x) (distance is symmetric).
//
//    Insertions can become deletions and vice versa. Since mutations
//    can be seen as an insertion followed by a deletion we can
//    consider a revesred mutation as a deletion followed by an
//    insertion. The same argument applies for transpositions.
//    
// 4. d(x, y) <= d(x, z) + d(z, y) (the triangle inequality).
//
//    Consider transforming 'abcd' to 'aedc'. That can be accomplished
//    in 2 steps: mutate 'b' to 'e' ('abcd' -> 'aecd'), swap 'c' and
//    'd' ('aecd' -> 'aedc'). 'aecd' is an intermediate step. 
//    Moving from 'abcd' to 'aecd' to 'aedc' is made of 2 steps with
//    a distance of 1 each for a total distance of 2. Moving from 'abcd'
//    to 'aedc' has a distance of 2.
//
