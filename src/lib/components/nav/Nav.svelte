<script>
    import { resolve } from '$app/paths'
    import { page } from '$app/state'
    import { SvelteSet } from 'svelte/reactivity'
    import Logo from '$lib/components/icons/Logo.svelte'
    import Anchor from './Anchor.svelte'
    import SubMenu from './SubMenu.svelte'
    import ThemeSwitcher from './ThemeSwitcher.svelte'

    const PHOTOGRAPHY_ITEMS = [
        {
            href: '/portfolio',
            name: 'Portfolio',
            desc: 'Selected landscape work',
        },
        {
            href: '/field-expeditions',
            name: 'Field Expeditions',
            desc: 'Photo sets, trip by trip',
        },
        {
            href: '/calendars',
            name: 'Calendars',
            desc: 'Archive of print editions',
        },
    ]

    let mobileMenuOpen = $state(false)
    let scrolled = $state(false)
    let isHome = $derived(page.url.pathname === '/')

    /** @type {'photography' | null} */
    let openMenu = $state(null)
    let expanded = new SvelteSet()

    /** @param {string} path */
    function isUnderPhotography(path) {
        return (
            path.startsWith('/photography') ||
            PHOTOGRAPHY_ITEMS.some(
                (item) =>
                    path === item.href || path.startsWith(`${item.href}/`)
            )
        )
    }

    $effect(() => {
        const path = page.url.pathname
        expanded.clear()
        if (isUnderPhotography(path)) expanded.add('photography')
    })

    /** @param {'photography'} id */
    function toggleExpanded(id) {
        if (expanded.has(id)) {
            expanded.delete(id)
        } else {
            expanded.add(id)
        }
    }

    $effect(() => {
        if (!isHome) {
            scrolled = false
            return
        }
        const onScroll = () => {
            scrolled = window.scrollY > 80
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    })

    function toggle() {
        mobileMenuOpen = !mobileMenuOpen
        window.document.body.classList.toggle('no-scroll-mobile')
    }

    function hideMenu() {
        mobileMenuOpen = false
        window.document.body.classList.remove('no-scroll-mobile')
    }
</script>

<header class:transparent={isHome && !scrolled}>
    <div class="nav-inner">
        <div id="logo" class:active={mobileMenuOpen}>
            <a href={resolve('/')} onclick={hideMenu}><Logo /></a>
        </div>
        <nav>
            <div class="nav-menu" class:active={mobileMenuOpen}>
                <ul>
                    <SubMenu
                        label="Photography"
                        sectionPath="/photography"
                        items={PHOTOGRAPHY_ITEMS}
                        instanceId="photography"
                        {openMenu}
                        onOpenMenu={(id) => (openMenu = id)}
                        expandedMobile={expanded.has('photography')}
                        onToggleMobile={() => toggleExpanded('photography')}
                        onNavigate={hideMenu}
                    />
                    <li>
                        <Anchor
                            title="Journal"
                            href="/journal"
                            onClose={hideMenu}
                        />
                    </li>
                    <li>
                        <Anchor
                            title="About"
                            href="/about"
                            onClose={hideMenu}
                        />
                    </li>
                    <li
                        id="mobile-switcher"
                        data-test="mobile-colour-scheme-switcher"
                    >
                        <ThemeSwitcher instanceId="mobile" />
                    </li>
                </ul>
            </div>
        </nav>
        <div id="desktop-switcher" data-test="desktop-colour-scheme-switcher">
            <ThemeSwitcher instanceId="desktop" />
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
    </div>
    <div class="nav-overlay" class:active={mobileMenuOpen}></div>
</header>

<style lang="scss">
    @use '../../scss/breakpoints' as *;
    header {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: stretch;
        flex-shrink: 0;
        height: var(--nav-height);
        padding: 0 var(--s0);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        background: var(--nav-background-color-transparent);
        border-bottom: 1px solid var(--light-grey);
        transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            backdrop-filter 0.3s ease;

        @include for-tablet-portrait-up {
            padding: 0 var(--s1);
        }

        &.transparent {
            background: transparent;
            border-bottom-color: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;

            :global(a),
            :global(button) {
                color: var(--high-contrast-color);
            }
            .icon-bar {
                background-color: var(--high-contrast-color);
            }
        }
    }

    .nav-inner {
        display: flex;
        align-items: center;
        width: 100%;
        max-width: $breakpoint-xl;
        margin: 0 auto;
        min-height: 100%;
    }
    nav {
        color: var(--high-contrast-color);
        font-family: var(--font-sans);
        font-weight: 700;
        font-size: var(--text-xs);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-left: var(--s2);
    }
    :global(#logo svg) {
        height: 22px !important; /* TODO be less lazy than using !important */
        @include for-tablet-portrait-up {
            height: 28px !important;
        }
        @include for-tablet-landscape-up {
            height: 34px !important;
        }
    }
    #logo {
        z-index: 13;
        display: flex;
        align-items: center;
    }
    #logo a {
        display: block;
        color: var(--high-contrast-color);
        transition: color var(--duration);
    }
    #logo a:hover,
    #logo a:focus-visible {
        color: var(--link-color);
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

    .nav-menu li:has(:global(a[aria-current='page']))::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        background: var(--accent);
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
        overflow: visible;
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

    @media (max-width: $breakpoint-tablet-portrait-max) {
        #mobile-switcher {
            flex-direction: column;
            align-items: center;
        }

        .nav-menu li:has(:global(a[aria-current='page'])) {
            padding-left: var(--s-2);
        }
    }
    .nav-toggle {
        z-index: 12;
        position: relative;
        flex-shrink: 0;
        margin-left: auto;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    span.icon-bar {
        position: absolute;
        right: 0;
        display: block;
        width: 26px;
        height: 1px;
        background-color: var(--high-contrast-color);
        transition-duration: var(--duration);
    }
    .icon-bar:nth-child(1) {
        top: 18px;
    }
    .icon-bar:nth-child(2) {
        top: 25px;
    }
    .icon-bar:nth-child(3) {
        top: 32px;
    }
    .nav-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        background-color: var(--nav-background-color);
        background-color: var(--nav-background-color-transparent);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 11;
        opacity: 0;
        visibility: hidden;
    }

    /* ICON BARS ANIMATION */
    .nav-toggle.active .icon-bar:nth-child(1) {
        top: 25px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .nav-toggle.active .icon-bar:nth-child(2) {
        width: 0;
    }
    .nav-toggle.active .icon-bar:nth-child(3) {
        top: 25px;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    #desktop-switcher {
        display: none;
        margin-left: auto;
        align-items: center;
    }

    @include for-tablet-landscape-up {
        #desktop-switcher {
            display: flex;
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
        nav {
            display: flex;
            align-self: stretch;
        }
        .nav-menu {
            position: inherit;
            height: auto;
            overflow: visible;
            display: flex;
            align-items: stretch;
            align-self: stretch;
            justify-content: center;
        }
        ul {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            height: 100%;
        }
        li {
            margin: 0 var(--s-2);
            height: 100%;
            display: flex;
            align-items: center;
        }
        nav :global(a) {
            margin: 0 var(--s-2);
            display: flex;
            align-items: center;
            height: 100%;
        }
        .nav-menu li:has(:global(a[aria-current='page']))::before {
            top: 0;
            bottom: auto;
            left: 0;
            right: 0;
            width: auto;
            height: 4px;
        }
    }
</style>
