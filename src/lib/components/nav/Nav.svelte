<script>
    import Anchor from './Anchor.svelte'
    import ThemeSwitcher from './ThemeSwitcher.svelte'

    let mobileMenuOpen = $state(false)

    const links = [
        { title: 'Photography', href: '/photography' },
        { title: 'Journal', href: '/journal' },
        { title: 'About', href: '/about' },
    ]

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
    <div id="logo">
        <a href="/" onclick={hideMenu}>Russell McWhae</a>
    </div>
    <nav>
        <div class="nav-menu" class:active={mobileMenuOpen}>
            <ul>
                {#each links as link (link.href)}
                    <li>
                        <Anchor
                            title={link.title}
                            href={link.href}
                            onClose={hideMenu}
                        />
                    </li>
                {/each}
            </ul>
        </div>
    </nav>
    <div id="desktop-switcher" data-test="desktop-colour-scheme-switcher">
        <ThemeSwitcher instanceId="desktop" />
    </div>
    <div id="mobile-switcher" data-test="mobile-colour-scheme-switcher">
        <ThemeSwitcher instanceId="mobile" />
    </div>
    <div
        class="nav-toggle"
        role="button"
        tabindex="0"
        aria-pressed={mobileMenuOpen}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
        justify-content: flex-end;
        align-items: center;
        gap: var(--s0);
        margin-top: var(--s1);
        margin-bottom: var(--s3);
    }

    #logo {
        margin-right: auto;
        z-index: 13;
    }

    #logo a {
        display: block;
        color: var(--high-contrast-color);
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.16em;
        line-height: 1;
        text-decoration: none;
        text-transform: uppercase;
        font-size-adjust: cap-height from-font;
    }

    #logo a:hover {
        text-decoration: none;
        color: var(--high-contrast-color);
    }

    nav {
        color: var(--high-contrast-color);
        font-weight: 500;
    }

    ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--s0);
    }

    li {
        display: inline-block;
        position: relative;
        margin: 0;
    }

    :global(.no-scroll-mobile) {
        overflow: hidden;
    }

    .nav-menu {
        position: absolute;
        left: 0;
        top: 4.5rem;
        width: 100%;
        height: 0;
        padding: 0;
        overflow: hidden;
        z-index: 12;
    }

    .nav-menu.active {
        height: auto;
        padding: var(--s1) 0 var(--s2);
    }

    .nav-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .nav-toggle {
        z-index: 12;
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
    }

    span.icon-bar {
        position: absolute;
        right: 0.65rem;
        display: block;
        width: 1.25rem;
        height: 1px;
        background-color: var(--high-contrast-color);
        transition-duration: var(--duration);
    }

    .icon-bar:nth-child(1) {
        top: 0.95rem;
    }

    .icon-bar:nth-child(2) {
        top: 1.25rem;
    }

    .icon-bar:nth-child(3) {
        top: 1.55rem;
    }

    .nav-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        background-color: var(--background-color-transparent);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 11;
        opacity: 0;
        visibility: hidden;
    }

    .nav-toggle.active .icon-bar:nth-child(1) {
        top: 1.25rem;
        transform: rotate(45deg);
    }

    .nav-toggle.active .icon-bar:nth-child(2) {
        width: 0;
    }

    .nav-toggle.active .icon-bar:nth-child(3) {
        top: 1.25rem;
        transform: rotate(-45deg);
    }

    #mobile-switcher {
        position: relative;
        z-index: 13;
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
            position: static;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            overflow: visible;
        }

        ul {
            flex-direction: row;
            align-items: center;
            gap: 0.25rem;
        }
    }
</style>
