```html
<script>
class Test {
	name = 'world'
	greeting = `Hello ${name}!`
}
alert(new Test().greeting)
</script>
```

- A. "Hello world!"
- B. "Hello undefined!"
- C. "Hello !"
- D. throw ReferenceError
- E. None of the above

C. "Hello !"

```js
\
	a = 10
	b = a * a
\
```

```js
class X {
	a = 10
	b = a * a
}
```

Same syntax, very
different semantics

- bad to novices,
- very bad to programmers from other languages,
- also bad to professional JS programmers

- I'm stupid!,
- You fool!

RTFM

No

- Don't blame yourself
- Don't blame your coworkers

Blame TC39!

Why blame TC39?

It's reasonable/tradeoff
because blah blah blah...

Stop!

Does any other programming
languages have same issue?

- C++, C#, VB.NET
- Java, Scala, Groovy
- Swift, Kotlin, Dart
- Python, Ruby, Coffee
<!-- Objective-C ? , Perl ? , C, SQL, MATLAB, R, Go -->

None

Only one

PHP

Bad design **IS**
just bad design.

Why it is bad?

```js
class Test {
	name = 'world'
	greeting = `Hello ${name}!`
}
```

- Are you sure you never make such mistake?
- Are you sure your team members never make such mistake?
- Are you sure you can find the mistake by code review?

[code review](https://github.com/hax/js-class-fields-chinese-discussion/pull/1/files)

- How you know you are in the context of class body?
- How you know `b` in `class { a = b * b }` is a mistake?


Possible solution

New ESLint rule:
**no-field-name-var**

```js
class Test {
	name = 'world'
	greeting = `Hello ${name}!` // lint error
}
```

等价于 shadow
掉外部同名变量

- Error prone,
- Ask for more accidents of missing `this`,
- Very bad to code review,
- New linter rule is must to have

`this.name` vs `name`

- same
- not same

- implicit `this`
- disallow `name` (lint),
- drop `this.name`

```js
class Counter {
	<keyword> n = 0
	<keyword> inc() { ++n }
	render() {
		return (
			<div onClick={inc}>{n}</div>
		)
	}
}
```

change semantics of old code?

- shadow vars
- bound methods (`this` binding issue)
- if private how to get `equals(o) { return n === o.n }`

Just a example
need further exploring
