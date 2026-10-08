<script>
    import { dev } from '$app/env'
    import { page } from '$app/state'
    import { inject, pageview } from '@vercel/analytics'
    import { injectSpeedInsights } from '@vercel/speed-insights'
    import Nav from '#lib/components/nav/Nav.svelte'
    import Footer from '#lib/components/base/Footer.svelte'
    import Loading from '#lib/components/base/Loading.svelte'
    import '../app.scss'
    import '@fontsource/source-sans-3/400.css'
    import '@fontsource/source-sans-3/400-italic.css'
    import '@fontsource/source-sans-3/600.css'
    import '@fontsource/source-sans-3/700.css'
    import sourceSans400 from '@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2?url'
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props()

    // Stable @vercel/analytics still tracks pages through removed SvelteKit 2
    // modules. Mirror that behavior with the generic client and $app/state.
    inject(
        {
            mode: dev ? 'development' : 'production',
            framework: 'sveltekit',
            disableAutoTrack: true,
            basePath: import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH,
        },
        import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG
    )

    $effect(() => {
        if (page.route.id) {
            pageview({ route: page.route.id, path: page.url.pathname })
        }
    })

    injectSpeedInsights()
</script>

<svelte:head>
    <link
        rel="preload"
        href={sourceSans400}
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
    />
</svelte:head>

<Loading />

<main class="wrapper">
    <Nav />
    {@render children?.()}
    <Footer />
</main>

<style lang="scss">
    @use '../lib/scss/breakpoints' as *;

    .wrapper {
        margin: 0 var(--s0);
        display: grid;
        grid-template-columns:
            1fr
            min($breakpoint-xl, 100%)
            1fr;
        min-height: 100%;
        grid-template-rows: auto 1fr auto;

        @include for-tablet-portrait-up {
            margin: 0 var(--s1);
        }
    }
    :global(.wrapper > *) {
        grid-column: 2;
    }
    :global(.restricted-width) {
        max-width: $breakpoint-tablet-landscape-min;
        margin-left: auto;
        margin-right: auto;
    }
</style>
