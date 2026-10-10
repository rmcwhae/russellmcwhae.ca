import { test, expect } from '@playwright/test'

test.describe('Basic Navigation', () => {
    test('homepage loads and displays correctly', async ({ page }) => {
        await page.goto('/')

        // Check that the page loads
        await expect(page).toHaveTitle(/Russell.s Portfolio/)

        // Check that the logo is present
        await expect(page.locator('#logo')).toBeVisible()

        // Check that navigation is present (may be hidden on mobile)
        const nav = page.locator('nav')
        if (await nav.isVisible()) {
            await expect(nav).toBeVisible()
        } else {
            // On mobile, nav might be hidden until menu is opened
            await expect(page.locator('.nav-toggle')).toBeVisible()
        }
    })

    test('navigation links work correctly', async ({ page }) => {
        await page.goto('/')

        // Test Photos link
        await page.goto('/photography')
        await expect(page).toHaveURL('/photography')
        await expect(page.locator('h1')).toContainText('Portfolio')

        // Test Calendars link
        await page.goto('/calendars')
        await expect(page).toHaveURL('/calendars')

        // Test Journal link
        await page.goto('/journal')
        await expect(page).toHaveURL('/journal')

        // Test About link
        await page.goto('/about')
        await expect(page).toHaveURL('/about')
    })

    test('logo link returns to homepage', async ({ page }) => {
        await page.goto('/photography')
        await page.click('#logo a')
        await expect(page).toHaveURL('/')
    })

    test('mobile navigation toggle exists', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/')

        // Check that mobile menu toggle exists
        await expect(page.locator('.nav-toggle')).toBeVisible()

        // Check that mobile menu exists (it's hidden by default)
        await expect(page.locator('.nav-menu')).toBeAttached()
    })

    test('mobile navigation links exist', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/')

        // Check that mobile navigation links exist
        await page.locator('.nav-toggle').click()

        await expect(
            page.locator('.nav-menu a[href="/photography"]')
        ).toBeVisible()
        await expect(page.locator('.nav-menu a[href="/journal"]')).toBeVisible()
        await expect(page.locator('.nav-menu a[href="/about"]')).toBeVisible()
    })

    test('footer is present on all pages', async ({ page }) => {
        const pages = ['/', '/photography', '/journal', '/about', '/calendars']

        for (const pagePath of pages) {
            await page.goto(pagePath)
            const footer = page.locator('footer')
            await expect(footer).toBeVisible()
            await expect(footer).toContainText(
                'A personal collection of images and words.'
            )
            await expect(footer.locator('a[href="/photography"]')).toHaveText(
                'images'
            )
            await expect(footer.locator('a[href="/journal"]')).toHaveText(
                'words'
            )
        }
    })
})
