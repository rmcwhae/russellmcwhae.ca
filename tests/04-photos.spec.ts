import { test, expect } from '@playwright/test'

test.describe('Photos and Events', () => {
    test('photography page loads correctly', async ({ page }) => {
        await page.goto('/photography')

        // Check page title
        await expect(page).toHaveTitle(/Photography/)

        // Check main heading
        await expect(page.locator('h1')).toContainText('Portfolio')

        // Check that gallery is present
        await expect(page.locator('#gallery')).toBeVisible()
    })

    test('photography page has links to events and calendars', async ({
        page,
    }) => {
        await page.goto('/photography')

        const expeditions = page.locator('a[href="/events"]')
        await expect(expeditions).toBeVisible()
        await expect(expeditions).toContainText('Field Expeditions')

        const calendars = page.locator('a[href="/calendars"]')
        await expect(calendars).toBeVisible()
        await expect(calendars).toContainText('Looking for Calendars?')
    })

    test('events page loads correctly', async ({ page }) => {
        await page.goto('/events')

        // Check page title
        await expect(page).toHaveTitle(/Field Expeditions/)

        // Check main heading
        await expect(page.locator('h1')).toContainText('Field Expeditions')

        // Check that the expedition archive is present
        await expect(page.locator('.archive')).toBeVisible()
    })

    test('events page has link to photography', async ({ page }) => {
        await page.goto('/events')

        const photography = page.locator('.eyebrow a[href="/photography"]')
        await expect(photography).toBeVisible()
        await expect(photography).toContainText('Photography')
    })

    test('events display with correct information', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-row', { timeout: 10000 })

        const eventRows = page.locator('.event-row')
        const eventCount = await eventRows.count()

        if (eventCount > 0) {
            const firstEvent = eventRows.first()

            await expect(firstEvent).toBeVisible()
            await expect(firstEvent.locator('.event-title')).toBeVisible()
            await expect(firstEvent.locator('.event-meta')).toBeVisible()

            const dateAndCountText = await firstEvent
                .locator('.event-meta')
                .textContent()
            expect(dateAndCountText).toMatch(/.*\d+ photos/)
        }
    })

    test('event links navigate to event detail page', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-row', { timeout: 10000 })

        const eventRows = page.locator('.event-row')
        const eventCount = await eventRows.count()

        if (eventCount > 0) {
            const firstEventLink = eventRows.first()
            const href = await firstEventLink.getAttribute('href')

            if (href) {
                // Click the event
                await firstEventLink.click()

                // Should navigate to event detail page
                await expect(page).toHaveURL(href)

                // Check that we're on an event detail page
                await expect(page.locator('h1')).toBeVisible()
            }
        }
    })

    test('event detail page displays images', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-row', { timeout: 10000 })

        const eventRows = page.locator('.event-row')
        const eventCount = await eventRows.count()

        if (eventCount > 0) {
            // Click first event
            await eventRows.first().click()

            // Wait for images to load
            await page.waitForSelector('img', { timeout: 10000 })

            // Check that images are present
            const images = page.locator('img')
            const imageCount = await images.count()
            expect(imageCount).toBeGreaterThan(0)
        }
    })

    test('photography gallery displays images', async ({ page }) => {
        await page.goto('/photography')

        // Wait for images to load
        await page.waitForSelector('#gallery img', { timeout: 10000 })

        // Check that images are present
        const images = page.locator('#gallery img')
        const imageCount = await images.count()
        expect(imageCount).toBeGreaterThan(0)
    })

    test('photography gallery images are clickable', async ({ page }) => {
        await page.goto('/photography')

        // Wait for images to load
        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()

        if (imageCount > 0) {
            // Click first image
            await images.first().click()

            // Check that PhotoSwipe lightbox opens
            await expect(page.locator('.pswp')).toBeVisible()
        }
    })

    test('PhotoSwipe lightbox functionality', async ({ page }) => {
        await page.goto('/photography')

        // Wait for images to load
        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()

        if (imageCount > 0) {
            // Click first image to open lightbox
            await images.first().click()

            // Check that lightbox is open
            await expect(page.locator('.pswp')).toBeVisible()

            // Check that lightbox has navigation buttons (may be hidden on mobile)
            await expect(
                page.locator('.pswp__button--arrow--next')
            ).toBeAttached()

            // Check that lightbox is functional by verifying it has the expected structure
            await expect(page.locator('.pswp__button--close')).toBeVisible()

            // Check that lightbox has the expected classes
            const lightboxClasses = await page
                .locator('.pswp')
                .getAttribute('class')
            expect(lightboxClasses).toContain('pswp--open')
            expect(lightboxClasses).toContain('pswp--zoom-allowed')
        }
    })

    test('images have proper alt text', async ({ page }) => {
        await page.goto('/photography')

        // Wait for images to load
        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()

        if (imageCount > 0) {
            // Check that first image has alt text
            const firstImage = images.first()
            const altText = await firstImage.getAttribute('alt')
            expect(altText).toBeTruthy()
        }
    })

    test('events are sorted by date', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-row', { timeout: 10000 })

        const eventRows = page.locator('.event-row')
        const eventCount = await eventRows.count()

        if (eventCount > 1) {
            // Get all event dates
            const eventDates = await eventRows
                .locator('.event-meta')
                .allTextContents()

            // Extract dates from the text (format: "September 2025 · X photos")
            const dates = eventDates
                .map((text) => {
                    // Try to parse the date from various formats
                    const dateStr = text.split(' · ')[0] // Get the date part before "· X photos"
                    const date = new Date(dateStr)
                    return isNaN(date.getTime()) ? null : date
                })
                .filter(Boolean)

            // Check that dates are in descending order (newest first)
            for (let i = 0; i < dates.length - 1; i++) {
                expect(dates[i]!.getTime()).toBeGreaterThanOrEqual(
                    dates[i + 1]!.getTime()
                )
            }
        }
    })

    test('photography and events pages are responsive', async ({ page }) => {
        // Test desktop view
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/photography')
        await expect(page.locator('#gallery')).toBeVisible()

        await page.goto('/events')
        await expect(page.locator('.archive')).toBeVisible()
        await expect(page.locator('.event-row').first()).toBeVisible()

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/photography')
        await expect(page.locator('#gallery')).toBeVisible()

        await page.goto('/events')
        await expect(page.locator('.archive')).toBeVisible()
        await expect(page.locator('.event-row').first()).toBeVisible()
    })

    test('event detail page has back navigation', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-row', { timeout: 10000 })

        const eventRows = page.locator('.event-row')
        const eventCount = await eventRows.count()

        if (eventCount > 0) {
            // Click first event
            await eventRows.first().click()

            const back = page.locator('a[href="/events"]')
            await expect(back).toBeVisible()
            await expect(back).toContainText('Field Expeditions')
        }
    })
})
