<script>
    import { createEventDispatcher } from 'svelte'
    import { page } from '$app/stores'

    export let href
    export let title

    const dispatch = createEventDispatcher()

    function handleClick() {
        dispatch('close')
    }
</script>

<a
    sveltekit:prefetch
    {href}
    class="hover-underline-animation"
    on:click={handleClick}
    aria-current={$page.url.pathname.search(href) > -1 ? 'page' : undefined}
    >{title}</a
>

<style>
    a {
        font-size: 1.2em;
        text-decoration: none;
        color: var(--text-color);
        display: block;
        margin: var(--s-1) var(--s0);
    }
    a[aria-current],
    a:hover {
        color: var(--high-contrast-color);
        text-decoration: none;
    }
</style>
