<script>
    import { browser } from '$app/env'
    import { mode } from '#lib/stores/theme.js'

    /** @type {{ instanceId?: string }} */
    let { instanceId = 'default' } = $props()

    const menuId = $derived(`theme-menu-${instanceId}`)

    /** @type {import('#lib/stores/theme.js').ThemeMode[]} */
    const options = ['light', 'dark', 'system']

    /** @type {Record<import('#lib/stores/theme.js').ThemeMode, string>} */
    const labels = {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
    }

    let open = $state(false)
    /** @type {HTMLDivElement | null} */
    let rootElement = $state(null)
    /** @type {HTMLButtonElement | null} */
    let triggerElement = $state(null)
    /** @type {HTMLUListElement | null} */
    let menuElement = $state(null)

    $effect(() => {
        if (!browser) return

        const meta = document.querySelector('meta[name="color-scheme"]')
        if (!meta) return

        meta.setAttribute('content', $mode === 'system' ? 'light dark' : $mode)
        applyThemeColor($mode)
    })

    // The browser toolbar follows prefers-color-scheme unless a choice
    // overrides it, so every theme-color meta takes the chosen colour
    /** @param {import('#lib/stores/theme.js').ThemeMode} value */
    function applyThemeColor(value) {
        const metas = /** @type {NodeListOf<HTMLMetaElement>} */ (
            document.querySelectorAll('meta[name="theme-color"]')
        )
        const chosen = [...metas].find((meta) => meta.dataset.scheme === value)

        for (const meta of metas) {
            meta.content = (chosen ?? meta).dataset.color ?? meta.content
        }
    }

    $effect(() => {
        if (!browser || !open) return

        /** @param {MouseEvent} event */
        function handleClickOutside(event) {
            if (!rootElement?.contains(/** @type {Node} */ (event.target))) {
                open = false
            }
        }

        /** @param {KeyboardEvent} event */
        function handleKeydown(event) {
            if (event.key === 'Escape') closeMenu()
        }

        // Start on the checked option, as the menu pattern expects
        const checked = /** @type {HTMLElement | null | undefined} */ (
            menuElement?.querySelector('[aria-checked="true"]')
        )
        checked?.focus()

        const timeoutId = setTimeout(() => {
            document.addEventListener('click', handleClickOutside)
        }, 0)

        document.addEventListener('keydown', handleKeydown)

        return () => {
            clearTimeout(timeoutId)
            document.removeEventListener('click', handleClickOutside)
            document.removeEventListener('keydown', handleKeydown)
        }
    })

    // Closing from inside the menu would otherwise drop focus to <body>
    function closeMenu() {
        const hadFocus = rootElement?.contains(document.activeElement)
        open = false
        if (hadFocus) triggerElement?.focus()
    }

    /** @param {import('#lib/stores/theme.js').ThemeMode} value */
    function selectTheme(value) {
        mode.set(value)
        closeMenu()
    }

    /** @param {KeyboardEvent} event */
    function handleMenuKeydown(event) {
        const items = [
            ...(menuElement?.querySelectorAll('[role="menuitemradio"]') ?? []),
        ]
        const current = items.indexOf(
            /** @type {Element} */ (document.activeElement)
        )
        /** @type {Record<string, number>} */
        const targets = {
            ArrowDown: (current + 1) % items.length,
            ArrowUp: (current - 1 + items.length) % items.length,
            Home: 0,
            End: items.length - 1,
        }
        if (!(event.key in targets)) return
        event.preventDefault()
        const target = /** @type {HTMLElement} */ (items[targets[event.key]])
        target.focus()
    }

    /** @param {FocusEvent} event */
    function handleFocusout(event) {
        const next = /** @type {Node | null} */ (event.relatedTarget)
        if (open && next && !rootElement?.contains(next)) open = false
    }

    /** @param {MouseEvent} event */
    function toggleMenu(event) {
        event.stopPropagation()
        open = !open
    }
</script>

{#snippet icon(/** @type {import('#lib/stores/theme.js').ThemeMode} */ value)}
    {#if value === 'light'}
        <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4" />
            <rect x="11.25" y="3" width="1.5" height="3.5" rx="0.75" />
            <rect
                x="11.25"
                y="3"
                width="1.5"
                height="3.5"
                rx="0.75"
                transform="rotate(45 12 12)"
            />
            <rect
                x="11.25"
                y="3"
                width="1.5"
                height="3.5"
                rx="0.75"
                transform="rotate(90 12 12)"
            />
            <rect
                x="11.25"
                y="3"
                width="1.5"
                height="3.5"
                rx="0.75"
                transform="rotate(135 12 12)"
            />
            <rect
                x="11.25"
                y="3"
                width="1.5"
                height="3.5"
                rx="0.75"
                transform="rotate(180 12 12)"
            />
            <rect
                x="11.25"
                y="3"
                width="1.5"
                height="3.5"
                rx="0.75"
                transform="rotate(225 12 12)"
            />
            <rect
                x="11.25"
                y="3"
                width="1.5"
                height="3.5"
                rx="0.75"
                transform="rotate(270 12 12)"
            />
            <rect
                x="11.25"
                y="3"
                width="1.5"
                height="3.5"
                rx="0.75"
                transform="rotate(315 12 12)"
            />
        </svg>
    {:else if value === 'dark'}
        <svg viewBox="0 0 512 512">
            <path
                d="M401.4 354.2c-2.9.1-5.8.2-8.7.2-47.9 0-93-18.9-126.8-53.4-33.9-34.4-52.5-80.1-52.5-128.8 0-27.7 6.1-54.5 17.5-78.7 3.1-6.6 9.3-16.6 13.6-23.4 1.9-2.9-.5-6.7-3.9-6.1-6 .9-15.2 2.9-27.7 6.8C135.1 95.5 80 168.7 80 255c0 106.6 85.1 193 190.1 193 58 0 110-26.4 144.9-68.1 6-7.2 11.5-13.8 16.4-21.8 1.8-3-.7-6.7-4.1-6.1-8.5 1.7-17.1 1.8-25.9 2.2z"
            />
        </svg>
    {:else}
        <svg viewBox="0 0 24 24" class="system-icon">
            <circle
                cx="12"
                cy="12"
                r="10"
                fill="transparent"
                stroke="currentColor"
                stroke-width="1"
            />
            <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
        </svg>
    {/if}
{/snippet}

<div
    class="theme-switcher"
    data-test="theme-switcher"
    bind:this={rootElement}
    onfocusout={handleFocusout}
>
    <button
        type="button"
        class="theme-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Color scheme"
        bind:this={triggerElement}
        onclick={toggleMenu}
    >
        <!-- All three render so CSS can pick one from the color-scheme meta,
             which app.html sets before first paint; $mode isn’t known until
             hydration -->
        {#each options as value (value)}
            <span
                class="theme-trigger-icon theme-trigger-icon-{value}"
                aria-hidden="true"
            >
                {@render icon(value)}
            </span>
        {/each}
    </button>

    {#if open}
        <ul
            id={menuId}
            class="theme-menu"
            role="menu"
            aria-label="Color scheme options"
            bind:this={menuElement}
            onkeydown={handleMenuKeydown}
        >
            {#each options as value (value)}
                <li role="none">
                    <button
                        type="button"
                        class="theme-option"
                        class:active={$mode === value}
                        role="menuitemradio"
                        aria-checked={$mode === value}
                        tabindex="-1"
                        data-test="theme-option-{value}"
                        onclick={() => selectTheme(value)}
                    >
                        <span class="theme-option-icon" aria-hidden="true">
                            {@render icon(value)}
                        </span>
                        <span class="theme-option-label">{labels[value]}</span>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    .theme-switcher {
        position: relative;
        width: 2rem;
    }

    .theme-trigger,
    .theme-option {
        color: var(--high-contrast-color);
        background: transparent;
        border: none;
        cursor: pointer;
        font: inherit;
    }

    .theme-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        padding: 0;
    }

    .theme-trigger:hover,
    .theme-option:hover,
    .theme-option:focus-visible {
        color: var(--alpine);
    }

    // Inset so the ring stays inside the menu’s padding
    .theme-option:focus-visible {
        outline-offset: -2px;
    }

    .theme-trigger-icon,
    .theme-option-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.15rem;
        height: 1.15rem;
    }

    // The trigger shows the icon matching the color-scheme meta
    .theme-trigger-icon-light,
    .theme-trigger-icon-dark,
    :global(html:has(meta[name='color-scheme'][content='light']))
        .theme-trigger-icon-system,
    :global(html:has(meta[name='color-scheme'][content='dark']))
        .theme-trigger-icon-system {
        display: none;
    }

    :global(html:has(meta[name='color-scheme'][content='light']))
        .theme-trigger-icon-light,
    :global(html:has(meta[name='color-scheme'][content='dark']))
        .theme-trigger-icon-dark {
        display: flex;
    }

    :global(.theme-trigger-icon svg),
    :global(.theme-option-icon svg) {
        fill: currentColor;
        width: 1.15rem;
        height: 1.15rem;
    }

    .system-icon {
        width: 1.15rem;
        height: 1.15rem;
        display: block;
    }

    .theme-menu {
        position: absolute;
        top: calc(100% + var(--s-2));
        right: 0;
        z-index: 20;
        min-width: 9.5rem;
        margin: 0;
        padding: var(--s-3);
        list-style: none;
        background: var(--light-grey);
        box-shadow: 0 4px 12px rgb(0 0 0 / 12%);
    }

    .theme-option {
        display: flex;
        align-items: center;
        gap: var(--s-2);
        width: 100%;
        padding: var(--s-2) var(--s-1);
        border: none;
        text-align: left;
    }

    .theme-option.active {
        font-weight: 600;
        background: var(--background-color);
    }

    .theme-option-label {
        white-space: nowrap;
        font-family: var(--font-sans);
        font-size: var(--text-xs);
    }
</style>
