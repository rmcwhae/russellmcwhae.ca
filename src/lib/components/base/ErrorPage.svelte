<script>
    import SEO from '#lib/components/base/SEO.svelte'
    import LinkList from '#lib/components/misc/LinkList.svelte'

    /**
     * @typedef {Object} Props
     * @property {number} status
     * @property {string} title
     * @property {string} lede
     */

    /** @type {Props} */
    let { status, title, lede } = $props()

    const destinations = [
        { href: '/', title: 'Home' },
        { href: '/photography', title: 'Photography' },
        { href: '/journal', title: 'Journal' },
        { href: '/about', title: 'About' },
    ]
</script>

<SEO {title} description={lede} noindex />

<div class="char-limit">
    <header class="page-header">
        <p class="eyebrow">Error {status}</p>
        <h1>{title}</h1>
        <p class="lede">{lede}</p>
    </header>

    <LinkList heading="Try one of these" items={destinations} />
</div>

<style>
    .page-header {
        margin-bottom: var(--s2);
    }
</style>
