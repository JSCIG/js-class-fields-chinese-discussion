## Syntax issue of public field

```js
\
	[x] = [1, 2, 3];
\
```

```js
class Test {
	[x] = [1, 2, 3];
}
```

Destructuring?

Computed property

Same syntax, very
different semantics

- confusion,
- surprise,
- WTF?

- bad to novices,
- also bad to programmers from other languages,
- even worse to professional JS programmers

- rarely known,
- rarely used,
- hard to remember

Possible solution

ESLint rule,
disallow it!

Possible ~~solution~~


```js
\
	name = 'world';
	greeting = `Hello ${name}!`;
\
```

```js
class Test {
	name = 'world';
	greeting = `Hello ${name}!`;
}
```

Same syntax, very
different semantics

- confusion,
- surprise,
- I'm stupid!,
- You fool!

No

- Don't blame yourself
- Don't blame programmers

Blame TC39!

Why blame TC39?

It's reasonable/tradeoff
because blah blah blah...

Stop!

Does any other programming
languages have same issue?

- C#, VB.NET
- Java, Kotlin, Groovy
- Python, Ruby, Coffee

None

Only one

PHP

Bad design **IS**
just bad design.

No Excuse

Possible solution

ESLint rule:
disallow variables
same as field names

```js
class Test {
	name = 'world';
	greeting = `Hello ${?}!`;
}
```

```js
class Test {
	name = 'world';
	greeting = `Hello ${window.name}!`;
}
```

```js
class Test {
	window;
	name = 'world';
	greeting = `Hello ${?}!`;
}
```

```js
const outerName = name
class Test {
	window;
	name = 'world';
	greeting = `Hello ${outerName}!`;
}
```

```js
const currentName = () => name;
class Test {
	window;
	name = 'world';
	greeting = `Hello ${currentName()}!`;
}
```

Why not just allow
implicit `this`?

Why not just
drop `this`?

`this` binding issue

```js
class Test {
	<keyword> count = 0
	<keyword> inc() { ++count }
	render() {
		return (
			<div onClick={inc}>{count}</div>
		)
	}
}
```

- Error prone,
- Ask for more accidents of missing `this`,
- New linter rule is must to have

[Discussion and Poll]()
