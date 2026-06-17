<script>
    import { page } from '$app/state'
    import { resolve } from '$app/paths'

    let { href, title, onClose } = $props()

    const isHashOnHome = $derived(href.startsWith('/#'))

    function handleClick() {
        onClose?.()
    }
</script>

{#if isHashOnHome}
    <!-- eslint-disable svelte/no-navigation-without-resolve -- in-page hash on home -->
    <a
        href={resolve('/') + href.slice(1)}
        onclick={handleClick}
        aria-current={page.url.pathname.search(href) > -1 ? 'page' : undefined}
        >{title}</a
    >
    <!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
    <a
        href={resolve(href)}
        onclick={handleClick}
        aria-current={page.url.pathname.search(href) > -1 ? 'page' : undefined}
        >{title}</a
    >
{/if}

<style>
    a {
        font-size: var(--text-xl);
        text-decoration: none;
        color: var(--high-contrast-color);
        display: block;
        margin: var(--s-1) var(--s0);
    }

    a:focus-visible {
        outline: 2px solid var(--high-contrast-color);
        outline-offset: 2px;
    }
</style>
