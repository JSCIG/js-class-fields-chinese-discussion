import {assert, assertThrow} from './util'

{
	class Counter {
		count = 0
		inc() {
			++this.count
		}
	}

	class CounterStartFrom100 extends Counter {
		count = 100
	}

	assert(() => {
		const c = new CounterStartFrom100()
		c.inc()
		return c.count === 101
	})
}

{
	class Counter {
		#count = 0
		get count() { return this.#count }
		inc() {
			++this.#count
		}
	}

	class CounterStartFrom100 extends Counter {
		count = 100
	}

	assert(() => {
		const c = new CounterStartFrom100()
		c.inc()
		return c.count === 100 // expect 101, actual 100
	})
}

{
	class Counter {
		count = 0
		inc() {
			++this.count
		}
	}

	class BetterCounter extends Counter {
		#count = 0
		get count() { return this.#count }
		inc() {
			++this.#count
		}
	}

	assert(() => {
		const c = new BetterCounter()
		c.inc()
		return c.count === 0 // expect 1, actual 0
	})
}
