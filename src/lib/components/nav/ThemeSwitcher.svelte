<script>
    import { browser } from '$app/env'
    import { mode } from '#lib/stores/theme.js'
    import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
    import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte'

    $effect(() => {
        if (!$mode) {
            $mode = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        }
    })

    let nextMode = $derived($mode === 'dark' ? 'light' : 'dark')

    $effect(() => {
        if (browser && ($mode === 'light' || $mode === 'dark')) {
            window.document.body.setAttribute('data-theme', $mode)
            const meta = document.querySelector('meta[name="color-scheme"]')
            if (meta) meta.setAttribute('content', $mode)
        }
    })

    function changeTheme() {
        $mode = nextMode
    }
</script>

<button
    type="button"
    class="theme-toggle"
    aria-label={nextMode === 'dark'
        ? 'Switch to dark theme'
        : 'Switch to light theme'}
    onclick={changeTheme}
>
    {#if $mode === 'dark'}
        <IoMdSunny />
    {:else}
        <IoIosMoon />
    {/if}
</button>

<style>
    .theme-toggle {
        display: grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        padding: 0;
        border: none;
        background: none;
        color: var(--high-contrast-color);
        cursor: pointer;
    }

    .theme-toggle:hover {
        color: var(--alpine);
    }

    :global(.theme-toggle svg) {
        width: 1.15rem;
        height: 1.15rem;
    }
</style>
