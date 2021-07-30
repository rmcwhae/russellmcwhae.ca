<script>
    import Nav from '$lib/components/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'
</script>

<Reset />
<Styles />
<main>
    <Nav />
    <slot />
</main>

<style>
    main {
        max-width: 1024px;
        padding: 0 var(--s0);
        margin: 0 auto;
    }
    @media only screen and (max-width: 1024px) {
        main {
            margin: 0 var(--s0);
            padding: 0;
        }
    }
</style>
