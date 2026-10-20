import { test, expect } from '@playwright/test'

test.describe('Journal Page', () => {
    test('journal page loads correctly', async ({ page }) => {
        await page.goto('/journal')

        // Check page title
        await expect(page).toHaveTitle(/Journal/)

        // Check that the page has content
        await expect(page.locator('.archive')).toBeVisible()

        // Check the sidebar introduction
        await expect(page.locator('.sidebar-layout-aside')).toContainText(
            'I’ve kept an online journal since 2016'
        )
    })

    test('journal displays the entry archive', async ({ page }) => {
        await page.goto('/journal')

        await expect(page.locator('.archive')).toBeVisible()
        await expect(page.locator('.entries section').first()).toBeVisible()
    })

    test('journal displays word count', async ({ page }) => {
        await page.goto('/journal')

        // Check that word count is displayed
        await expect(
            page.locator('.sidebar-layout-aside .count')
        ).toContainText('Total words:')

        // Check that word count is a number with thousands separators
        const wordCountText = await page
            .locator('.sidebar-layout-aside .count')
            .textContent()
        expect(wordCountText).toMatch(/Total words: \d{1,3}(,\d{3})*/)
    })

    test('journal entries are clickable', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('.archive .entry-title a').first()
        await expect(firstEntry).toBeVisible()

        // Get the href attribute
        const href = await firstEntry.getAttribute('href')
        expect(href).toBeTruthy()

        // Click the entry
        await firstEntry.click()

        // Should navigate to the journal entry page
        await expect(page).toHaveURL(href!)
    })

    test('journal entry page loads correctly', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('.archive .entry-title a').first()
        await expect(firstEntry).toBeVisible()

        // Click the entry
        await firstEntry.click()

        // Check that we're on a journal entry page
        await expect(page.locator('article')).toBeVisible()

        // Check that there's a title
        await expect(page.locator('h1')).toBeVisible()

        // Check that there's content
        await expect(page.locator('article')).toBeVisible()
    })

    test('journal entry has reading time', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('.archive .entry-title a').first()
        await expect(firstEntry).toBeVisible()

        // Click the entry
        await firstEntry.click()

        // Reading time shows under the title, or in the sidebar once it fits
        const readingTime = page
            .locator('.header-meta, .facts')
            .filter({ visible: true })
        await expect(readingTime).toHaveCount(1)
        await expect(readingTime).toContainText(/\d+ min read/)
    })

    test('journal entry has publication date', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('.archive .entry-title a').first()
        await expect(firstEntry).toBeVisible()

        // Click the entry
        await firstEntry.click()

        // Check that publication date is displayed
        await expect(page.locator('header .sub').first()).toBeVisible()

        // Check that date is in a reasonable format
        const dateText = await page.locator('header .sub').first().textContent()
        expect(dateText).toMatch(/\w+ \d+, \d{4}/)
    })

    test('journal entry has back navigation', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('.archive .entry-title a').first()
        await expect(firstEntry).toBeVisible()

        // Click the entry
        await firstEntry.click()

        // Check that back button exists
        await expect(page.locator('a[href="/journal"]').last()).toBeVisible()

        // Navigate back to journal page
        await page.goto('/journal')

        // Should return to journal page
        await expect(page).toHaveURL('/journal')
    })

    test('journal entry has proper SEO', async ({ page }) => {
        await page.goto('/journal')

        // Find the first journal entry link
        const firstEntry = page.locator('.archive .entry-title a').first()
        await expect(firstEntry).toBeVisible()

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
    })

    test('journal page is responsive', async ({ page }) => {
        // Test desktop view
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/journal')
        await expect(page.locator('.archive')).toBeVisible()

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/journal')
        await expect(page.locator('.archive')).toBeVisible()
    })

    test('journal entries are sorted by date', async ({ page }) => {
        await page.goto('/journal')

        // Get all journal entry dates
        const entryDates = await page.locator('section time').allTextContents()
        expect(entryDates.length).toBeGreaterThan(1)

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
    })

    for (const viewport of [
        { width: 1280, height: 800 },
        { width: 375, height: 667 },
    ]) {
        test(`footnotes open inline within the viewport at ${viewport.width}px`, async ({
            page,
        }) => {
            await page.setViewportSize(viewport)
            await page.goto('/journal/30-going-on-13')

            await expect(page.locator('.footnotes')).toBeHidden()

            const refs = page.locator('a.footnote-ref')
            const count = await refs.count()
            expect(count).toBeGreaterThan(0)

            for (let i = 0; i < count; i++) {
                const ref = refs.nth(i)
                await ref.scrollIntoViewIfNeeded()
                await ref.click()

                const popover = page.locator(
                    `#${await ref.getAttribute('aria-controls')}`
                )
                await expect(popover).toBeVisible()
                await expect(ref).toHaveAttribute('aria-expanded', 'true')

                const box = await popover.boundingBox()
                expect(box).not.toBeNull()
                expect(box!.x).toBeGreaterThanOrEqual(0)
                expect(box!.y).toBeGreaterThanOrEqual(0)
                expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width)
                expect(box!.y + box!.height).toBeLessThanOrEqual(
                    viewport.height
                )

                await ref.click()
                await expect(popover).toBeHidden()
            }
        })
    }

    test('table of contents lists headings and jumps to them', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/journal/two-weeks-in-the-galapagos')

        const toc = page.locator('[data-test="toc"]')
        await expect(toc).toBeVisible()

        const links = toc.locator('a')
        await expect(links).toHaveText(
            ['Santa Cruz', 'Isabela', 'San Cristóbal', 'Itinerary'],
            { useInnerText: true }
        )

        const heading = page.locator('h2#isabela')
        await expect(heading).not.toBeInViewport()

        await links.filter({ hasText: 'Isabela' }).click()

        await expect(page).toHaveURL(/#isabela$/)
        await expect(heading).toBeInViewport()
    })

    test('footnote opens above when the reference is near the bottom', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/journal/30-going-on-13')

        await expect(page.locator('.footnotes')).toBeHidden()

        const ref = page.locator('a.footnote-ref').first()
        await ref.evaluate((el) => {
            const { top } = el.getBoundingClientRect()
            window.scrollBy({
                top: top - window.innerHeight + 40,
                behavior: 'instant',
            })
        })
        await ref.click()

        const popover = page.locator('.footnote-popover:popover-open')
        await expect(popover).toHaveAttribute('data-placement', 'top')

        await page.keyboard.press('Escape')
        await expect(popover).toHaveCount(0)
    })
})
