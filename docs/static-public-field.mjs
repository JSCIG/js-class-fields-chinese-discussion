class X {
	static count = 0
	static inc() {
		++this.count
	}
	constructor() {
		X.inc()
	}
}

class Y extends X {
}

new X()
console.log(X.count, Y.count)
new Y()
console.log(X.count, Y.count)
new X()
console.log(X.count, Y.count)
new Y()
console.log(X.count, Y.count)
