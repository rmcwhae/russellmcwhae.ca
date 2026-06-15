import { test, expect } from '@playwright/test'

test.describe('Journal Page', () => {
    test('journal page loads correctly', async ({ page }) => {
        await page.goto('/journal')

        // Check page title
        await expect(page).toHaveTitle(/Journal/)

        // Check that the page has content
        await expect(page.locator('.journal.restricted-width')).toBeVisible()

        // Check welcome text
        await expect(page.locator('.journal-intro p').first()).toContainText(
            'Welcome to my online journal'
        )

        await expect(
            page.locator('.journal-intro a[href="/reading-list"]')
        ).toBeVisible()
    })

    test('journal displays posts grouped by year', async ({ page }) => {
        await page.goto('/journal')

        await expect(page.locator('.archive').first()).toBeVisible()
        await expect(
            page.locator('.year-group .year-label').first()
        ).toBeVisible()
        await expect(page.locator('.year-group section').first()).toBeVisible()
    })

    test('journal displays category selector', async ({ page }) => {
        await page.goto('/journal')

        const selector = page.locator('.category-selector')
        await expect(selector).toBeVisible()
        await expect(
            selector.getByRole('heading', { name: 'Categories' })
        ).toBeVisible()

        await expect(
            selector.getByRole('link', { name: 'Tech' })
        ).toHaveAttribute('href', '/journal/category/Tech')
        await expect(
            selector.getByRole('link', { name: 'Reflection' })
        ).toHaveAttribute('href', '/journal/category/Reflection')
        await expect(
            selector.getByRole('link', { name: 'Outdoor' })
        ).toHaveAttribute('href', '/journal/category/Outdoor')

        await selector.getByRole('link', { name: 'Tech' }).click()
        await expect(page).toHaveURL('/journal/category/Tech')
    })

    test('journal displays writing stats', async ({ page }) => {
        await page.goto('/journal')

        const stats = page.locator('.journal-stats')
        await expect(stats).toContainText('Writing since')
        await expect(stats).toContainText(/essays?/)
        await expect(stats).toContainText(/words/)

        const statsText = await stats.textContent()
        expect(statsText).toMatch(/Writing since \d{4}/)
        expect(statsText).toMatch(/\d[\d,]* essays?/)
        expect(statsText).toMatch(/\d[\d,]* words/)
    })

    test('journal entries are clickable', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('section h3 a').first()

        if (await firstEntry.isVisible()) {
            // Get the href attribute
            const href = await firstEntry.getAttribute('href')

            // Click the entry
            await firstEntry.click()

            // Should navigate to the journal entry page
            if (href) {
                await expect(page).toHaveURL(href)
            }
        }
    })

    test('journal entry page loads correctly', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('section h3 a').first()

        if (await firstEntry.isVisible()) {
            // Click the entry
            await firstEntry.click()

            // Check that we're on a journal entry page
            await expect(page.locator('article')).toBeVisible()

            // Check that there's a title
            await expect(page.locator('h1')).toBeVisible()

            // Check that there's content
            await expect(page.locator('article')).toBeVisible()
        }
    })

    test('journal entry has reading time', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('section h3 a').first()

        if (await firstEntry.isVisible()) {
            // Click the entry
            await firstEntry.click()

            // Check that reading time is displayed
            await expect(page.locator('header .sub').last()).toBeVisible()

            // Check that reading time contains "min read"
            const readingTimeText = await page
                .locator('header .sub')
                .last()
                .textContent()
            expect(readingTimeText).toMatch(/\d+ min read/)
        }
    })

    test('journal entry has publication date', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('section h3 a').first()

        if (await firstEntry.isVisible()) {
            // Click the entry
            await firstEntry.click()

            // Check that publication date is displayed
            await expect(
                page.locator('header .entry-meta').first()
            ).toBeVisible()

            // Check that date is in a reasonable format
            const dateText = await page
                .locator('header .entry-meta time')
                .first()
                .textContent()
            expect(dateText).toMatch(/\w+ \d+, \d{4}/)
        }
    })

    test('journal entry has back navigation', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('section h3 a').first()

        if (await firstEntry.isVisible()) {
            // Click the entry
            await firstEntry.click()

            // Check that back button exists
            await expect(
                page.locator('a[href="/journal"]').last()
            ).toBeVisible()

            // Navigate back to journal page
            await page.goto('/journal')

            // Should return to journal page
            await expect(page).toHaveURL('/journal')
        }
    })

    test('journal entry has proper SEO', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('section h3 a').first()

        if (await firstEntry.isVisible()) {
            // Click the entry
            await firstEntry.click()

            // Check that page has a title
            const title = await page.title()
            expect(title).toBeTruthy()
            expect(title.length).toBeGreaterThan(0)
            expect(title).toContain('Russell')

            // Check that page has meta description
            const metaDescription = await page
                .locator('meta[name="description"]')
                .getAttribute('content')
            expect(metaDescription).toBeTruthy()
        }
    })

    test('journal page is responsive', async ({ page }) => {
        // Test desktop view
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/journal')
        await expect(page.locator('.journal.restricted-width')).toBeVisible()

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/journal')
        await expect(page.locator('.journal.restricted-width')).toBeVisible()
    })

    test('journal entries are sorted by date', async ({ page }) => {
        await page.goto('/journal')

        // Get all journal entry dates
        const entryDates = await page.locator('section time').allTextContents()

        if (entryDates.length > 1) {
            // Convert dates to Date objects for comparison
            const dates = entryDates
                .map((dateStr) => {
                    // Handle different date formats
                    const date = new Date(dateStr)
                    return isNaN(date.getTime()) ? null : date
                })
                .filter(Boolean)

            // Check that dates are in descending order (newest first)
            for (let i = 0; i < dates.length - 1; i++) {
                if (dates[i] && dates[i + 1]) {
                    expect(dates[i].getTime()).toBeGreaterThanOrEqual(
                        dates[i + 1].getTime()
                    )
                }
            }
        }
    })
})
