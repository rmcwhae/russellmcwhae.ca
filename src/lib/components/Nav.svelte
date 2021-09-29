<script>
    import { page } from '$app/stores'
    import Logo from '$lib/components/Logo.svelte'
    import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte'

    let mobileMenuOpen = false

    function toggle() {
        mobileMenuOpen = !mobileMenuOpen
        window.document.body.classList.toggle('overflow-hidden')
    }

    function hideMenu() {
        mobileMenuOpen = false
        window.document.body.classList.remove('overflow-hidden')
    }
</script>

<header>
    <nav>
        <div id="logo" class:active={mobileMenuOpen}>
            <a href="/" on:click={hideMenu}><Logo /></a>
        </div>
        <div class="nav-menu" class:active={mobileMenuOpen}>
            <ul>
                <li>
                    <a
                        sveltekit:prefetch
                        href="/photography"
                        on:click={hideMenu}
                        aria-current={$page.path.includes('/photography') ||
                        $page.path.includes('/events')
                            ? 'page'
                            : undefined}>Photography</a
                    >
                </li>
                <li>
                    <a
                        sveltekit:prefetch
                        href="/calendars"
                        on:click={hideMenu}
                        aria-current={$page.path === '/calendars'
                            ? 'page'
                            : undefined}>Calendars</a
                    >
                </li>
                <li>
                    <a
                        sveltekit:prefetch
                        on:click={hideMenu}
                        href="/projects"
                        aria-current={$page.path === '/projects'
                            ? 'page'
                            : undefined}>Projects</a
                    >
                </li>
                <li>
                    <a
                        sveltekit:prefetch
                        on:click={hideMenu}
                        href="/journal"
                        aria-current={$page.path.includes('/journal')
                            ? 'page'
                            : undefined}>Journal</a
                    >
                </li>
                <!-- <li>
                <a
                    sveltekit:prefetch
                    on:click={hideMenu}
                    href="/about"
                    aria-current={$page.path === '/about' ? 'page' : undefined}
                    >About</a
                >
            </li> -->
            </ul>
        </div>
        <ThemeSwitcher />
        <div class="nav-toggle" on:click={toggle} class:active={mobileMenuOpen}>
            <span class="icon-bar" />
            <span class="icon-bar" />
            <span class="icon-bar" />
        </div>
    </nav>
    <div class="nav-overlay" class:active={mobileMenuOpen} />
</header>

<style>
    header {
        border-bottom: 1px solid var(--light-grey);
    }
    nav {
        color: var(--high-contrast-color);
        font-size: 1rem;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--s-1) 0;
        max-width: var(--xl);
        margin: 0 auto;
    }
    ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }
    li {
        display: inline-block;
        padding: 0 var(--s0);
    }
    /* li:not(:last-child) {
        margin-right: var(--s0);
    } */
    li a {
        text-decoration: none;
        padding: var(--s-4) 0;
        display: block;
    }
    a {
        color: var(--high-contrast-color);
    }
    li {
        position: relative;
    }
    li a[aria-current] {
        color: var(--text-color);
    }
    .nav-toggle {
        z-index: 2;
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    span.icon-bar {
        position: absolute;
        right: var(--s0);
        display: block;
        width: 26px;
        height: 2px;
        background-color: var(--high-contrast-color);
        transition-duration: var(--duration);
    }
    .icon-bar:nth-child(1) {
        top: 20px;
    }
    .icon-bar:nth-child(2) {
        top: 27px;
    }
    .icon-bar:nth-child(3) {
        top: 34px;
    }
    .nav-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--background-color);
        background-color: var(--background-color-transparent);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 1;
        opacity: 0;
        visibility: hidden;
    }
    .nav-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    /* ICON BARS ANIMATION */

    .nav-toggle.active .icon-bar:nth-child(1) {
        top: 24px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .nav-toggle.active .icon-bar:nth-child(2) {
        width: 0;
    }
    .nav-toggle.active .icon-bar:nth-child(3) {
        top: 24px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    @media screen and (max-width: 1023px) {
        nav {
            position: inherit;
        }
        ul {
            margin-top: 0;
            margin-bottom: var(--s0);
        }
        #logo {
            position: relative;
            z-index: 2;
        }
        .nav-menu {
            position: absolute;
            left: 0;
            width: 100%;
            height: 0;
            padding: 0;
            overflow: hidden;
            z-index: 2;
        }
        .nav-menu.active {
            height: auto;
        }
        .nav-menu li {
            width: 100%;
            margin-bottom: 0;
        }
        .nav-menu li a {
            width: 100%;
            padding: var(--s-1) 0;
            text-align: center;
        }
        .nav-toggle {
            display: block;
        }
        :global(#logo svg) {
            height: 25px !important; /* TODO be less lazy than using !important */
        }
    }
</style>
