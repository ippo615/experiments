/**
 * Exercise 3.5.3: Prove that if i and j are any positive integers,
 * and i < j, then the Li norm between any two points is greater than
 * the Lj norm between those same two points.
 */

// This is more of an explanation than a rigorous proof.
// Consider the L1 norm (Manhattan Distance) between points
// `a` and `b` in a 2 dimenstional space. It looks like:
//
//        b
//        | y
//        |
//    a---+
//      x
// 
// The L2 norm looks like:
//
//       b
//      /
//     /
//    a
// 
// That means the L1 norm looks like an L2 norm with an extra point.
// Which makes me think that L1(x,y) = L2(x,z)+L2(z,y)
// Since the L-norm is a distance measure it obeys the triangle inequality
// aka d(x, y) <= d(x, z) + d(z, y) (which is what just wrote above).
//
// Therefore, let us assume that an L_i norm can be written as the sum
// of L_i+1 norms. For easy notation I'll use i=1 and i+1=2.
//
// The L_r norm is:
//
//     sum_i( Math.pow( Math.abs( p1[i] - p2[i] ), r ) ^ 1/r;
// 
// For r=1 in a 2D space:
//
//     L1 = (abs( a[0] - b[0] ) ^ 1 + abs( a[1] - b[1] ) ^ 1 ) ^ 1/1
//     L1 = abs(a[0]-b[0]) + abs(a[1]-b[1])
// 
// And for r=2 in a 2D space:
//
//     L2 = (abs( a[0] - b[0] ) ^ 2 + abs( a[1] - b[1] ) ^ 2 ) ^ 1/2
//
// But I claimed you could rewrite L1(a,b) as L2(a,c)+L2(c,b), so let's
// try it:
//
// L1 = (abs(a[0]-c[0])^2 + abs(a[1]-c[1])^2)^/1/2
//     +(abs(b[0]-c[0])^2 + abs(b[1]-c[1])^2)^/1/2
// 
// `c` is not an arbitrary point. I hinted about it's nature in the above
// diagram. `c` is made from `a` and `b`. In fact, c is `[a[0],b[1]]`.
// More clearly: `c[0]=a[0]` and `c[1]=b[1]`. Let's replace `c[0]` and 
// `c[1]` in my expression for L1:
//
// L1 = (abs(a[0]-a[0])^2 + abs(a[1]-b[1])^2)^/1/2
//     +(abs(b[0]-a[0])^2 + abs(b[1]-b[1])^2)^/1/2
//
// We can cancel stuff:
//
// L1 = (        0        + abs(a[1]-b[1])^2)^/1/2
//     +(abs(b[0]-a[0])^2 +         0       )^/1/2
//
// L1 = (abs(a[1]-b[1])^2)^/1/2
//     +(abs(b[0]-a[0])^2)^/1/2
//
// L1 = abs(a[1]-b[1]) + abs(b[0]-a[0])
//
// Those are absolute values so I can the subtraction in any order
// and I end up with the same result for L1 that I started with!
//
// L1 = abs(a[0]-b[0]) + abs(a[1]-b[1])
//
// I'm assuming that "writting an L1 norm as the sum of L2 norms with
// an extra point" generalized to any `r`. That with the triangle
// inequality proves that if i and j are any positive integers,
// and i < j, then the Li norm between any two points is greater than
// the Lj norm between those same two points.
//
