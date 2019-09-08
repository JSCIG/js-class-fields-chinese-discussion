Issue of Proxy transparency

```js
class Foo {
	_foo = 42
	method() {
		return this._foo
	}
}
const p = new Proxy(new Foo(), {})
p.method() // 42
```

```js
class Foo {
	#foo = 42
	method() {
		return this.#foo
	}
}
const p = new Proxy(new Foo(), {})
p.method() // throw
```

Private fields break
Proxy **by default**

Can't coexist with
libraries/frameworks
rely on Proxy

- MobX
- Vue 3
- Aurelia
- ...

Membrane

```js
class Foo {
	#foo = 42
	method() {
		return this.#foo
	}
}
const p = new NaiveMembrane(new Foo())
p.method() // 42
```

```js
const wrapped = new WeakMap()
function NaiveMembrane(target) {
	const p = new Proxy(target, {
		get(target, key, reciever) {
			const result = Reflect.get(target, key, reciever)
			if (typeof result === 'function') {
				return new Proxy(result, {
					apply(target, thisArg, argList) {
						const unwrapped = wrapped.has(thisArg) ? wrapped.get(thisArg) : thisArg
						return Reflect.apply(target, unwrapped, argList)
					}
				})
			} else {
				return result
			}
		}
	})
	wrapped.set(p, target)
	return p
}
```

- Need membrane implementation which is very complex
- Footprint and performance cost
- May still unfit in MobX/Vue/Aurelia use cases
