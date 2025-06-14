import {
	greet,
	greetByResponse,
	congratulate,
	NotificationManager,
} from './greet.js'

const OriginalDate = globalThis.Date

beforeAll(() => {
	globalThis.Date = new Proxy(globalThis.Date, {
		construct: () => new OriginalDate('2024-01-01'),
	})
})

afterAll(() => {
	globalThis.Date = OriginalDate
})

test('returns a greeting message for the given name', () => {
	expect(greet('John')).toBe('Hello, John! Happy, Monday.')
})

test('returns a greeting message for the given user response', async () => {
	const response = Response.json({ firstName: 'Patrick' })
	expect(await greetByResponse(response)).toBe('Hello, Patrick! Happy, Monday.')
})

test('throws on greeting user with undefined user response', async () => {
	await expect(greetByResponse(undefined)).rejects.toThrow(
		new Error('Failed to greet the user: no user response provided'),
	)
})

test('returns a congratulation message for the given name', () => {
	expect(congratulate('Sarah')).toBe('Congrats, Sarah!')
})

async function waitFor(callback: () => void, maxRetries = 5) {
	let retries = 0
	while (retries < maxRetries) {
		try {
			retries++
			callback()
			return
		} catch (error) {
			if (retries === maxRetries) {
				throw error
			}
			await new Promise(resolve => setTimeout(resolve, 250))
		}
	}
}
test('displays a notification when a new user joins', async () => {
	const manager = new NotificationManager()
	manager.showNotification(Response.json({ firstName: 'Kate' }))
	await waitFor(() => {
		expect(manager.notifications[0]).toBe('Hello, Kate! Happy, Monday.')
	})
})
