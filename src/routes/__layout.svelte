<script>
    import Nav from '$lib/components/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'

    // your script goes here
</script>

<Styles />
<Reset />
<main>
    <Nav />
    <slot />
</main>

<style>
    main {
        max-width: 1024px;
        margin: 0 auto;
    }
</style>
