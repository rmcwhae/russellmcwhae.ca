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

    $effect(() => {
        if (!browser) return

        const meta = document.querySelector('meta[name="color-scheme"]')
        if (!meta) return

        meta.setAttribute('content', $mode === 'system' ? 'light dark' : $mode)
    })

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
            if (event.key === 'Escape') {
                open = false
            }
        }

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

    /** @param {import('#lib/stores/theme.js').ThemeMode} value */
    function selectTheme(value) {
        mode.set(value)
        open = false
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

<div class="theme-switcher" data-test="theme-switcher" bind:this={rootElement}>
    <button
        type="button"
        class="theme-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Color scheme"
        onclick={toggleMenu}
    >
        <span class="theme-trigger-icon" aria-hidden="true">
            {@render icon($mode)}
        </span>
    </button>

    {#if open}
        <ul
            id={menuId}
            class="theme-menu"
            role="menu"
            aria-label="Color scheme options"
        >
            {#each options as value (value)}
                <li role="none">
                    <button
                        type="button"
                        class="theme-option"
                        class:active={$mode === value}
                        role="menuitemradio"
                        aria-checked={$mode === value}
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
        outline: none;
    }

    .theme-trigger-icon,
    .theme-option-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.15rem;
        height: 1.15rem;
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
        font-weight: 700;
        background: var(--background-color);
    }

    .theme-option-label {
        white-space: nowrap;
        font-family: var(--font-sans);
        font-size: 0.85rem;
    }
</style>
