<script>
    import '../app.scss'
    import Nav from '$lib/components/base/Nav.svelte'
    import Footer from '$lib/components/base/Footer.svelte'
    import Loading from '$lib/components/base/Loading.svelte'
</script>

<Loading />

<Nav />
<main class="wrapper">
    <slot />
</main>
<Footer />

<style type="scss">
    @import '../lib/scss/breakpoints.scss';

    .wrapper {
        margin: 0 var(--s0) var(--s2);
        display: grid;
        grid-template-columns:
            1fr
            min($breakpoint-tablet-landscape-min, 100%)
            1fr;

        @include for-tablet-portrait-down {
            max-width: 600px;
            margin: 0 auto;
            padding: var(--s0);
        }
        @include for-desktop-up {
            margin-left: var(--s2);
            margin-right: var(--s2);
        }
    }
    :global(.wrapper > *) {
        grid-column: 2;
    }
    @include for-desktop-up {
        :global(.full-bleed) {
            /* See https://joshwcomeau.com/css/full-bleed/ */
            width: calc(100% - 2 * var(--s0));
            grid-column: 1 / 4;
            // /* constrain the width for very-large monitors */
            max-width: $breakpoint-xl;
            // /* center the element */
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
