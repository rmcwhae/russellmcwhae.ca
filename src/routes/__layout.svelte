<script>
    import '../app.scss'
    import Nav from '$lib/components/nav/Nav.svelte'
    import Footer from '$lib/components/base/Footer.svelte'
    import Loading from '$lib/components/base/Loading.svelte'
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
        margin: 0 auto;
        padding: 0 var(--s0);
        width: 100%;
        max-width: $breakpoint-xl;

        @include for-tablet-portrait-up {
            padding: 0 var(--s2);
        }
    }
    :global(.restricted-width) {
        max-width: $breakpoint-tablet-landscape-min;
        margin: 0 auto;
    }
</style>
