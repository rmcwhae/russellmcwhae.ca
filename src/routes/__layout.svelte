<script>
    import '../app.scss'
    import Nav from '$lib/components/nav/Nav.svelte'
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
        flex: 1;
        margin: 0 var(--s0) var(--s2);
        display: grid;
        grid-template-columns:
            1fr
            min($breakpoint-tablet-landscape-min, 100%)
            1fr;
        @include for-tablet-portrait-up {
            max-width: 75vw;
            margin: 0 auto;
        }
        @include for-desktop-up {
            max-width: inherit;
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
        :global(.wide) {
            margin-left: calc(-1 * var(--s5));
            margin-right: calc(-1 * var(--s5));
        }
    }
</style>
