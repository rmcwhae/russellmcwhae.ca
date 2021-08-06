<script>
    import { page } from '$app/stores'
    import Logo from '$lib/components/Logo.svelte'
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte'
</script>

<nav>
    <div>
        <a
            href="/"
            aria-current={$page.path === '/' ? 'page' : undefined}
            class="logo"><Logo /></a
        >
    </div>
    <ul>
        <li>
            <a
                sveltekit:prefetch
                href="/photography"
                aria-current={$page.path === '/photography'
                    ? 'page'
                    : undefined}>Photography</a
            >
        </li>
        <li>
            <a
                sveltekit:prefetch
                href="/calendars"
                aria-current={$page.path === '/calendars' ? 'page' : undefined}
                >Calendars</a
            >
        </li>
        <li>
            <a
                sveltekit:prefetch
                href="/projects"
                aria-current={$page.path === '/projects' ? 'page' : undefined}
                >Projects</a
            >
        </li>
        <li>
            <a
                sveltekit:prefetch
                href="/journal"
                aria-current={$page.path === '/journal' ? 'page' : undefined}
                >Journal</a
            >
        </li>
        <li>
            <a
                sveltekit:prefetch
                href="/about"
                aria-current={$page.path === '/about' ? 'page' : undefined}
                >About</a
            >
        </li>
    </ul>
    <ThemeSwitcher />
</nav>

<style>
    ul {
        margin-top: var(--s4);
        margin-bottom: var(--s4);
    }
    /* li:not(:last-child) {
        margin-right: var(--s0);
    } */
    li a {
        text-decoration: none;
        padding: var(--s-3) 0;
        display: block;
    }
    a {
        color: var(--text-color);
        transition: all 0.17s;
    }
    [aria-current] {
        font-weight: 700;
    }
    a:hover {
        /* color: var(--medium-grey); */
    }
</style>
