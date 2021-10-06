<script>
    import Nav from '$lib/components/base/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'
    import Footer from '$lib/components/base/Footer.svelte'
    import Loading from '$lib/components/base/Loading.svelte'
</script>

<Reset />
<Styles />
<Loading />

<Nav />
<main class="wrapper">
    <slot />
</main>
<footer><Footer /></footer>

<style>
    footer {
        padding: var(--s0) 0;
        /* height: 200px; */
        text-align: center;
        /* background: url(assiniboine.png) center bottom no-repeat; */
    }
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
        /* width: 100%; */
        /* grid-column: 1 / 4; */
        /* constrain the width for very-large monitors */
        /* max-width: 1500px; */
        /* center the element */
        /* margin-left: auto; */
        /* margin-right: auto; */
    }
</style>
