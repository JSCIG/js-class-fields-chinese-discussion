Class fields有很多问题，这里专门论述对TypeScript所产生的影响。

## 不带有initializer的声明的默认赋值行为

```ts
class A {
	a: number
}
```

在TS中，不带有initializer的声明仅仅是进行类型声明。
但这个代码如按当前class fields提案的语义，应等价于

```ts
class A {
	a: number = undefined
}
```

这导致原本仅仅进行类型约束的声明产生了副作用。

例子：

```ts
class Base {
	constructor(
		public type: string
	) {}
}

class A extends Base {
	type: 'a'
	constructor() {
		super('a')
	}
}
class B extends Base {
	type: 'b'
	constructor() {
		super('b')
	}
}
```

在TS中，`new A().type`返回`"a"`，而按照class fields提案，返回`undefined`。

需要在子类重写类型的情况包括：

1. 细化类型
1. 放宽visibility（从protected放松到public）


## `[[Define]]` vs `[[Set]]`

Class fields提案使用`[[Define]]`来定义own property的语义，导致在继承链上的accessor全部无效。这严重违背当前TS的实践，也违背几乎所有主流OOP语言的实践。
