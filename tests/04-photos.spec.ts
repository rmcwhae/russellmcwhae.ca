import { test, expect } from '@playwright/test'

test.describe('Photos and Events', () => {
    test('photography page loads correctly', async ({ page }) => {
        await page.goto('/photography')

        // Check page title
        await expect(page).toHaveTitle(/Photography/)

        // Check main heading
        await expect(page.locator('h1')).toContainText('Photography')

        // Check that gallery is present
        await expect(page.locator('#gallery')).toBeVisible()
    })

    test('photography thumbnails have blurred placeholders', async ({
        page,
    }) => {
        await page.goto('/photography')

        const tile = page.locator('#gallery .has-lqip').first()
        await expect(tile).toBeVisible()
        const lqip = await tile.evaluate((el) =>
            el.style.getPropertyValue('--lqip')
        )
        expect(lqip).toContain('data:image/webp;base64,')
    })

    test('photography page has links to events and calendars', async ({
        page,
    }) => {
        await page.goto('/photography')

        const expeditions = page.locator('a[href="/events"]')
        await expect(expeditions).toBeVisible()
        await expect(expeditions).toContainText('Field expeditions')

        const calendars = page.locator('a[href="/calendars"]')
        await expect(calendars).toBeVisible()
        await expect(calendars).toContainText('Looking for calendars?')
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

    test('events page describes the expedition archive', async ({ page }) => {
        await page.goto('/events')

        await expect(page.locator('.lede')).toContainText(
            'Complete photo sets from individual trips.'
        )
        await expect(page.locator('.archive')).toBeVisible()
        await expect(page.locator('.year-group').first()).toBeVisible()
    })

    test('events display with correct information', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-card', { timeout: 10000 })

        const eventCards = page.locator('.event-card')
        const eventCount = await eventCards.count()
        expect(eventCount).toBeGreaterThan(0)

        const firstEvent = eventCards.first()

        await expect(firstEvent).toBeVisible()
        await expect(firstEvent.locator('.event-title')).toBeVisible()
        await expect(page.locator('.year-label').first()).toBeVisible()
    })

    test('event links navigate to event detail page', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-card', { timeout: 10000 })

        const eventCards = page.locator('.event-card')
        const eventCount = await eventCards.count()
        expect(eventCount).toBeGreaterThan(0)

        const firstEventLink = eventCards.first()
        const href = await firstEventLink.getAttribute('href')
        expect(href).toBeTruthy()

        // Click the event
        await firstEventLink.click()

        // Should navigate to event detail page
        await expect(page).toHaveURL(href!)

        // Check that we're on an event detail page
        await expect(page.locator('h1')).toBeVisible()
    })

    test('event detail page displays images', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-card', { timeout: 10000 })

        const eventCards = page.locator('.event-card')
        const eventCount = await eventCards.count()
        expect(eventCount).toBeGreaterThan(0)

        // Click first event
        await eventCards.first().click()

        // Wait for images to load
        await page.waitForSelector('img', { timeout: 10000 })

        // Check that images are present
        const images = page.locator('img')
        const imageCount = await images.count()
        expect(imageCount).toBeGreaterThan(0)
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
        expect(imageCount).toBeGreaterThan(0)

        // Click first image
        await images.first().click()

        // Check that PhotoSwipe lightbox opens
        await expect(page.locator('.pswp')).toBeVisible()
    })

    test('PhotoSwipe lightbox functionality', async ({ page }) => {
        await page.goto('/photography')

        // Wait for images to load
        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()
        expect(imageCount).toBeGreaterThan(0)

        // Click first image to open lightbox
        await images.first().click()

        // Check that lightbox is open
        await expect(page.locator('.pswp')).toBeVisible()

        // Check that lightbox has navigation buttons (may be hidden on mobile)
        await expect(page.locator('.pswp__button--arrow--next')).toBeAttached()

        // Check that lightbox is functional by verifying it has the expected structure
        await expect(page.locator('.pswp__button--close')).toBeVisible()

        // Check that lightbox has the expected classes
        const lightboxClasses = await page
            .locator('.pswp')
            .getAttribute('class')
        expect(lightboxClasses).toContain('pswp--open')

        // The active slide shows the image rather than a placeholder
        await expect(
            page.locator(
                '.pswp__item[aria-hidden="false"] img.pswp__img:not(.pswp__img--placeholder)'
            )
        ).toBeVisible()
    })

    test('images have proper alt text', async ({ page }) => {
        await page.goto('/photography')

        // Wait for images to load
        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()
        expect(imageCount).toBeGreaterThan(0)

        // Check that first image has alt text
        const firstImage = images.first()
        const altText = await firstImage.getAttribute('alt')
        expect(altText).toBeTruthy()
    })

    test('events are sorted by date', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.year-label', { timeout: 10000 })

        const yearLabels = page.locator('.year-label')
        const yearCount = await yearLabels.count()
        expect(yearCount).toBeGreaterThan(1)

        const years = (await yearLabels.allTextContents())
            .map((text) => Number(text.trim()))
            .filter((year) => Number.isInteger(year))

        // Check that years are in descending order (newest first)
        for (let i = 0; i < years.length - 1; i++) {
            expect(years[i]).toBeGreaterThanOrEqual(years[i + 1])
        }
    })

    test('photography and events pages are responsive', async ({ page }) => {
        // Test desktop view
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/photography')
        await expect(page.locator('#gallery')).toBeVisible()

        await page.goto('/events')
        await expect(page.locator('.archive')).toBeVisible()
        await expect(page.locator('.event-card').first()).toBeVisible()

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/photography')
        await expect(page.locator('#gallery')).toBeVisible()

        await page.goto('/events')
        await expect(page.locator('.archive')).toBeVisible()
        await expect(page.locator('.event-card').first()).toBeVisible()
    })

    test('event detail page has back navigation', async ({ page }) => {
        await page.goto('/events')

        // Wait for events to load
        await page.waitForSelector('.event-card', { timeout: 10000 })

        const eventCards = page.locator('.event-card')
        const eventCount = await eventCards.count()
        expect(eventCount).toBeGreaterThan(0)

        // Click first event
        await eventCards.first().click()

        const back = page.locator('a[href="/events"]')
        await expect(back).toBeVisible()
        await expect(back).toContainText('Field Expeditions')
    })
})
