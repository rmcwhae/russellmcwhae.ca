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

<style>
    .wrapper {
        margin: 0 0 var(--s2);
        display: grid;
        grid-template-columns:
            1fr
            min(var(--lg), 100%)
            1fr;
    }
    :global(.wrapper > *) {
        grid-column: 2;
    }
    :global(.full-bleed) {
        /* See https://joshwcomeau.com/css/full-bleed/ */
        width: calc(100% - 2 * var(--s0));
        grid-column: 1 / 4;
        /* constrain the width for very-large monitors */
        max-width: var(--xl);
        /* center the element */
        margin-left: auto;
        margin-right: auto;
    }
</style>
