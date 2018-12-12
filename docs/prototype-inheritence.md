```js
class Test {
	#foo = 42
	foo() {
		return this.#foo
	}
}

const test = Object.create(new Test())
test.foo()
```
