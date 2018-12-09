class X {
	a = console.log(1)
	b = console.log(2)

	constructor() {
		console.log(3)
	}

	c = console.log(4)
}

class Y extends X {
	d = console.log(5)

	constructor() {
		console.log(6)
		super()
		console.log(7)
	}

	e = console.log(8)
}

new Y()
