/**
 * Exercise 4.2.1 : Suppose we have a stream of tuples with the schema
 * Grades(university, courseID, studentID, grade). Assume universities
 * are unique, but a courseID is unique only within a university (i.e.,
 * different universities may have different courses with the same ID,
 * e.g., "CS101") and likewise, studentID's are unique only within a
 * university (different universities may assign the same ID to
 * different students). Suppose we want to answer certain queries
 * approximately from a 1/20th sample of the data. For each of the
 * queries below, indicate how you would construct the sample. That is,
 * tell what the key attributes should be.
 * 
 * (a) For each university, estimate the average number of students
 *     in a course.
 * (b) Estimate the fraction of students who have a GPA of 3.5 or more.
 * (c) Estimate the fraction of courses where at least half the students
 *     got "A."
 */

// Part A
// Since we want a *per university* estiamte of the number of studnets
// in a course we'll need 2 keys: univerisy, courseID.

// Part B
// GPA is a average across different courses so we'll use: studentID
// and courseID as the keys (no need for university because we only
// need an estimate).

// Part C
// We need university, courseID, and grade as keys. A student would
// not have their grade listed twice for the same course. 

// How do sample? pg-137
// To take a sample of size `a/b`, we hash the key value for each tuple
// to `b` buckets, and accept the tuple for the sample if the hash
// value is less than `a`.
// If the key consists of more than one component, the hash function
// needs to combine the values for those components to make a single
// hash-value. The
