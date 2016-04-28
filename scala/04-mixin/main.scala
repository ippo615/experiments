// 
abstract class AbsIterator {
	type T
	def hasNext: Boolean
	def next: T
}

// Notice we can pass a function (f) as an argument ^_^
trait RichIterator extends AbsIterator {
	def foreach(f: T => Unit) { while (hasNext) f(next) }
}

class StringIterator(s: String) extends AbsIterator {
	type T = Char
	private var i = 0
	def hasNext = i < s.length()
	def next = { val ch = s charAt i; i += 1; ch }
}

// This is the better way to creat a mixin class, the other way just
// makes a single Iter class that has a constant thing to iterate over
class BIter(s: String) extends StringIterator(s: String) with RichIterator

object MixinTest {
	def main(args: Array[String]) {

		println("== ITER ==")
		class Iter extends StringIterator( "Hello world!" ) with RichIterator
		val iter = new Iter
		iter foreach println

		println("== BITER ==")
		val biter = new BIter( "Bye world!" )
		biter foreach println
	}
}

// Build:
//   scalac main.scala

// Run:
//   scala MixinTest
