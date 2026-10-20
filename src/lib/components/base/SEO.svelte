<script>
    import { page } from '$app/state'

    /**
     * @typedef {Object} Props
     * @property {string} [description]
     * @property {string} [title]
     * @property {'website' | 'article'} [type]
     * @property {boolean} [noindex] Keeps the page out of search results
     */

    /** @type {Props} */
    let {
        description = 'Russell McWhae’s Portfolio and Creative Outlet',
        title = '',
        type = 'website',
        noindex = false,
    } = $props()

    // Prerendering runs on a placeholder origin, so URLs use the live one
    const origin = 'https://russellmcwhae.ca'
    const base = 'Russell’s Portfolio'
    const img = origin + '/opengraph.png'

    let pageTitle = $derived(title ? base + ' » ' + title : base)
    let url = $derived(origin + page.url.pathname)
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    {#if !noindex}
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
    {/if}
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content={base} />
    <meta property="og:image" content={img} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="robots"
        content={noindex
            ? 'noindex'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'}
    />
</svelte:head>
