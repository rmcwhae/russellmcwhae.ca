<script>
    import Logo from '$lib/components/icons/Logo.svelte'
    import Anchor from './Anchor.svelte'
    import ThemeSwitcher from './ThemeSwitcher.svelte'

    let mobileMenuOpen = $state(false)

    function toggle() {
        mobileMenuOpen = !mobileMenuOpen
        window.document.body.classList.toggle('no-scroll-mobile')
    }

    function hideMenu() {
        mobileMenuOpen = false
        window.document.body.classList.remove('no-scroll-mobile')
    }
</script>

<header>
    <div id="logo" class:active={mobileMenuOpen}>
        <a href="/" onclick={hideMenu}><Logo /></a>
    </div>
    <nav>
        <div class="nav-menu" class:active={mobileMenuOpen}>
            <ul>
                <li>
                    <Anchor
                        title="Photos"
                        href="/photography"
                        on:close={hideMenu}
                    />
                </li>
                <li>
                    <Anchor
                        title="Calendars"
                        href="/calendars"
                        on:close={hideMenu}
                    />
                </li>
                <li>
                    <Anchor
                        title="Projects"
                        href="/projects"
                        on:close={hideMenu}
                    />
                </li>
                <li>
                    <Anchor
                        title="Journal"
                        href="/journal"
                        on:close={hideMenu}
                    />
                </li>
                <li>
                    <Anchor title="Micro" href="/micro" on:close={hideMenu} />
                </li>
                <li
                    id="mobile-switcher"
                    data-test="mobile-colour-scheme-switcher"
                >
                    <ThemeSwitcher />
                </li>
            </ul>
        </div>
    </nav>
    <div id="desktop-switcher" data-test="desktop-colour-scheme-switcher">
        <ThemeSwitcher />
    </div>
    <div
        class="nav-toggle"
        role="button"
        tabindex="0"
        aria-pressed={mobileMenuOpen}
        onclick={toggle}
        onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
        class:active={mobileMenuOpen}
    >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </div>
    <div class="nav-overlay" class:active={mobileMenuOpen}></div>
</header>

<style lang="scss">
    @use '../../scss/breakpoints' as *;
    header {
        display: flex;
        justify-content: space-between;
        margin-top: var(--s1);
        margin-bottom: var(--s2);
        align-items: center;
    }
    nav {
        color: var(--high-contrast-color);
        font-weight: 600;
        font-size: 1rem;
    }
    :global(#logo svg) {
        height: 25px !important; /* TODO be less lazy than using !important */
        @include for-tablet-portrait-up {
            height: 35px !important;
        }
        @include for-tablet-landscape-up {
            height: 45px !important;
        }
    }
    #logo {
        z-index: 13;
    }
    #logo a {
        display: block;
    }
    ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
    }
    a {
        color: var(--high-contrast-color);
    }
    li {
        display: inline-block;
        position: relative;
        margin: 0 var(--s-1);
    }
    :global(.no-scroll-mobile) {
        overflow: hidden;
    }
    .nav-menu {
        position: absolute;
        left: 0;
        top: var(--s3);
        width: 100%;
        height: 0;
        padding: 0;
        overflow: hidden;
        z-index: 12;
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
    .nav-toggle {
        z-index: 12;
        position: absolute;
        top: 7px;
        right: 0;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    span.icon-bar {
        position: absolute;
        right: var(--s1);
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
        height: 100vh;
        background-color: var(--background-color);
        background-color: var(--background-color-transparent);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 11;
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
    #desktop-switcher {
        display: none;
    }

    @include for-tablet-landscape-up {
        #desktop-switcher {
            display: inherit;
        }
        #mobile-switcher {
            display: none;
        }
        :global(.no-scroll-mobile) {
            overflow: inherit;
        }
        .nav-toggle,
        .nav-overlay {
            display: none;
        }
        .nav-menu {
            position: inherit;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        ul {
            display: flex;
            flex-direction: row;
        }
    }
</style>
