<script>
    import Nav from '$lib/components/Nav.svelte'
    import Styles from '$lib/styles/index.svelte'
    import Reset from '$lib/styles/reset.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import Loading from '$lib/components/Loading.svelte'
    import SEO from '$lib/components/SEO.svelte'
</script>

<SEO />
<Reset />
<Styles />
<Loading />
<div>
    <aside>
        <Nav />
    </aside>
    <main>
        <slot />
    </main>
</div>
<footer><Footer /></footer>

<style>
    div {
        display: flex;
        height: 100%;
    }
    aside {
        width: 26rem;
        padding: var(--s2) var(--s2);
        /* border-right: 1px solid var(--light-grey); */
        /* margin-right: var(--s2); */
        min-height: 100vh;
    }
    footer {
        position: fixed;
        bottom: 0;
        left: var(--s2);
        padding: var(--s0) 0;
    }
    main {
        margin: var(--s2) var(--s2) var(--s1) 0;
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
        footer {
            position: inherit;
            padding: 0 var(--s0);
        }
        main {
            margin: var(--s0);
            padding: 0;
            width: inherit;
        }
    }
</style>
