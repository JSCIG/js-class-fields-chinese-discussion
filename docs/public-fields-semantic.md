Semantic

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
