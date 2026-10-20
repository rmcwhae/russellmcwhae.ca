import { test, expect } from '@playwright/test'

test.describe('Basic Navigation', () => {
    test('homepage loads and displays correctly', async ({ page }) => {
        await page.goto('/')

        // Check that the page loads
        await expect(page).toHaveTitle(/Russell.s Portfolio/)

        // Check that the logo is present
        await expect(page.locator('#logo')).toBeVisible()

        // Navigation links are attached on every viewport (mobile hides
        // them behind the toggle, covered below)
        await expect(
            page.locator('header nav a[href="/journal"]')
        ).toBeAttached()
    })

    test('desktop navigation links are visible', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/')

        const nav = page.locator('header nav')
        await expect(nav.locator('a[href="/photography"]')).toBeVisible()
        await expect(nav.locator('a[href="/journal"]')).toBeVisible()
        await expect(nav.locator('a[href="/about"]')).toBeVisible()
    })

    test('navigation links work correctly', async ({ page }) => {
        await page.goto('/')

        // Test Photos link
        await page.goto('/photography')
        await expect(page).toHaveURL('/photography')
        await expect(page.locator('h1')).toContainText('Photography')

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

        // The closed menu is visibility: hidden, so wait for Svelte to hydrate
        // the toggle before clicking, or the click is ignored.
        await page.waitForFunction(() => {
            const element = document.querySelector('.nav-toggle')
            if (!element) return false

            return Object.getOwnPropertySymbols(element).some((symbol) =>
                String(symbol).includes('events')
            )
        })

        const toggle = page.locator('.nav-toggle')
        await expect(page.locator('.nav-menu a[href="/about"]')).toBeHidden()
        await toggle.click()
        await expect(toggle).toHaveAttribute('aria-expanded', 'true')

        await expect(
            page.locator('.nav-menu a[href="/photography"]')
        ).toBeVisible()
        await expect(page.locator('.nav-menu a[href="/journal"]')).toBeVisible()
        await expect(page.locator('.nav-menu a[href="/about"]')).toBeVisible()

        // Page content outside the header is inert while the menu is open
        await expect(
            page.locator('main > :not(header)').first()
        ).toHaveAttribute('inert', '')
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
