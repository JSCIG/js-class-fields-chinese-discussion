```js
\
	[x] = [1, 2, 3]
\
```

```js
class Test {
	[x] = [1, 2, 3]
}
```

Destructuring?

Computed property

Same syntax, very
different semantics

- bad to novices,
- bad to programmers from other languages,
- also bad to professional JS programmers

- rarely known,
- rarely used,
- hard to recognize

TypeScript already
support it years?

NO

TS 2.7+
(Jan 31, 2018)

Possible solution

New ESLint rule,
**no-class-computed-field**

- Well-known symbols are for methods/accessors,
- Private fields instead of symbol-based private

No big use case

Just drop it!
