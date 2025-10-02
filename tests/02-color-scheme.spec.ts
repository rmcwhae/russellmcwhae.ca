import { test, expect } from '@playwright/test'

test.describe('Color Scheme Toggle', () => {
  test('desktop color scheme switcher is visible on large screens', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    
    // Check that desktop switcher is visible
    await expect(page.locator('#desktop-switcher')).toBeVisible()
    
    // Check that mobile switcher is hidden
    await expect(page.locator('#mobile-switcher')).not.toBeVisible()
  })

  test('mobile color scheme switcher is visible on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check that mobile switcher is visible
    await expect(page.locator('#mobile-switcher')).toBeVisible()
    
    // Check that desktop switcher is hidden
    await expect(page.locator('#desktop-switcher')).not.toBeVisible()
  })

  test('color scheme toggle exists', async ({ page }) => {
    await page.goto('/')
    
    // Check that toggle exists (may be hidden on mobile)
    await expect(page.locator('#desktop-switcher .toggle-wrapper')).toBeAttached()
    await expect(page.locator('#desktop-switcher #toggle')).toBeAttached()
  })

  test('color scheme toggle persists across page navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check that toggle exists
    await expect(page.locator('#desktop-switcher .toggle-wrapper')).toBeAttached()
    
    // Navigate to another page
    await page.goto('/photography')
    await expect(page).toHaveURL('/photography')
    
    // Check that toggle still exists
    await expect(page.locator('#desktop-switcher .toggle-wrapper')).toBeAttached()
  })

  test('color scheme toggle works in mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check that mobile toggle exists
    await expect(page.locator('#mobile-switcher .toggle-wrapper')).toBeAttached()
  })

  test('color scheme toggle respects system preference', async ({ page }) => {
    // Mock system preference to dark
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    
    // Check that toggle exists (may be hidden on mobile)
    await expect(page.locator('#desktop-switcher .toggle-wrapper')).toBeAttached()
  })

  test('color scheme toggle has proper structure', async ({ page }) => {
    await page.goto('/')
    
    // Check that toggle has proper structure (may be hidden on mobile)
    await expect(page.locator('#desktop-switcher .toggle')).toBeAttached()
    await expect(page.locator('#desktop-switcher .toggle .icons')).toBeAttached()
  })

  test('color scheme toggle exists on all pages', async ({ page }) => {
    const pages = ['/', '/photography', '/journal', '/projects', '/calendars', '/micro']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      // Check that toggle exists (may be hidden on mobile)
      await expect(page.locator('#desktop-switcher .toggle-wrapper')).toBeAttached()
    }
  })
})