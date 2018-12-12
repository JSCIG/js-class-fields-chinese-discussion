class Base {
	static #secret = '...'
	static login() {
		this.#secret
	}
}

class Sub extends Base {
	static doSth() {
		this.login()
	}
}

Sub.doSth()
