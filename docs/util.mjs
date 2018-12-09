// test utils

function ok(assert, test) {
	console.assert(true, assert.name, test)
}

function fail(assert, test, error) {
	console.assert(false, assert.name, test, error || '')
}

export function assert(test) {
	try {
		if (test()) ok(assert, test)
		else fail(assert, test)
	} catch (e) {
		fail(assert, test, e)
	}
}

export function assertThrow(test, what) {
	try {
		test()
		fail(assertThrow, test)
	} catch (e) {
		const r = checkError(e, what)
		if (r) fail(assertThrow, test, r)
		else ok(assertThrow, test)
	}
}

function checkError(error, what) {
	try {
		if (what === undefined) return null
		if (error instanceof Error && Error.isPrototypeOf(what)) {
			if (error instanceof what) return null
			return {reason: 'instanceof', error, what}
		}
		if (likePlainObject(what)) {
			const diff = Object.entries(what).find(([k, v]) => error[k] !== v)
			if (diff == null) return null
			const [k, v] = diff
			return {reason: `expect key ${k} to be ${v}, actual ${what[k]}`, error, what}
		}
		if (typeof what === 'function') {
			if (what(error)) return null
			return {reason: 'match', error, what}
		}
		if (what === error) return null
		return {reason: '===', error, what}
	} catch (reason) {
		return {reason, error, what}
	}
}

function likePlainObject(o) {
	return Object.getPrototypeOf(o) === Object.prototype
}
