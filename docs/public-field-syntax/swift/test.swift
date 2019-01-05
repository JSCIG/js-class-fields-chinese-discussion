let a = 1
let b = a * a

print(a, b)

class Static {
	static let a = 2
	static let b = a * a
}

print(Static.a, Static.b)

class Instance {
	let a = 3
	// Cannot use instance member 'a' within property initializer;
	// property initializers run before 'self' is available
	// let b = a * a
}
