<script>
    import { inject } from '@vercel/analytics'
    import { browser, dev } from '$app/environment'
    import { page } from '$app/stores'
    import { webVitals } from '$lib/vitals'
    import Nav from '$lib/components/nav/Nav.svelte'
    import Footer from '$lib/components/base/Footer.svelte'
    import Loading from '$lib/components/base/Loading.svelte'
    import '../app.scss'

    inject({ mode: dev ? 'development' : 'production' })

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID

    $: if (browser && analyticsId) {
        webVitals({
            path: $page.url.pathname,
            params: $page.params,
            analyticsId,
        })
    }
</script>

<Loading />

<main class="wrapper">
    <Nav />
    <slot />
    <Footer />
</main>

<style type="scss">
    @import '../lib/scss/breakpoints.scss';

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
