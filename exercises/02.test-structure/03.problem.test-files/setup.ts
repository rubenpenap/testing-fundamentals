interface Assertion {
	toBe(expected: unknown): void
}

declare global {
	var expect: (actual: unknown) => Assertion
	var test: (title: string, callback: () => void) => void
}

globalThis.expect = function expect(actual) {
	return {
		toBe(expected) {
			if (actual !== expected) {
				throw new Error(`Expected ${actual} to equal to ${expected}`)
			}
		},
	}
}

globalThis.test = function test(title, callback) {
	try {
		callback()
		console.log(`✓ ${title}`)
	} catch (error) {
		console.error(`✗ ${title}`)
		console.error(error, '\n')
	}
}
