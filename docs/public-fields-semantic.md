Semantic

```js
class MyComponent extends BaseComponent {
	constructor() {
		this.state = {foo: 42}
	}
	wrongUsage() {
		this.state.foo = ...
		this.state = ...
	}
}
```

```js
class BaseComponent {
	get state() { return this._immutableState }
	set state(initState) {
		if (this._state != null) throw new TypeError('please use setState()')
		if (initState == null) throw new TypeError('state should be initialized to a non-null value')
		this._state = initState
		this._immutableState = new Proxy(this._state, { set() { throw new TypeError() } })
	}
}
```

```js
class MyComponent extends BaseComponent {
	state = {foo: 42}
	wrongUsage() {
		this.state.foo = ...
		this.state = ...
	}
}
```

```js
class User {
	name
	password
	...
}
```

```js
class SafeUser extends User {
	password = generateStrongPassword()
}
```

```js
class User {
	get password() { return this._password }
	set password(v) {
		this._password = v
		SecurityAuditor.log('user change password', this.name, v)
	}
}
```

```js
class User {
	constructor() {
		this.password = generateStrongPassword()
		...
	}
}
```

```js
class SafeUser extends User {
	get password() { return this._password }
	set password(v) {
		this._password = v
		SecurityAuditor.log('user change password', this.name, v)
	}
}
```

```js
class User {
	constructor() {
		this.password = generateStrongPassword()
		...
	}
}
```

```js
class User {
	password = generateStrongPassword()
	...
}
```

- Subclass field will never call superclass accessor
- Subclass accessor can not override superclass field

- Ok: Babel 6, TypeScript
- Fail: Babel 7, Chrome

`[[Define]]` VS `[[Set]]`

- `[[Set]]` Babel 6, TypeScript
- `[[Define]]` Babel 7, Chrome

Why `[[Set]]`

- No footgun
- `foo = bar` just implies `[[Set]]`

Why `[[Define]]`

- Definition!
- Decorator!

- `[[Define]]` Vue, React, ...
- `[[Set]]` MobX, Polymer, ...

No real consensus

Possible Solution

New ESLint rule
**prefer-decorator-for-field**

```js
class {
	@set foo = 42
	@define bar = 1337
}
```

- Burden for edge cases
- @define still broken — subclass <br>accessor can't override superclass

No public field!

Classes 1.1 proposal
by Kevin Smith, Allen Wirfs-Brock and Brendan Eich

```js
class Counter {
	var value = 42
	inc() {
		++value
	}
	get value() { return value }
	equal(that) {
		return value === that::value
		// this::value === that::value
	}
}
```

No public field!

Own property
Definition

Prototype-based
Inheritence

Refused because of
no public field...

Revisit the issues

1. `foo = bar` implies `[[Set]]`
1. As `[[Set]]`, programmers expect <br>(subclass) "field" call (superclass) accessor
1. As `[[Define]]`, programmers expect <br>subclass (accessor) override superclass (field)

1. `[[Define]]`
1. own property

Solutions

1. Drop `[[Define]]` (use `[[Set]]`)
1. Drop own property (use `[[Define]]` on prototype)
1. Drop the combination of `[[Define]]` and own property

1. ~~use [[Set]]~~
1. `[[Define]]` accessors on prototype
1. `[[Define]]` data property on prototype, then `[[Set]]` for initializer

```js
class Foo {
	<keyword> foo = 42
}
class Bar extends Foo {
	get foo() { ... }
	set foo(v) { ... }
}
```

```js
class Foo {
	// Object.defineProperty(Foo.prototype,
	//   'foo', { value: undefined, ... })
	foo
	constructor() {
		this.foo = 42
	}
}
class Bar extends Foo {
	get foo() { ... }
	set foo(v) { ... }
}
```

Syntax sugar of
getter/setter
wrapper for private

```js
class Foo {
	<keyword> foo = 42
}
```

```js
class Foo {
	#foo = 42
	get foo() { return this.#foo }
	set foo(v) { this.#foo = v }
}
```

```js
class Foo {
	<private> foo = 42
	get foo() { return foo }
	set foo(v) { foo = v }
	<private> method() {
		foo // diff from this.foo
	}
}
```

Prototype-based
Follow ES6 classes

Keyword-based
Easy to follow
OO best practice

```js
<keyword> foo = 'foo'
<keyword> writable bar = 'bar'
```

```js
#foo = 'foo'
get foo() { return this.#foo }
#bar = 'bar'
get bar() { return this.#bar }
set bar(v) { this.#bar = v }
```

getter/setter is bad?

No!

(Time limit, no details)

Most programming languages
are using syntax sugar of
getter/setter pattern!

- C#
- Ruby
- Scala
- Groovy
- Kotlin
- Dart
- Swift
- ...

all use this pattern

In last 20 years, main stream OO programming languages
all adopt the design of using getter/setters wrap
private states — which is proved as OO best practice.

And most programming languages designers
agree it's good and deserve dedicate syntax

JavaScript programmers don't use getter/setters much,&nbsp;
not because we dislike getter/setters, just because we
never have private mechanism (there are some workarounds,&nbsp;
but lack of ergonomics syntax), which means we eventually
have to store states to the own properties in most cases.

So we use own properties to store states of instances
just because we do not have other good choices


```js
class Counter {
	count = 0
	inc() {
		++this.count
	}
}
```

```js
class CounterStartFrom100 extends Counter {
	count = 100
}
```

```js
class Counter {
	#count = 0
	get count() { return this.#count }
	inc() {
		++this.#count
	}
}
```

```js
const c = new CounterStartFrom100()
c.inc()
c.count // expect 101, actual 100
```

```js
class BetterCounter extends Counter {
	#count = 0
	get count() { return this.#count }
	inc() {
		++this.#count
	}
}
```

```js
const c = new BetterCounter()
c.inc()
return c.count === 0 // expect 1, actual 0
```

- 子类会破坏父类的约束
- 父类也会破坏子类的约束

无意 vs 有意

code review 负担

`[[Define]]`
`[[Set]]`

- `[[Set]]` Babel 6, TypeScript
- `[[Define]]` Babel 7, Chrome

Why `[[Define]]`

- Definition!
- Syntax cost!
- Decorator!

Poll?

- `[[Define]]`
- `[[Set]]`

- `[[Define]]` Vue, React?
- `[[Set]]` MobX, Polymer

`[[Define]]`
But change syntax?

`foo := 1`

- `foo`
- `foo: type`
- `foo: type := bar`

`declare foo`

- `declare #foo`
- `declare static foo`
- `declare static #foo`
- `declare method()`

- Syntax cost
- Consistency

Poll?

- `[[Define]]`
- `[[Define]]` change syntax
- `[[Set]]`

No public field!

Classes 1.1

Own property
Definition

Prototype-based
Inheritence

Possible Solution

Syntax sugar of
getter/setter
wrapper for private

- `expose #foo`

```js
#foo
get foo() { return this.#foo }
set foo(v) { this.#foo = v }
```

原型

OO 最佳实践

- `expose readonly #foo`
- `expose writable #foo`

```js
readonly foo = 'foo'
writable bar = 'bar'
```

```js
#foo = 'foo'
get foo() { return this.#foo }
#bar = 'bar'
get bar() { return this.#bar }
set bar(v) { this.#bar = v }
```

getter/setter is bad?

- 广泛接受？
- 性能差？
- 语义假定？
- 暴露 mutable？
- own prop可反射！

- Destructuring
- Object.assign
- Object.keys/values/entries

接口实现
对象工厂

封装 对象状态
暴露 对象状态

接口实现 class
对象工厂 factory

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

```js
React.defineComponent(({state}) => {
	state.init({count: 0})
\
	function count() {
		return state.current().count
	}
	function inc() {
		state.next({count: count() + 1})
	}
\
	return props => (
			<div onClick={inc}>{count()}</div>
		)
})
```

```js
React.defineComponent(({state}) => {
	const [count, nextCount] = state.create(0)
\
	function inc() {
		nextCount(count() + 1)
	}
\
	return props => (
			<div onClick={inc}>{count()}</div>
		)
})
```

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

其他采用getter/setter
包装语法糖方案的语言

C#
Ruby
Scala
Kotlin
Groovy
Swift

Все счастливые семьи похожи друг на друга
каждая несчастливая семья несчастлива по-своему

Happy families are all alike;
every unhappy family is
unhappy in its own way.

Happy classes are all alike;
every unhappy class is un-
happy in its **own property**.

基于 Getter/Setter 封装 private
状态是过去20年各主流语言的 class
中广泛采用并已经证明的**最佳实践**！

JavaScript程序员少用 getter/setter
绝不是因为我们不喜欢 getter/setter
更不是因为 getter/setter is bad
只是因为我们没有 private，状态
最后还是要存到 own properties 上

JavaScript 用 own properties
保存实例的数据状态只是因为我们
**别无选择**

Most programming languages
designers agree that,
Getter/Setter is GOOD.

Poll

- `[[Define]]` own property
- `[[Define]]` own property, change syntax
- `[[Set]]` own property
- getter/setter

[Discussion and Poll]()
