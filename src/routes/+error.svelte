<script>
    import { page } from '$app/state'
    import SEO from '#lib/components/base/SEO.svelte'
    import LinkList from '#lib/components/misc/LinkList.svelte'

    let notFound = $derived(page.status === 404)
    let title = $derived(notFound ? 'Page not found' : 'Something went wrong')
    let lede = $derived(
        notFound
            ? 'That page doesn’t exist, or it has moved.'
            : 'Something broke on my end. Please try again in a moment.'
    )

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
        <p class="eyebrow">Error {page.status}</p>
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
