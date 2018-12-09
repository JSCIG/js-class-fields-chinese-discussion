a = 1
b = a * a

console.log a, b

class Static
	@a = 2
	@b = @a * @a

console.log Static.a, Static.b

class Exec
	a = 3
	b = a * a

console.log a, b
