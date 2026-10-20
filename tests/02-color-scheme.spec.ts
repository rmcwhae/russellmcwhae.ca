import { test, expect, type Page } from '@playwright/test'

const desktopSwitcher = '#desktop-switcher [data-test="theme-switcher"]'
const mobileSwitcher = '#mobile-switcher [data-test="theme-switcher"]'

async function openThemeMenu(page: Page, switcher = desktopSwitcher) {
    const themeSwitcher = page.locator(switcher)
    const button = themeSwitcher.getByRole('button', { name: 'Color scheme' })

    // The load event can fire before Svelte hydrates, and a click in that
    // gap is ignored. Wait until the client has attached the menu handler.
    await page.waitForFunction((selector) => {
        const element = document.querySelector(`${selector} button`)
        if (!element) return false

        return Object.getOwnPropertySymbols(element).some((symbol) =>
            String(symbol).includes('events')
        )
    }, switcher)

    await button.click()
    await expect(themeSwitcher.getByRole('menu')).toBeVisible()
}

async function selectTheme(
    page: Page,
    value: 'light' | 'dark' | 'system',
    switcher = desktopSwitcher
) {
    const themeSwitcher = page.locator(switcher)
    await openThemeMenu(page, switcher)
    await themeSwitcher.locator(`[data-test="theme-option-${value}"]`).click()
}

test.describe('Color Scheme Dropdown', () => {
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

    test('selecting light mode sets color-scheme to light', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'light')

        await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
            'content',
            'light'
        )
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            'rgb(247, 246, 242)'
        )
    })

    test('selecting dark mode sets color-scheme to dark', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'dark')

        await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
            'content',
            'dark'
        )
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            'rgb(19, 21, 20)'
        )
    })

    test('the first light/dark switch does not change type size', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')
        await page.evaluate(() => document.fonts.ready)

        const sizes = () =>
            page.evaluate(() => {
                const take = (selector) => {
                    const el = document.querySelector(selector)
                    if (!el) return null
                    const cs = getComputedStyle(el)
                    return {
                        fontSize: cs.fontSize,
                        adjust: cs.fontSizeAdjust,
                    }
                }
                return {
                    body: take('body'),
                    h1: take('h1'),
                    lede: take('.lede'),
                    eyebrow: take('.eyebrow'),
                    logo: take('#logo a'),
                }
            })

        const before = await sizes()
        await selectTheme(page, 'dark')
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            'rgb(19, 21, 20)'
        )
        expect(await sizes()).toEqual(before)

        await selectTheme(page, 'light')
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            'rgb(247, 246, 242)'
        )
        expect(await sizes()).toEqual(before)
    })

    test('selecting system mode follows the operating system', async ({
        page,
    }) => {
        await page.emulateMedia({ colorScheme: 'dark' })
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'light')
        await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
            'content',
            'light'
        )

        await selectTheme(page, 'system')

        await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
            'content',
            'light dark'
        )
        await expect(page.locator('body')).toHaveCSS(
            'background-color',
            'rgb(19, 21, 20)'
        )
    })

    test('color scheme selection persists across page navigation', async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1200, height: 800 })
        await page.goto('/')

        await selectTheme(page, 'dark')
        await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
            'content',
            'dark'
        )

        await page.goto('/photography')
        await expect(page).toHaveURL('/photography')
        await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
            'content',
            'dark'
        )
        await expect(page.locator(desktopSwitcher)).toBeVisible()
    })

    test('color scheme dropdown works on a small screen', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/')

        await selectTheme(page, 'dark', mobileSwitcher)

        await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute(
            'content',
            'dark'
        )
    })

    test('color scheme dropdown exists on all pages', async ({ page }) => {
        await page.setViewportSize({ width: 1200, height: 800 })

        const pages = ['/', '/photography', '/journal', '/about', '/calendars']

        for (const pagePath of pages) {
            await page.goto(pagePath)
            await expect(page.locator(desktopSwitcher)).toBeAttached()
        }
    })
})
