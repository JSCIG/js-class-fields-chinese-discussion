New ASI hazards,
ruin semicolon-less coding style

semicolon-less,
leading semicolon

The leading semicolon rule is simple:
when starting a statement in new line,
insert leading semicolon iff the first
character is `(`, `[`, `+`, `-`, `/` and ````.

Public field add several new ASI hazards:

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

... iff the first character is
- `([` (open parens)
- `+-*/` (the notation of four arithmetic binary operators)
- ```` (template string)


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

```js
class Test1 {
	set = new Set
	f() { ... }
}
\
// Test2 actually is class { set f() { ... } }
class Test2 {
	set
	f() { ... }
}
```

This case is the worst. We need a special rule:
insert leading semicolon if you are in class
body and **the previous line is `set` or `get`**.

The core value of the leading semicolon
rule is you never look backward,
and this case just **ruin** it.

Possible Solutions

Add keyword

```js
class Test {
	field out
	field in
	field set
	f() { ... }
\
	field #priv
}
```

```js
class Test {
	own out
	own in
	own set
	f() { ... }
}
```

```js
class Test {
	writable out
	writable in
	readonly set
	f() { ... }
}
```

ESLint rule:
disallow `in` `set`...

```js
class Test {
	out
	;['in']
	;['instanceof']
	;['set']
	;['get']
	f() { ... }
}
```

ESLint rule:
require decorator

```js
class Test {
	@writable out
	@writable in
	@readonly set
	f() { ... }
}
```

- rely on decorator
- rely on linter
- coding style agreement
- need unified names

Pass on the cost
to the community

[Discussion and Poll]()
