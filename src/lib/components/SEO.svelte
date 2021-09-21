<script>
    export let description = 'Russell McWhae’s Portfolio and Creative Outlet'
    export let title = ''

    const base = 'Russell’s Portfolio'

    $: pageTitle = title ? base + ' » ' + title : base
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={description} />
    <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    />
</svelte:head>
