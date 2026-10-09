<script>
    import { dev } from '$app/env'
    import { page } from '$app/state'
    import { inject, pageview } from '@vercel/analytics'
    import { injectSpeedInsights } from '@vercel/speed-insights'
    import Nav from '#lib/components/nav/Nav.svelte'
    import Footer from '#lib/components/base/Footer.svelte'
    import Loading from '#lib/components/base/Loading.svelte'
    import '../app.scss'
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props()

    let isHome = $derived(page.url.pathname === '/')

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
        href="/fonts/schibsted-grotesk-latin-400-normal.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
    />
    <link
        rel="preload"
        href="/fonts/newsreader-latin-500-normal.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
    />
</svelte:head>

<Loading />

<main class="wrapper" class:is-home={isHome}>
    <Nav />
    {@render children?.()}
    <Footer />
</main>

<style lang="scss">
    @use '../lib/scss/breakpoints' as *;

    .wrapper.is-home {
        grid-template-rows: auto auto;

        :global(header) {
            position: relative;
            z-index: 2;
            grid-row: 1;
            align-self: start;
            margin-bottom: 0;
        }

        :global(.home) {
            grid-row: 1;
            grid-column: 1 / -1;
            z-index: 0;
        }

        :global(header #logo a),
        :global(header #logo a:hover),
        :global(header nav a),
        :global(header nav a:hover),
        :global(header nav a[aria-current]),
        :global(header .theme-trigger),
        :global(header .theme-trigger:hover),
        :global(header .theme-trigger:focus-visible) {
            color: var(--paper);
        }

        :global(header .icon-bar) {
            background-color: var(--paper);
        }

        :global(header .nav-overlay) {
            position: fixed;
        }
    }

    .wrapper {
        position: relative;
        z-index: 1;
        margin: 0 clamp(1.25rem, 4vw, 2.75rem);
        display: grid;
        grid-template-columns:
            1fr
            min($breakpoint-xl, 100%)
            1fr;
        min-height: 100%;
        grid-template-rows: auto 1fr auto;
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
