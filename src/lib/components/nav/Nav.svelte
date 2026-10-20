<script>
    import { browser } from '$app/env'
    import { afterNavigate } from '$app/navigation'
    import { tick } from 'svelte'
    import { MediaQuery } from 'svelte/reactivity'
    import Anchor from './Anchor.svelte'
    import ThemeSwitcher from './ThemeSwitcher.svelte'

    let mobileMenuOpen = $state(false)
    /** @type {HTMLElement | undefined} */
    let headerEl = $state()
    /** @type {HTMLButtonElement | undefined} */
    let toggleEl = $state()
    /** @type {HTMLElement | undefined} */
    let menuEl = $state()

    const links = [
        { title: 'Photography', href: '/photography' },
        { title: 'Journal', href: '/journal' },
        { title: 'About', href: '/about' },
    ]

    function toggle() {
        mobileMenuOpen = !mobileMenuOpen
        window.document.body.classList.toggle(
            'no-scroll-mobile',
            mobileMenuOpen
        )
    }

    // Matches for-tablet-landscape-up, where the menu is always shown
    const wide = new MediaQuery('min-width: 901px', false)

    function closeMenu() {
        mobileMenuOpen = false
        window.document.body.classList.remove('no-scroll-mobile')
    }

    async function hideMenu() {
        if (!mobileMenuOpen) return
        closeMenu()
        // Toggle is inert until the open-menu effect cleans up
        await tick()
        toggleEl?.focus()
    }

    // Back/forward navigation doesn’t pass through the menu links
    afterNavigate(() => {
        if (mobileMenuOpen) closeMenu()
    })

    // The toggle and overlay are hidden on wide screens, so an open menu
    // would leave the page inert with no way to close it
    $effect(() => {
        if (wide.current && mobileMenuOpen) closeMenu()
    })

    $effect(() => {
        if (!browser || !mobileMenuOpen || !headerEl) return

        // Keep focus inside the header chrome by making page content inert
        const inerted = []
        for (const sibling of headerEl.parentElement?.children ?? []) {
            if (sibling === headerEl) continue
            if (sibling.inert) continue
            sibling.inert = true
            inerted.push(sibling)
        }

        menuEl?.querySelector('a')?.focus()

        return () => {
            inerted.forEach((el) => (el.inert = false))
        }
    })
</script>

<svelte:window
    onkeydown={(e) => e.key === 'Escape' && mobileMenuOpen && hideMenu()}
/>

<header bind:this={headerEl}>
    <div id="logo">
        <a href="/" onclick={hideMenu}>Russell McWhae</a>
    </div>
    <nav aria-label="Primary">
        <div
            id="nav-menu"
            class="nav-menu"
            class:active={mobileMenuOpen}
            bind:this={menuEl}
        >
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
    <button
        type="button"
        class="nav-toggle"
        bind:this={toggleEl}
        aria-expanded={mobileMenuOpen}
        aria-controls="nav-menu"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        onclick={toggle}
        class:active={mobileMenuOpen}
    >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <button
        type="button"
        class="nav-overlay"
        class:active={mobileMenuOpen}
        aria-label="Close menu"
        tabindex="-1"
        onclick={hideMenu}
    ></button>
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

    @include for-phone-only {
        header {
            margin-bottom: var(--s0);
        }
    }

    #logo {
        margin-right: auto;
        z-index: 13;
    }

    #logo a {
        display: block;
        color: var(--high-contrast-color);
        font-size: var(--text-caps);
        font-weight: 600;
        letter-spacing: var(--tracking-caps);
        line-height: 1;
        text-decoration: none;
        text-transform: uppercase;
        font-size-adjust: cap-height var(--font-sans-cap);
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
        visibility: hidden;
        z-index: 12;
    }

    .nav-menu.active {
        visibility: visible;
        height: auto;
        padding: var(--s1) 0 var(--s2);
    }

    .nav-overlay.active {
        opacity: 1;
        visibility: visible;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
    }

    .nav-toggle {
        z-index: 12;
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
        border: 0;
        background: none;
        color: inherit;
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
        position: fixed;
        inset: 0;
        margin: 0;
        padding: 0;
        border: none;
        background-color: var(--background-color-transparent);
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

    @include for-tablet-portrait-down {
        nav :global(a) {
            padding-inline: 0;
        }
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
            visibility: visible;
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
