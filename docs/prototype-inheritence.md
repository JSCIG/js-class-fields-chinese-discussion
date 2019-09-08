Issue of prototypal inheritance transparency

```js
class Test {
	#foo = 42
	foo() {
		return this.#foo
	}
}
const test = Object.create(new Test())
test.foo() // throw
```

老的类库
互操作性
