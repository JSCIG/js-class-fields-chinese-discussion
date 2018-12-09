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

投票？

- `[[Define]]`
- `[[Set]]`

- `[[Define]]` Vue, React?
- `[[Set]]` MobX, Polymer

用`[[Define]]`
但改个语法？

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

投票？

- `[[Define]]` 改语法
- `[[Define]]` 不改
- `[[Set]]`

不要 public field！

Own property
Definition

基于 private 的语法糖

- `expose #foo`
- `expose foo`

```js
#foo
get foo() { return this.#foo }
set foo(v) { this.#foo = v }
```

原型

OO 最佳实践

- `expose readonly #foo`
- `expose writable #foo`

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

React

投票？

- `[[Define]]` 不改
- `[[Define]]` 改语法
- `[[Set]]`
- 语义和语法都改：getter/setter语法糖
