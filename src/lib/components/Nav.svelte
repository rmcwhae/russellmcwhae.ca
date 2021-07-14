<script>
    import Logo from '$lib/components/Logo.svelte'
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte'
</script>

<nav>
    <a href="/" class="logo"><Logo /></a>
    <ul>
        <li><a href="/journal">Journal</a></li>
        <li><a href="/photography">Photography</a></li>
        <li><a href="/calendars">Calendars</a></li>
        <li><a href="/about">About</a></li>
    </ul>
    <ThemeSwitcher />
</nav>

<style>
    li {
        display: inline;
    }
    li:not(:last-child) {
        margin-right: var(--s0);
    }
    nav {
        padding: var(--s0) 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--grey);
        margin-bottom: var(--s1);
    }
    a {
        text-decoration: none;
        font-size: 0.8em;
        letter-spacing: 0.125em;
        text-transform: uppercase;
    }
    @media only screen and (max-width: 1024px) {
        nav {
            margin-left: calc(-1 * var(--s0));
            margin-right: calc(-1 * var(--s0));
            padding-left: var(--s0);
            padding-right: var(--s0);
        }
    }
</style>
