<script>
    import { page } from '$app/state'

    let { href, title, onClose } = $props()

    function handleClick() {
        onClose?.()
    }
</script>

<a
    data-sveltekit-preload-data
    {href}
    class="hover-underline-animation"
    onclick={handleClick}
    aria-current={page.url.pathname.search(href) > -1 ? 'page' : undefined}
    >{title}
    <!-- {#if href === '/calendars'}
        <span class="notification"></span>
    {/if}</a -->
</a>

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
    /* .notification {
        border-radius: 50%;
        content: '';
        display: inline-flex;
        margin-bottom: 9px;
        flex-shrink: 0;
        height: 7px;
        width: 7px;
        background: red;
    } */
</style>
