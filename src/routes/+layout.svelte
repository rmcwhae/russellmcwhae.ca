<script>
    import { dev } from '$app/environment'
    import { injectAnalytics } from '@vercel/analytics/sveltekit'
    import { injectSpeedInsights } from '@vercel/speed-insights'
    import Nav from '$lib/components/nav/Nav.svelte'
    import Footer from '$lib/components/base/Footer.svelte'
    import Loading from '$lib/components/base/Loading.svelte'
    import '../app.scss'
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props()

    injectAnalytics({ mode: dev ? 'development' : 'production' })
    injectSpeedInsights()
</script>

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
