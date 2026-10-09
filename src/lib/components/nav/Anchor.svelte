<script>
    import { page } from '$app/state'

    let { href, title, onClose } = $props()

    function handleClick() {
        onClose?.()
    }
</script>

<a
    {href}
    onclick={handleClick}
    aria-current={page.url.pathname.search(href) > -1 ? 'page' : undefined}
>
    {title}
</a>

<style>
    a {
        display: block;
        margin: 0;
        padding: 0.35rem 0.65rem;
        color: var(--medium-grey);
        font-size: 0.78rem;
        font-weight: 500;
        letter-spacing: 0.14em;
        line-height: 1;
        text-decoration: none;
        text-transform: uppercase;
        font-size-adjust: cap-height from-font;
    }

    a[aria-current],
    a:hover {
        color: var(--high-contrast-color);
        text-decoration: none;
    }
</style>
