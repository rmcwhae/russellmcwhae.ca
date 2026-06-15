import { test, expect } from '@playwright/test'

const desktopSwitcher = '#desktop-switcher [data-test="theme-switcher"]'
const mobileSwitcher = '#mobile-switcher [data-test="theme-switcher"]'

async function openThemeMenu(page, switcher = desktopSwitcher) {
    if (switcher === mobileSwitcher) {
        await page.locator('.nav-toggle').click()
        await expect(page.locator('.nav-menu.active')).toBeVisible()
    }

    const themeSwitcher = page.locator(switcher)
    await themeSwitcher
        .getByRole('button', { name: 'Color scheme' })
        .click({ force: switcher === mobileSwitcher })
    await expect(themeSwitcher.getByRole('menu')).toBeVisible()
}

async function selectTheme(
    page,
    value: 'light' | 'dark' | 'system',
    switcher = desktopSwitcher
) {
    const themeSwitcher = page.locator(switcher)
    await openThemeMenu(page, switcher)
    await themeSwitcher.locator(`[data-test="theme-option-${value}"]`).click()
}

test.describe('Color Scheme Dropdown', () => {
    test.describe.configure({ mode: 'serial' })

    test('desktop color scheme switcher is visible on large screens', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await expect(page.locator('#desktop-switcher')).toBeVisible()
        await expect(page.locator(desktopSwitcher)).toBeVisible()
        await expect(page.locator('#mobile-switcher')).not.toBeVisible()
    })

    test('mobile color scheme switcher is visible on small screens', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/')

        await page.locator('.nav-toggle').click()

        await expect(page.locator('#mobile-switcher')).toBeVisible()
        await expect(page.locator(mobileSwitcher)).toBeVisible()
        await expect(page.locator('#desktop-switcher')).not.toBeVisible()
    })

    test('color scheme dropdown exists with menu options', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await openThemeMenu(page)

        const themeSwitcher = page.locator(desktopSwitcher)
        await expect(
            themeSwitcher.locator('[data-test="theme-option-light"]')
        ).toBeVisible()
        await expect(
            themeSwitcher.locator('[data-test="theme-option-dark"]')
        ).toBeVisible()
        await expect(
            themeSwitcher.locator('[data-test="theme-option-system"]')
        ).toBeVisible()
    })

    test('selecting light mode sets data-theme to light', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'light')

        await expect(page.locator('body')).toHaveAttribute('data-theme', 'light')
    })

    test('selecting dark mode sets data-theme to dark', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'dark')

        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark')
    })

    test('selecting system mode removes data-theme', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'light')
        await expect(page.locator('body')).toHaveAttribute('data-theme', 'light')

        await selectTheme(page, 'system')

        await expect(page.locator('body')).not.toHaveAttribute('data-theme')
    })

    test('color scheme selection persists across page navigation', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'dark')
        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark')

        await page.goto('/photography')
        await expect(page).toHaveURL('/photography')
        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark')
        await expect(page.locator(desktopSwitcher)).toBeVisible()
    })

    test('color scheme dropdown works in mobile menu', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/')

        await selectTheme(page, 'dark', mobileSwitcher)

        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark')
    })

    test('system mode respects OS dark preference', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'dark' })
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'system')

        await expect(page.locator('body')).not.toHaveAttribute('data-theme')
        await expect(page.locator('html')).toHaveCSS(
            '--high-contrast-color',
            'white'
        )
    })

    test('color scheme dropdown exists on all pages', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })

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
            await expect(page.locator(desktopSwitcher)).toBeAttached()
        }
    })
})
