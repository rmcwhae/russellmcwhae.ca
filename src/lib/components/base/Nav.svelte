<script>
    import { page } from '$app/stores'
    import Logo from '$lib/components/icons/Logo.svelte'
    import ThemeSwitcher from '$lib/components/base/ThemeSwitcher.svelte'

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
    <div id="logo" class:active={mobileMenuOpen}>
        <a href="/" on:click={hideMenu}><Logo /></a>
    </div>
    <nav>
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
                            : undefined}>Photos</a
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
            </ul>
            <div id="switcher">
                <ThemeSwitcher />
            </div>
        </div>
    </nav>
    <div class="nav-toggle" on:click={toggle} class:active={mobileMenuOpen}>
        <span class="icon-bar" />
        <span class="icon-bar" />
        <span class="icon-bar" />
    </div>
    <div class="nav-overlay" class:active={mobileMenuOpen} />
</header>

<style type="scss">
    @import '../../scss/breakpoints.scss';

    header {
        padding: var(--s2) var(--s3) var(--s5);
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
    }
    #logo {
        position: absolute;
    }
    nav {
        color: var(--high-contrast-color);
        font-weight: 600;
        font-size: 1rem;
        z-index: 2;
    }
    .nav-menu {
        display: flex;
        // flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    #switcher {
        position: absolute;
        right: var(--s3);
    }
    ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }
    a {
        color: var(--high-contrast-color);
    }
    li {
        display: inline-block;
        position: relative;
        margin: 0 var(--s-1);
    }
    li a {
        text-decoration: none;
        display: block;
        padding: var(--s-1) var(--s1);
        border-radius: 50px;
        border: 1px solid transparent;
    }
    li a[aria-current],
    li a:hover {
        border-color: var(--medium-grey);
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
        height: 1px;
        background-color: var(--high-contrast-color);
        transition-duration: var(--duration);
    }
    .icon-bar:nth-child(1) {
        top: 24px;
    }
    .icon-bar:nth-child(2) {
        top: 31px;
    }
    .icon-bar:nth-child(3) {
        top: 38px;
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

    /* ICON BARS ANIMATION */

    .nav-toggle.active .icon-bar:nth-child(1) {
        top: 32px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .nav-toggle.active .icon-bar:nth-child(2) {
        width: 0;
    }
    .nav-toggle.active .icon-bar:nth-child(3) {
        top: 32px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    @include for-tablet-portrait-down {
        header {
            padding: var(--s0) var(--s0) var(--s1);
        }
        nav {
            position: inherit;
        }
        ul {
            display: flex;
            flex-direction: column;
        }
        #logo {
            position: relative;
            z-index: 2;
        }
        .nav-menu {
            position: absolute;
            left: 0;
            top: var(--s3);
            width: 100%;
            height: 0;
            padding: 0;
            overflow: hidden;
            z-index: 2;
            display: inherit;
        }
        #switcher {
            margin-top: var(--s2);
            position: initial;
            display: flex;
            justify-content: center;
        }
        .nav-menu.active {
            height: auto;
        }
        .nav-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        .nav-menu li {
            display: inline-flex;
            align-self: center;
            padding: var(--s-1) 0;
        }
        .nav-menu li a {
            // width: 100%;
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
