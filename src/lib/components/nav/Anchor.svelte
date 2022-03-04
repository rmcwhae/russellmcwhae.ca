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
    on:click={handleClick}
    aria-current={$page.url.pathname.search(href) > -1 ? 'page' : undefined}
    >{title}</a
>

<style>
    a {
        color: var(--high-contrast-color);
        text-decoration: none;
        display: block;
        padding: var(--s-1) var(--s1);
        border-radius: 50px;
        border: 1px solid transparent;
    }
    a[aria-current],
    a:hover {
        border-color: var(--medium-grey);
    }
</style>
