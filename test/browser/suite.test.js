// @ts-check
import { test, expect } from '@playwright/test'
import testConfig from '../../playwright.config.js'

test('generate image', async ({ page }) => {
  await page.goto(`http://localhost:${testConfig.webServer.port}/wifi-qr/`)

  // create a locator
  const button = page.locator('#wifi button')
  await page.locator('#ssid').fill('hello')
  await page.locator('#password').fill('asdfasdf')
  await button.click()
  await expect(page.locator('img[src]')).toHaveAttribute('src', /^blob:/)
})
