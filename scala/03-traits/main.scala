// Traits are like interfaces - they just specify the input/output of
// a set of methods. Notice how `isNotSimilar` is defined in terms of
// `isSimilar`.
trait Similarity {
	def isSimilar(x: Any): Boolean
	def isNotSimilar(x: Any): Boolean = !isSimilar(x)
}

// A point class with an isSimilar method that tells you if 2 points
// are similar (by looking at the data type and x coordinate). Notice
// how `isNotSimilar` is not defined (it's "inherited").
class Point(xc: Int, yc: Int) extends Similarity {
	var x: Int = xc
	var y: Int = yc
	def isSimilar(obj: Any) =
		obj.isInstanceOf[Point] &&
		obj.asInstanceOf[Point].x == x
}

// The "main"
object TraitsTest extends App {
	val p1 = new Point(2, 3)
	val p2 = new Point(2, 4)
	val p3 = new Point(3, 3)
	println(p1.isNotSimilar(p2))
	println(p1.isNotSimilar(p3))
	println(p1.isNotSimilar(2))
}

// Build
// scalac main.scala

// Run
// scala TraitsTest
