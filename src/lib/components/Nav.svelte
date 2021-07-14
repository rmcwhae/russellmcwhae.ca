<script>
    import { page } from '$app/stores'
    import Logo from '$lib/components/Logo.svelte'
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte'
</script>

<nav>
    <a
        href="/"
        aria-current={$page.path === '/' ? 'page' : undefined}
        class="logo"><Logo /></a
    >
    <ul>
        <li>
            <a
                href="/journal"
                aria-current={$page.path === '/journal' ? 'page' : undefined}
                >Journal</a
            >
        </li>
        <li>
            <a
                href="/photography"
                aria-current={$page.path === '/photography'
                    ? 'page'
                    : undefined}>Photography</a
            >
        </li>
        <li>
            <a
                href="/calendars"
                aria-current={$page.path === '/calendars' ? 'page' : undefined}
                >Calendars</a
            >
        </li>
        <li>
            <a
                href="/about"
                aria-current={$page.path === '/about' ? 'page' : undefined}
                >About</a
            >
        </li>
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
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s1);
    }
    li a {
        text-decoration: none;
        font-size: 0.8em;
        letter-spacing: 0.125em;
        text-transform: uppercase;
    }
    a {
        color: var(--medium-grey);
        transition: color 0.17s;
    }
    a:hover,
    [aria-current] {
        color: var(--text-color);
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
