// class Test {
// 	#foo = 42
// 	foo() {
// 		return this.#foo
// 	}
// }

// const test = new Proxy(new Test(), {})
// test.foo()




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

class Foo {
	#foo = 42
	method() {
		return this.#foo
	}
}
const p = new NaiveMembrane(new Foo())
p.method() // 42
