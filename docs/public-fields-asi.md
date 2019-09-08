New ASI hazards,
ruin semicolon-less coding style

semicolon-less,
leading semicolon

The leading semicolon rule is simple:
when starting a statement in new line,
insert leading semicolon iff the first
character is `(`, `[`, `+`, `-`, `/` and ```.

```js
test()
;[1, 2, 3, 4].forEach(n => console.log(n))
```

Public field add several
new ASI hazards

```js
class Test {
	x = 1
	[key] = 2 // miss leading semicolon
}
```

```js
class Test {
	x = 1
	[Symbol.iterator]() { ... } // miss leading semicolon
}
```

```js
class Test {
	x = 1
	*f() { ... } // miss leading semicolon
}
```

These three cases are ok. The first two
already covered by leading semicolon rule.
For the third, we need to add `*` case.
It's ok, actually make the rule simpler:

... iff the first character is:

- `([ &nbsp;` (open parens)
- `+-*/` (the notation of four arithmetic binary operators)
- ``&nbsp; &nbsp;` (template string)

- rarely use
- syntax error

```js
class Test1 {
	out
	in
	name
}
\
// Test2 actually is class { out = 'out' in name }
class Test2 {
	out = 'out'
	in
	name
}
```

This case is bad. We need an extra leading
semicolon rule: insert leading semicolon
if you are in class body and the first
~~character~~ **token** is `in` or `instanceof`.

- no error
- different semantics

```js
class Test1 {
	set = new Set
\
	/** f method ... */
	f(x) { ... }
}
\
// Test2 actually is class { set f() { ... } }
class Test2 {
	set
\
	/** f method ... */
	f(x) { ... }
}
```

This case is the worst. We need a special rule:
insert leading semicolon if you are in class body
and **the previous line is `set`, `get` or `static`**.

The core value of the leading semicolon
rule is you never look backward,
and this case just **ruin** it.

- no error
- different semantics

- eslint
- [prettier](https://github.com/prettier/eslint-config-prettier#no-unexpected-multiline)

Possible Solutions

New ESLint rule:
**no-keyword-name-field**

```js
class Test {
	out
	'in'
	'instanceof'
	'set'
	'get'
	'static'
	f() { ... }
}
```

```js
class Test {
	'set' = new Set
	'in' = 'India'
}
```

So weird...

New ESLint rule:
**prefer-decorator-for-field**

```js
class Test {
	@field out = new WritableStream()
	@field in = new ReadableStream()
	@field set = new Set()
	f() { ... }
}
```

- rely on linter
- rely on decorator (only stage 2)
- rely on transpiler
- coding style agreement

Add keyword!

```js
class Test {
	<keyword> out = new WritableStream()
	<keyword> in = new ReadableStream()
	<keyword> set = new Set()
	f() { ... }
}
```

[Cost](https://github.com/tc39/proposal-class-fields/issues/210)

- 工具链实现成本
- 版本更新
- 代码规范跟进
- 版本更新
- 下游配置
- 版本更新
- 团队讨论

Transfer the cost
from committee (100)
to community (1,000,000)
