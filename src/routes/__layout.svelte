<script>
    import Nav from '$lib/components/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import Loading from '$lib/components/Loading.svelte'
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
        margin: var(--s2);
        display: grid;
        grid-template-columns:
            1fr
            min(var(--xl), 100%)
            1fr;
    }
    :global(.wrapper > *) {
        grid-column: 2;
    }
    :global(.full-bleed) {
        width: 100%;
        grid-column: 1 / 4;
    }
</style>
