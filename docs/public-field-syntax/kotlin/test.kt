fun main() {
	val a = 1
	val b = a * a
	println("$a $b")

	println("${Instance.a} ${Instance.b}")
	val inst = Instance()
	println("${inst.a} ${inst.b}")
}

class Instance {
	companion object Static {
		val a = 2
		val b = a * a
	}

	val a = 3
	val b = a * a
}
