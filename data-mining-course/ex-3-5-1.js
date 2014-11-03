/** 
 * Exercise 3.5.1 : On the space of nonnegative integers, which of the
 * following functions are distance measures? If so, prove it; if not,
 * prove that it fails to satisfy one or more of the axioms.
 * 
 * (a) max(x, y) = the larger of x and y.
 * (b) diff(x, y) = |x - y| (the absolute magnitude of the difference between x
 *     and y).
 * (c) sum(x, y) = x + y.
 */

// There are 4 axioms that must be satisfied:
//
// 1. d(x, y) >= 0 (no negative distances).
// 2. d(x, y) = 0 if and only if x = y (distances are positive,
//    except for the distance from a point to itself).
// 3. d(x, y) = d(y, x) (distance is symmetric).
// 4. d(x, y) <= d(x, z) + d(z, y) (the triangle inequality).

// Part A - max( x, y ) - NO
// 1. Yes - we are considering non-negative integers only so
//          max(x,y) >= 0
// 2. No  - max(x,x) = x !== 0

// Part B - abs(x-y) - YES
// 1. Yes - abs(x) is always >= 0
// 2. Yes - abs(x-x) = 0
// 3. Yes - abs(x-y) = abs(y-x)
// 4. Yes - abs(x-y) <= abs(x-z) + abs(z-y) because
//          abs( x ) is at least 0

// Part C - sum( x, y ) - NO
// 1. Yes - we are considering non-negative integers only so
//          sum(x,y) >= 0
// 2. No  - sum( x, x ) = 2*x !== 0
