import { greet, congratulate } from './greet.js'

const OriginalDate = globalThis.Date

beforeAll(() => {
	globalThis.Date = new Proxy(OriginalDate, {
		construct: (target, args: ConstructorParameters<typeof Date>) =>
			args.length ? new target(...args) : new target(2024, 0, 1),
	})
})

afterAll(() => {
	globalThis.Date = OriginalDate
})
test('returns a greeting message for the given name', () => {
	expect(greet('John')).toBe('Hello, John! Happy, Monday.')
})

test('returns a congratulation message for the given name', () => {
	expect(congratulate('Sarah')).toBe('Congrats, Sarah!')
})
