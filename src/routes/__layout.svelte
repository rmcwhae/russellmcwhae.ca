<script>
    import Nav from '$lib/components/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'
</script>

<Reset />
<Styles />
<main>
    <div class="left">
        <Nav />
    </div>
    <div>
        <slot />
    </div>
</main>

<style>
    main {
        display: flex;
    }
    .left {
        min-width: 220px;
    }
    main div {
        margin: var(--s4);
    }
    main .left {
        margin-right: 0;
    }
</style>
