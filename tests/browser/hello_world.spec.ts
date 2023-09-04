import { test } from '@japa/runner'

test('display welcome page', async ({ visit }) => {
  const page = await visit('/')
  await page.assertExists(page.getByRole('link', { name: 'Log In' }))
  await page.assertExists(page.getByRole('link', { name: 'Sign Up' }))
})
