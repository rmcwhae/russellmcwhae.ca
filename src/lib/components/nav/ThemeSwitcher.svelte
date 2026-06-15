<script>
    import { browser } from '$app/environment'
    import { mode } from '$lib/stores/theme'

    import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
    import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte'

    /** @type {{ instanceId?: string }} */
    let { instanceId = 'default' } = $props()

    const menuId = `theme-menu-${instanceId}`

    /** @type {import('$lib/stores/theme').ThemeMode[]} */
    const options = ['light', 'dark', 'system']

    /** @type {Record<import('$lib/stores/theme').ThemeMode, string>} */
    const labels = {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
    }

    let open = $state(false)
    let rootElement = $state(null)

    $effect(() => {
        if (!browser) return

        if ($mode === 'system') {
            window.document.body.removeAttribute('data-theme')
        } else {
            window.document.body.setAttribute('data-theme', $mode)
        }
    })

    $effect(() => {
        if (!browser || !open) return

        function handleClickOutside(event) {
            if (!rootElement?.contains(event.target)) {
                open = false
            }
        }

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

    /** @param {import('$lib/stores/theme').ThemeMode} value */
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
            {#if $mode === 'light'}
                <IoMdSunny />
            {:else if $mode === 'dark'}
                <IoIosMoon />
            {:else}
                <svg viewBox="0 0 24 24" class="system-icon">
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="#fff"
                        stroke="currentColor"
                        stroke-width="1"
                    />
                    <path d="M12 2a10 10 0 0 1 0 20z" fill="#000" />
                </svg>
            {/if}
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
                            {#if value === 'light'}
                                <IoMdSunny />
                            {:else if value === 'dark'}
                                <IoIosMoon />
                            {:else}
                                <svg viewBox="0 0 24 24" class="system-icon">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        fill="#fff"
                                        stroke="currentColor"
                                        stroke-width="1"
                                    />
                                    <path
                                        d="M12 2a10 10 0 0 1 0 20z"
                                        fill="#000"
                                    />
                                </svg>
                            {/if}
                        </span>
                        <span class="theme-option-label">{labels[value]}</span>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .theme-switcher {
        position: relative;
        width: 44px;
    }

    .theme-trigger,
    .theme-option {
        color: var(--high-contrast-color);
        background: transparent;
        border: 1px solid var(--high-contrast-color);
        cursor: pointer;
        font: inherit;
    }

    .theme-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 32px;
        border-radius: 999px;
        padding: 0;
    }

    .theme-trigger:hover,
    .theme-option:hover,
    .theme-trigger:focus-visible,
    .theme-option:focus-visible {
        color: var(--link-color);
        border-color: var(--link-color);
        outline: none;
    }

    .theme-trigger-icon,
    .theme-option-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
    }

    :global(.theme-trigger-icon svg),
    :global(.theme-option-icon svg) {
        fill: currentColor;
        width: 18px;
        height: 18px;
    }

    .system-icon {
        width: 18px;
        height: 18px;
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
        background: var(--background-color);
        border: 1px solid var(--light-grey);
        border-radius: var(--radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    .theme-option {
        display: flex;
        align-items: center;
        gap: var(--s-2);
        width: 100%;
        padding: var(--s-2) var(--s-1);
        border: none;
        border-radius: var(--radius);
        text-align: left;
    }

    .theme-option.active {
        font-weight: 600;
        background: var(--light-grey);
    }

    .theme-option-label {
        white-space: nowrap;
        font-family: var(--font-sans);
    }

    @include for-tablet-portrait-down {
        .theme-switcher {
            width: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .theme-menu {
            position: static;
            transform: none;
            left: auto;
            right: auto;
            margin-top: var(--s-2);
        }
    }
</style>
