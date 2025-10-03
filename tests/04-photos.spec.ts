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

    test('photography page has link to events', async ({ page }) => {
        await page.goto('/photography')

        // Check that "All events" button is present
        await expect(page.locator('a[href="/events"]')).toBeVisible()
        await expect(page.locator('a[href="/events"]')).toContainText(
            'All events'
        )
    })

    test('events page loads correctly', async ({ page }) => {
        await page.goto('/events')

        // Check page title
        await expect(page).toHaveTitle(/Events/)

        // Check main heading
        await expect(page.locator('h1')).toContainText('Events')

        // Check that events grid is present
        await expect(page.locator('.events-grid')).toBeVisible()
    })

    test('events page has link to photography', async ({ page }) => {
        await page.goto('/events')

        // Check that "Portfolio" button is present
        await expect(
            page.locator('a[href="/photography"]').last()
        ).toBeVisible()
        await expect(
            page.locator('a[href="/photography"]').last()
        ).toContainText('Portfolio')
    })

    test('events display with correct information', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.events-grid section', { timeout: 10000 })

        // Check that at least one event is displayed
        const eventSections = page.locator('.events-grid section')
        const eventCount = await eventSections.count()

        if (eventCount > 0) {
            // Check first event has required elements
            const firstEvent = eventSections.first()

            // Check that event has a link
            await expect(firstEvent.locator('a')).toBeVisible()

            // Check that event has a title
            await expect(firstEvent.locator('h4')).toBeVisible()

            // Check that event has date and photo count
            await expect(firstEvent.locator('p.sub')).toBeVisible()

            // Check that date and photo count text is in correct format
            const dateAndCountText = await firstEvent
                .locator('p.sub')
                .textContent()
            expect(dateAndCountText).toMatch(/.*\d+ photos/)
        }
    })

    test('event links navigate to event detail page', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.events-grid section', { timeout: 10000 })

        const eventSections = page.locator('.events-grid section')
        const eventCount = await eventSections.count()

        if (eventCount > 0) {
            // Get the href of the first event
            const firstEventLink = eventSections.first().locator('a')
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
        await page.waitForSelector('.events-grid section', { timeout: 10000 })

        const eventSections = page.locator('.events-grid section')
        const eventCount = await eventSections.count()

        if (eventCount > 0) {
            // Click first event
            await eventSections.first().locator('a').click()

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
        await page.waitForSelector('.events-grid section', { timeout: 10000 })

        const eventSections = page.locator('.events-grid section')
        const eventCount = await eventSections.count()

        if (eventCount > 1) {
            // Get all event dates
            const eventDates = await eventSections
                .locator('p.sub')
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
        await expect(page.locator('.events-grid')).toBeVisible()

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/photography')
        await expect(page.locator('#gallery')).toBeVisible()

        await page.goto('/events')
        await expect(page.locator('.events-grid')).toBeVisible()
    })

    test('event detail page has back navigation', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.events-grid section', { timeout: 10000 })

        const eventSections = page.locator('.events-grid section')
        const eventCount = await eventSections.count()

        if (eventCount > 0) {
            // Click first event
            await eventSections.first().locator('a').click()

            // Check that back button exists
            await expect(page.locator('a[href="/events"]')).toBeVisible()
        }
    })
})
