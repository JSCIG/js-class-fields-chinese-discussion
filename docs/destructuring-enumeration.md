# Destructuring and Enumeration

```js
// extract states from an object to local variables
const {a, b = 0, ...rest} = obj

// assign states from local variables to object
Object.assign(obj, {a, b})

// use enumeration to assign "safely"
for (const key in obj) obj[key] = rest[key]
```


```js
class {
	a
	b
	constructor(obj) {
		// destructuring to class instance is awkward
		let rest
		{a: this.a, b: this.b, ...rest} = obj

		// use assign
		const {a, b = 0, ...rest} = obj
		Object.assign(this, {a, b})

		// or use enumeration
		// WARN: may miss accessors on prototype and include conventional private `_foo`
		for (const key in this) {
			this[key] = rest[key]
		}
	}
}
```

```js
class {
	#a
	#b
	constructor(obj) {
		// destructuring to class instance is awkward
		let rest
		{a: this.#a, b: this.#b, ...rest} = obj

		// no way to assign
		const {a, b = 0, ...rest} = obj
		Object.assign(this, {#a: a, #b: b}) // illegal!

		// no way to enumerate
		for (const priv in this.#) { // illegal
			this.#[priv] = rest[key] // illegal
		}
	}
}
```

```js
class {
	#$
	constructor(obj) {
		// destructing
		const {a, b, ...rest} = obj
		this.#$ = {a, b}

		// use assign
		const {a, b = 0, ...rest} = obj
		Object.assign(this.#$, {a, b})

		// or use enumeration
		for (const key in this.#$) {
			this.#$[key] = rest[key]
		}
	}
	get a() {
		return this.#$.a // access private become a little weird
	}
	b(...args) {
		this.#$.b.call(this, ...args) // rebind this 😥
	}
}
```

## How classes 2.0 solve the problem:

```js
class {
	my a
	my b
	constructor(obj) {
		// destructing
		let rest
		{a, b, ...rest} = obj

		// no need to use assign because destructing just work
		// but still possible
		{ // use block for shadowing
			const {a, b = 0, ...rest} = obj
			Object.assign(this, {
				[private.a]: a,
				[private.b]: b,
			})
		}

		// or use enumeration
		for (const [name, privateKey] of Object.entries(private.this)) {
			this[privateKey] = rest[name]
		}
	}
}
```
