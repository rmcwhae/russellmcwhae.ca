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
<main>
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
    main {
        margin: var(--s2) auto;
        max-width: 900px;
        /* width: 100%; */
    }
    @media (max-width: 1023px) {
        main {
            margin: var(--s0);
            padding: 0;
            width: inherit;
        }
    }
</style>
