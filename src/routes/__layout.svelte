<script>
    import Nav from '$lib/components/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'
</script>

<Reset />
<Styles />
<div>
    <aside>
        <Nav />
    </aside>
    <main>
        <slot />
    </main>
</div>

<style>
    div {
        display: flex;
        height: 100%;
    }
    aside {
        width: 18rem;
        padding: var(--s2) var(--s3);
        border-right: 1px solid var(--light-grey);
        margin-right: var(--s2);
        min-height: 100vh;
    }
    main {
        margin: var(--s2) var(--s2) var(--s2) 0;
        width: 100%;
    }
    @media (max-width: 1023px) {
        div {
            display: inherit;
        }
        aside {
            border-right: none;
            min-height: inherit;
            width: inherit;
            margin: var(--s-1) 0 var(--s0) var(--s0);
            padding: 0;
            /* padding: var(--s-1) 0 var(--s0) var(--s0); */
        }
        main {
            margin: var(--s0);
            padding: 0;
            width: inherit;
        }
    }
    /* .sidebar {
        margin: 0 0 var(--s0) var(--s4);
        position: fixed;
    }
    .content {
        margin: var(--s4) var(--s4) var(--s0) 300px;
    }
    @media (max-width: 1023px) {
        main {
            margin: var(--s0);
        }
        .sidebar {
            position: inherit;
        }
        .sidebar,
        .content {
            margin: 0;
        }
    } */
</style>
