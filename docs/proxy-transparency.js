class Test {
	#foo = 42
	foo() {
		return this.#foo
	}
}

const test = new Proxy(new Test(), {})
test.foo()
