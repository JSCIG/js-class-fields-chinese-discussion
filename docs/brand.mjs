import {assert, assertThrow} from './util'

{
	class X {
		#x
		constructor(value = 0) {
			this.#x = value
		}

		equal(that) {
				return this.#x === that.#x
		}
	}


	assert(() => new X(1).equal(new X(1)) === true)
	assert(() => new X(1).equal(new X(2)) === false)

	// expect false, actual throw
	assertThrow(() => new X().equal({}))
}

{
	class X {
		#x
		constructor(value = 0) {
			this.#x = value
		}

		equal(that) {
			if (!(that instanceof X)) return false
			return this.#x === that.#x
		}
	}

	assert(() => new X().equal({}) === false)

	// expect false, actual throw
	assertThrow(() => new X().equal({ __proto__: X.prototype }))

	// expect true? (see also [prototype inheritence issue](prototype-inheritence), actual throw
	assertThrow(() => new X().equal(Object.create(new X())))

	// expect true? (see also [proxy transparency issue](proxy-transparency)), actual throw
	assertThrow(() => new X().equal(new Proxy(new X(), {})))
}

// {
// 	class X {
// 		#x
// 		constructor(value = 0) {
// 			this.#x = value
// 		}

// 		static [Symbol.hasInstance](instance) {
// 			try {
// 				instance.#x
// 				return true
// 			} catch {
// 				return false
// 			}
// 		}

// 		equal(that) {
// 			if (!(that instanceof X)) return false
// 			return this.#x === that.#x
// 		}
// 	}

// 	assert(() => new X().equal({}) === false)
// 	assert(() => new X().equal({ __proto__: X.prototype }) === false)

// 	class Y extends X {}
// 	assert(() => new Y() instanceof X === true)

// 	// expect false, actual true
// 	assert(() => new X() instanceof Y === true)
// }


// {
// 	class X {
// 		#x
// 		constructor(value = 0) {
// 			this.#x = value
// 		}

// 		static [Symbol.hasInstance](instance) {
// 			if (!this.prototype.isPrototypeOf(instance)) return false
// 			try {
// 				instance.#x
// 				return true
// 			} catch {
// 				return false
// 			}
// 		}

// 		equal(that) {
// 			if (!(that instanceof X)) return false
// 			return this.#x === that.#x
// 		}
// 	}

// 	class Y extends X {}
// 	assert(() => new Y() instanceof X === true)
// 	assert(() => new X() instanceof Y === false)
// 	assert(() => new Y(1).equal(new Y(1)) === true)
// 	assert(() => new Y(1).equal(new Y(2)) === false)

// 	assert(() => new Y().equal(new X()) === false)
// 	assert(() => new X().equal(new Y()) === false)
// }

// {
// 	class Z extends Y {
// 		#z
// 		constructor(value, ...args) {
// 			super(...args)
// 			this.#z = value
// 		}
// 		equal(that) {
// 			return super.equal(that) && this.#z === that.#z
// 		}
// 	}

// 	assert(() => new Z(1).equal(new Z(1)) === true)
// 	assert(() => new Z(1).equal(new Z(2)) === false)
// 	assert(() => new Z(1, 1).equal(new Z(1, 1)) === true)
// 	assert(() => new Z(1, 1).equal(new Z(1, 2)) === false)

// 	assert(() => new Y().equal(new Z()) === false)
// 	assert(() => new Z().equal(new Y()) === false)

// }
