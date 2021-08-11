<script>
    import Nav from '$lib/components/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'
</script>

<Reset />
<Styles />
<main>
    <div class="sidebar">
        <Nav />
    </div>
    <div class="content">
        <slot />
    </div>
</main>

<style>
    .sidebar {
        margin: 0 0 var(--s0) var(--s4);
        position: fixed;
    }
    .content {
        margin: var(--s4) var(--s4) var(--s0) 250px;
    }
    @media (max-width: 1024px) {
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
    }
</style>
