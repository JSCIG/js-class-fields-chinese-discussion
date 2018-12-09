def a = 1
def b = a * a

println "$a $b"

class Static {
	static def a = 2
	static def b = a * a
}

println "$Static.a $Static.b"

class Instance {
	def a = 3
	def b = a * a
}

inst = new Instance()
println "$inst.a $inst.b"
