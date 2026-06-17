<script>
    import { page } from '$app/state'
    import { resolve } from '$app/paths'

    let { href, title, onClose } = $props()

    const isHashOnHome = $derived(href.startsWith('/#'))

    const isActive = $derived.by(() => {
        if (page.url.pathname === '/') return false

        if (isHashOnHome) {
            return page.url.hash === href.slice(1)
        }

        return (
            page.url.pathname === href ||
            page.url.pathname.startsWith(`${href}/`)
        )
    })

    function handleClick() {
        onClose?.()
    }
</script>

{#if isHashOnHome}
    <!-- eslint-disable svelte/no-navigation-without-resolve -- in-page hash on home -->
    <a
        href={resolve('/') + href.slice(1)}
        onclick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        >{title}</a
    >
    <!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
    <a
        href={resolve(href)}
        onclick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        >{title}</a
    >
{/if}

<style>
    a {
        font-size: var(--text-sm);
        text-decoration: none;
        color: var(--high-contrast-color);
        display: block;
        margin: 0 var(--s0);
    }

    a:focus-visible {
        outline: 2px solid var(--high-contrast-color);
        outline-offset: 2px;
    }
</style>
