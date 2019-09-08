Issue of Brand checking

```js
class X {
	#x
	constructor(value = 0) {
		this.#x = value
	}
	equal(that) {
			return this.#x === that.#x
		}
	}
}
```

```js
new X(1).equal(new X(1)) // true
new X(1).equal(new X(2)) // false
```

```js
new X().equal({}) // throw! oops...
```

Most JS programmers familiar with duck type, so if
they want to do "branding", they would like to write
`if (that[brand]) ...` or more strict form
`that[brand] !== undefined` or `brand in that`.

Unfortunately, with `this.#x`
you have no way to do such test

Of coz we can use `try`

```js
class X {
	...
  equal(that) {
		try {
			return this.#x === that.#x
		} catch {
			return false
		}
	}
}
```

But such abusing of `try` is not very desirable.
Eventually we realize it's just type check.
So most programmers will like to write:

```js
class X {
	...
  equal(that) {
		if (!(that instanceof X)) return false
		return this.#x === that.#x
	}
}
```

Not bad. But there are holes.

```js
const x = new X()
x.equal({}) // false
\
const x1 = { __proto__: X.prototype }
x.equal(x1) // throw!
\
const x2 = Object.create(x)
x.equal(x2) // throw!
\
const x3 = new Proxy(x, {})
x.equal(x3) // throw!
```

So the only safe way is `try`

Finally you will write code
like that to bypass "branding"

```js
class Foo {
	#x
	#y
	constructor(x, y) {
		this.#x = x
		this.#y = y
	}
	equal(that) {
			return this.#x === suppressBrand(() => that.#x)
				&& this.#y === suppressBrand(() => that.#y)
		}
	}
}
\
const fail = Symbol()
function suppressBrand(retrievePrivateField) {
	try {
		return retrievePrivateField()
	} catch {
		return fail
	}
}
```

Do we really need strict
brand checking by default?

opt-in

```js
const brandFoo = new WeakSet()
function checkFoo(o) {
	if (!brandFoo.has(o)) throw new TypeError()
}
class Foo {
	constructor() {
		brandFoo.add(this)
	}
	method1() {
		checkFoo(this)
		...
	}
	method2(that) {
		checkFoo(this)
		checkFoo(that)
		...
	}
}
```


```js
class Foo {
	constructor() {
		if (new.target === Foo) brandFoo.add(this)
	}
	...
}
```

```js
@brand
class Foo {
	method1() {
		...
	}
	method2(that) {
		this.brandCheck(that)
		...
	}
	@noBrand method3() {
		...
	}
}
```

Much flexible!


End


Normally, JS programmers will like to write:

```js
class X {
	#x
	constructor(value = 0) {
		this.#x = value
	}

	equal(that) {
			return this.#x === that.#x
		}
	}
}

new X(1).equal(new X(1)) // true
new X(1).equal(new X(2)) // false
new X().equal({}) // throw! oops...
```

Most JS programmers familiar with duck type, so if they want to do "branding", they would like to write `if (that[brand]) ...` or more strict form `that[brand] !== undefined` or `brand in that`. Unfortunately, with `this.#x` you have no way to do such test.

Of course we can use `try`.

```js
class X {
	...
  equal(that) {
		try {
			return this.#x === that.#x
		} catch {
			return false
		}
	}
}
```

But such abusing of `try` is not very desirable. Eventually we realize it's just type check! So most programmers will write:

```js
class X {
	...
  equal(that) {
		if (!(that instanceof X)) return false
		return this.#x === that.#x
	}
}
```

Not bad. But there are holes.

```js
const x = new X()
x.equal({}) // false

const x1 = { __proto__: X.prototype }
x.equal(x1) // throw!

const x2 = Object.create(x)
x.equal(x2) // throw!
```

So basically you have to also customize `instanceof` behavior:

```js
class X {
	...
	static [Symbol.hasInstance](instance) {
		if (!this.prototype.isPrototypeOf(instance)) return false
		try {
			instance.#x
			return true
		} catch {
			return false
		}
	}

  equal(that) {
		if (!(that instanceof X)) return false
		return this.#x === that.#x
	}
}
```

Unfortunately, you need to rewrite `[Symbol.hasInstance]`


Both `this.#x` or `this::x` have the branding problem.


The author of the class can make sure `foo` will never be `undefined`, so for `otherX` is not `X` (which `otherX[private.foo]` is `undefined`), it just return false. (But note we should use `===` instead of `==` unless you really want weak-type conversion)


But such pattern not scale well in more complex cases.

```js
class Node {
  const id = generateId()
  let parent = null
  const children = []
  const descendant = new Map()

  add(child) {
    if (child::parent) child::parent::remove(child)
    this::children.push(child)
    child::parent = this
    for (let node = this; node != null; node = node::parent) {
      node::descendant.set(id, child)
    }
  }
  remove(child) {
    if (child::parent !== this) throw new Error('no such child!')
    const i = this::children.findIndex(child)
    this::children.splice(i, 1)
    for (let node = this; node != null; node = node::parent) {
      node::descendant.delete(id)
    }
    child::parent = null
  }
  getById(id) {
    return this::descendant.get(id) || null
  }
}
```

Assume we want also support `add(anyObject)`, how we can do it?

Branding is not good thing for such requirements. The only choice is:

```
