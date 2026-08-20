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

        // Photography landing page
        await page.goto('/photography')
        await expect(page).toHaveURL('/photography')
        await expect(page.locator('h1')).toContainText('Photography')

        // Portfolio
        await page.goto('/portfolio')
        await expect(page.locator('h1')).toContainText('Portfolio')

        // Calendars
        await page.goto('/calendars')
        await expect(page).toHaveURL('/calendars')

        // Test Projects link
        await page.goto('/projects')
        await expect(page).toHaveURL('/projects')

        // Journal link
        await page.goto('/journal')
        await expect(page).toHaveURL('/journal')

        // Test Micro link
        await page.goto('/micro')
        await expect(page).toHaveURL('/micro')
    })

    // Note: there are no redirects for old URLs (/journal, /reading-list,
    // /events) — they 404 for real visitors. Only stale links embedded in
    // old journal posts are tolerated at build time (see svelte.config.ts).

    test('logo link returns to homepage', async ({ page }) => {
        await page.goto('/portfolio')
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

    test('mobile navigation links exist behind the Photography trigger', async ({
        page,
    }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/')
        await page.click('.nav-toggle')
        await expect(page.locator('.nav-menu.active')).toBeVisible()

        const photographyTrigger = page.locator(
            '.nav-menu button.parent-trigger',
            { hasText: 'Photography' }
        )
        await expect(photographyTrigger).toBeVisible()
        await photographyTrigger.click()

        await expect(
            page.locator('.nav-menu a[href="/portfolio"]')
        ).toBeVisible()
        await expect(
            page.locator('.nav-menu a[href="/field-expeditions"]')
        ).toBeVisible()
        await expect(
            page.locator('.nav-menu a[href="/calendars"]')
        ).toBeVisible()

        await expect(
            page.locator('.nav-menu a[href="/journal"]')
        ).toBeVisible()
        await expect(page.locator('.nav-menu a[href="/about"]')).toBeVisible()
    })

    test('parent trigger does not navigate when clicked', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await page
            .locator('button.parent-trigger', { hasText: 'Photography' })
            .click()

        await expect(page).toHaveURL('/')
    })

    test('desktop dropdown opens on hover and closes on mouseleave', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        const trigger = page.locator('button.parent-trigger', {
            hasText: 'Photography',
        })
        await trigger.hover()

        const panel = page.locator('.submenu', {
            has: page.locator('a[href="/portfolio"]'),
        })
        await expect(panel).toBeVisible()

        // Move the mouse away from the nav entirely
        await page.mouse.move(0, 0)
        await expect(panel).toBeHidden()
    })

    test('Escape closes the dropdown and returns focus to the trigger', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        const trigger = page.locator('button.parent-trigger', {
            hasText: 'Photography',
        })
        await trigger.click()

        const panel = page.locator('.submenu', {
            has: page.locator('a[href="/portfolio"]'),
        })
        await expect(panel).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(panel).toBeHidden()
        await expect(trigger).toBeFocused()
    })

    test('section marker shows on the parent for every child route', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })

        for (const path of [
            '/portfolio',
            '/field-expeditions',
            '/calendars',
        ]) {
            await page.goto(path)
            const li = page.locator('li.submenu-li.section-active', {
                hasText: 'Photography',
            })
            await expect(li).toHaveCount(1)
        }
    })

    test('footer is present on all pages', async ({ page }) => {
        const pages = [
            '/',
            '/photography',
            '/journal',
            '/projects',
            '/calendars',
            '/micro',
        ]

        for (const pagePath of pages) {
            await page.goto(pagePath)
            await expect(page.locator('footer')).toBeVisible()
        }
    })
})
