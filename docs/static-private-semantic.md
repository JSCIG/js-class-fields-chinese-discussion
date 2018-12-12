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
```

Throw!

Prototype!

Possible Solution

ESLint rule:
- Disallow `this.#foo` in static methods
- Disallow `this.constructor.#foo` in instance methods
- Disallow `class.#foo` in all methods?
