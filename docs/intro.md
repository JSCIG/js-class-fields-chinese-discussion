Public field

React

```js
class Counter extends React.Component {
	constructor {
		super()
		this.state = {count: 0}
		this.inc = this.inc.bind(this)
	}
	inc() {
		this.setState({count: this.state.count + 1})
	}
	render() {
		return (
			<div onClick={this.inc}>{this.state.count}</div>
		)
	}
}
```

```js
class Counter extends React.Component {
	state = {count: 0}
	inc = () => {
		this.setState({count: this.state.count + 1})
	}
	render() {
		return (
			<div onClick={this.inc}>{this.state.count}</div>
		)
	}
}
```

GOOD!

Really?

React hooks

React class-based
components is doomed

Still good,
isn't it?

```js
class Counter {
	constructor() {
		this.count = 0
	}
	inc() { ++this.count }
}
```

```js
const c = new Counter()
c.inc()
c.count // 1
```

```js
c.count = 10 // hack it!
```

```js
class Counter {
	constructor() {
		this._count = 0
	}
	get count() { return this._count }
	inc() { ++this._count }
}
```

```js
const c = new Counter()
c.inc()
c.count // 1
c.count = 10 // throw!
```

```js
c._count = 10 // hack it!
```

```js
const count = Symbol()
class Counter {
	constructor() {
		this[count] = 0
	}
	get count() { return this[count] }
	inc() { ++this[count] }
}
```

```js
// reflection!
c[Object.getOwnPropertySymbols(c)[0]] = 10
```

```js
class Counter {
	#count = 0
	get count() { return this.#count }
	inc() { ++this.#count }
}
```

`#`

WTF!

Inner peace...

```js
class Counter {
	_count = 0
	get count() { return this._count }
	inc() { ++this._count }
}
```

```js
class Counter {
	#count = 0
	get count() { return this.#count }
	inc() { ++this.#count }
}
```

`#` is new `_`

If you accept it,
it's just ok.

Are you OK?

- public      foo this. foo
- convention _foo this._foo
- private    #foo this.#foo

- public  fields
- private fields

class fields

Stage 3

Babel 7
Chrome 72
node --harmony

- Good part?
- Bad part?
