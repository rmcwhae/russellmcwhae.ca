import { test, expect } from '@playwright/test'

test.describe('Photography landing page', () => {
    test('landing page loads with three section cards', async ({ page }) => {
        await page.goto('/photography')

        await expect(page).toHaveTitle(/Photography/)
        await expect(page.locator('h1')).toContainText('Photography')

        const cards = page.locator('.three-col-grid .section-card')
        await expect(cards).toHaveCount(3)

        await expect(
            page.locator('.section-card[href="/portfolio"]')
        ).toBeVisible()
        await expect(
            page.locator('.section-card[href="/field-expeditions"]')
        ).toBeVisible()
        await expect(
            page.locator('.section-card[href="/calendars"]')
        ).toBeVisible()
    })
})

test.describe('Portfolio', () => {
    test('portfolio page loads correctly', async ({ page }) => {
        await page.goto('/portfolio')

        await expect(page).toHaveTitle(/Portfolio/)
        await expect(page.locator('h1')).toContainText('Portfolio')
        await expect(page.locator('#gallery')).toBeVisible()
    })

    test('portfolio page links to its sibling sections', async ({ page }) => {
        await page.goto('/portfolio')

        await expect(
            page.locator(
                '.elsewhere-row[href="/field-expeditions"]'
            )
        ).toBeVisible()
        await expect(
            page.locator('.elsewhere-row[href="/calendars"]')
        ).toBeVisible()
    })

    test('portfolio gallery displays images', async ({ page }) => {
        await page.goto('/portfolio')

        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()
        expect(imageCount).toBeGreaterThan(0)
    })

    test('portfolio gallery images are clickable', async ({ page }) => {
        await page.goto('/portfolio')

        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()

        if (imageCount > 0) {
            await images.first().click()
            await expect(page.locator('.pswp')).toBeVisible()
        }
    })

    test('PhotoSwipe lightbox functionality', async ({ page }) => {
        await page.goto('/portfolio')

        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()

        if (imageCount > 0) {
            await images.first().click()

            await expect(page.locator('.pswp')).toBeVisible()
            await expect(
                page.locator('.pswp__button--arrow--next')
            ).toBeAttached()
            await expect(page.locator('.pswp__button--close')).toBeVisible()

            const lightboxClasses = await page
                .locator('.pswp')
                .getAttribute('class')
            expect(lightboxClasses).toContain('pswp--open')
            expect(lightboxClasses).toContain('pswp--zoom-allowed')
        }
    })

    test('images have proper alt text', async ({ page }) => {
        await page.goto('/portfolio')

        await page.waitForSelector('#gallery img', { timeout: 10000 })

        const images = page.locator('#gallery img')
        const imageCount = await images.count()

        if (imageCount > 0) {
            const altText = await images.first().getAttribute('alt')
            expect(altText).toBeTruthy()
        }
    })
})

test.describe('Field Expeditions', () => {
    test('field expeditions page loads correctly', async ({ page }) => {
        await page.goto('/field-expeditions')

        await expect(page).toHaveTitle(/Field Expeditions/)
        await expect(page.locator('h1')).toContainText('Field Expeditions')
        await expect(page.locator('.archive')).toBeVisible()
    })

    test('expeditions display with correct information and thumbnails', async ({
        page,
    }) => {
        await page.goto('/field-expeditions')

        await page.waitForSelector('.year-items .event-row', {
            timeout: 10000,
        })

        const rows = page.locator('.year-items .event-row')
        const rowCount = await rows.count()

        if (rowCount > 0) {
            const firstRow = rows.first()

            await expect(firstRow.locator('.event-thumb img')).toBeVisible()
            await expect(firstRow.locator('.event-title')).toBeVisible()
            await expect(firstRow.locator('.event-meta')).toBeVisible()

            const metaText = await firstRow.locator('.event-meta').textContent()
            expect(metaText).toMatch(/\d+\s*photos/)
        }
    })

    test('expedition links navigate to detail page', async ({ page }) => {
        await page.goto('/field-expeditions')

        await page.waitForSelector('.year-items .event-row', {
            timeout: 10000,
        })

        const rows = page.locator('.year-items .event-row')
        const rowCount = await rows.count()

        if (rowCount > 0) {
            const href = await rows.first().getAttribute('href')

            if (href) {
                await rows.first().click()
                await expect(page).toHaveURL(href)
                await expect(page.locator('h1')).toBeVisible()
            }
        }
    })

    test('expedition detail page displays images and back link', async ({
        page,
    }) => {
        await page.goto('/field-expeditions')

        await page.waitForSelector('.year-items .event-row', {
            timeout: 10000,
        })

        const rows = page.locator('.year-items .event-row')
        const rowCount = await rows.count()

        if (rowCount > 0) {
            await rows.first().click()

            await page.waitForSelector('img', { timeout: 10000 })
            const images = page.locator('img')
            expect(await images.count()).toBeGreaterThan(0)

            const backLink = page.locator(
                'a[href="/field-expeditions"]'
            )
            await expect(backLink).toBeVisible()
            await expect(backLink).toContainText('Field Expeditions')
        }
    })

    test('the filter input narrows the list', async ({ page }) => {
        await page.goto('/field-expeditions')

        await page.waitForSelector('.year-items .event-row', {
            timeout: 10000,
        })

        const initialCount = await page
            .locator('.year-items .event-row')
            .count()
        expect(initialCount).toBeGreaterThan(0)

        await page.fill('.archive-search', 'this-should-match-nothing-zzzzzzzz')
        await expect(page.locator('.no-results')).toBeVisible()
    })

    test('expeditions are sorted by date, newest first', async ({ page }) => {
        await page.goto('/field-expeditions')

        await page.waitForSelector('.year-group', { timeout: 10000 })

        const yearLabels = await page.locator('.year-label').allTextContents()
        const years = yearLabels.map((y) => parseInt(y, 10)).filter(Boolean)

        for (let i = 0; i < years.length - 1; i++) {
            expect(years[i]).toBeGreaterThanOrEqual(years[i + 1])
        }
    })
})

test.describe('Calendars', () => {
    test('calendars page shows the Photography kicker', async ({ page }) => {
        await page.goto('/calendars')

        await expect(page.locator('h1')).toContainText('Calendars')
        await expect(page.locator('header .kicker')).toContainText(
            'Photography'
        )
    })
})

test.describe('Photography section responsiveness', () => {
    test('portfolio and field expeditions pages are responsive', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/portfolio')
        await expect(page.locator('#gallery')).toBeVisible()

        await page.goto('/field-expeditions')
        await expect(page.locator('.archive')).toBeVisible()

        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/portfolio')
        await expect(page.locator('#gallery')).toBeVisible()

        await page.goto('/field-expeditions')
        await expect(page.locator('.archive')).toBeVisible()
    })
})
