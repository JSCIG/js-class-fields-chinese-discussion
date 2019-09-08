Issue of static private

```js
const secret = '...'
/*
...
*/
class Base {
	static login() {
		secret
	}
}
class Sub extends Base {
	static doSth() {
		this.login()
	}
}
Sub.doSth()
```

Refactory for Cohesion

```js
class Base {
	static #secret = '...'
	static login() {
		this.#secret
	}
}
class Sub extends Base {
	static doSth() {
		this.login()
	}
}
Sub.doSth()
```

Throw!

Prototype!

Possible Solution

New ESLint rule:
**no-static-this-ref-private**

- Disallow `this.#foo` in static methods
- Disallow `this.constructor.#foo` in instance methods
- Disallow `class.#foo` in all methods?


Simple way

Use symbol-based semantic
instead of weakmap-based
