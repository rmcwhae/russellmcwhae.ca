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
    <div class="right">
        <slot />
    </div>
</main>

<style>
    main {
        display: flex;
    }
    .left {
        min-width: 220px;
        position: fixed;
    }
    .right {
        margin-left: calc(220px + var(--s4));
    }
    main div {
        margin: var(--s4);
    }
    main .left {
        margin-right: 0;
    }
</style>
