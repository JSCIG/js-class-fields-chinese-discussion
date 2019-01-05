val a = 1
val b = a * a

println(s"$a $b")

object Test {
	val a = 2
	val b = a * a
}

class Test {
	val a = 3
	val b = a * a
}

println(s"${Test.a} ${Test.b}")

val test = new Test
println(s"${test.a} ${test.b}")
