<script>
    import { page } from '$app/state'
    import { resolve } from '$app/paths'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'

    /**
     * @typedef {{ href: string, name: string, desc?: string }} SubMenuItem
     * @typedef {Object} Props
     * @property {string} label
     * @property {string} sectionPath
     * @property {SubMenuItem[]} items
     * @property {string} instanceId
     * @property {string | null} openMenu
     * @property {(id: string | null) => void} onOpenMenu
     * @property {boolean} expandedMobile
     * @property {() => void} onToggleMobile
     * @property {() => void} [onNavigate]
     */

    /** @type {Props} */
    let {
        label,
        sectionPath,
        items,
        instanceId,
        openMenu,
        onOpenMenu,
        expandedMobile,
        onToggleMobile,
        onNavigate,
    } = $props()

    const panelId = `submenu-${instanceId}`
    const open = $derived(openMenu === instanceId)

    // expandedMobile is seeded from the current path regardless of viewport,
    // so it stays true even while viewing at desktop width — without this,
    // the desktop dropdown panel would render (unhovered) any time the
    // current page happens to be one of this section's items.
    let isDesktop = $state(false)

    $effect(() => {
        const query = window.matchMedia('(min-width: 901px)')
        isDesktop = query.matches
        const handleChange = (event) => {
            isDesktop = event.matches
        }
        query.addEventListener('change', handleChange)
        return () => query.removeEventListener('change', handleChange)
    })

    const panelVisible = $derived(
        isDesktop ? open : open || expandedMobile
    )

    /** @param {string} href */
    function isCurrent(href) {
        return (
            page.url.pathname === href ||
            page.url.pathname.startsWith(`${href}/`)
        )
    }

    // The section landing page shares sectionPath's prefix, but the items
    // themselves may live anywhere (not necessarily nested under it), so
    // both need to be checked.
    const sectionActive = $derived(
        page.url.pathname.startsWith(sectionPath) ||
            items.some((item) => isCurrent(item.href))
    )

    let liElement = $state(null)
    let triggerElement = $state(null)

    /** @param {MouseEvent} event */
    function handleTriggerClick(event) {
        event.stopPropagation()
        // Desktop: a real mouse always hovers before it clicks, which has
        // already opened the panel — toggling here would immediately close
        // it again, so a click just ensures it's open (mouseleave/Escape/
        // click-outside close it). Mobile has no hover, so tapping the
        // trigger toggles its own accordion instead.
        if (window.matchMedia('(min-width: 901px)').matches) {
            onOpenMenu(instanceId)
        } else {
            onToggleMobile()
        }
    }

    function handleMouseEnter() {
        onOpenMenu(instanceId)
    }

    function handleMouseLeave() {
        if (open) onOpenMenu(null)
    }

    function handleFocusIn() {
        onOpenMenu(instanceId)
    }

    /** @param {FocusEvent} event */
    function handleFocusOut(event) {
        if (!liElement?.contains(/** @type {Node} */ (event.relatedTarget))) {
            onOpenMenu(null)
        }
    }

    function handleItemClick() {
        onOpenMenu(null)
        onNavigate?.()
    }

    $effect(() => {
        if (!open) return

        /** @param {MouseEvent} event */
        function handleClickOutside(event) {
            if (!liElement?.contains(/** @type {Node} */ (event.target))) {
                onOpenMenu(null)
            }
        }

        /** @param {KeyboardEvent} event */
        function handleKeydown(event) {
            if (event.key === 'Escape') {
                onOpenMenu(null)
                triggerElement?.focus()
            }
        }

        const timeoutId = setTimeout(() => {
            document.addEventListener('click', handleClickOutside)
        }, 0)
        document.addEventListener('keydown', handleKeydown)

        return () => {
            clearTimeout(timeoutId)
            document.removeEventListener('click', handleClickOutside)
            document.removeEventListener('keydown', handleKeydown)
        }
    })
</script>

<li
    class="submenu-li"
    class:section-active={sectionActive}
    bind:this={liElement}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onfocusin={handleFocusIn}
    onfocusout={handleFocusOut}
>
    <button
        type="button"
        class="parent-trigger"
        aria-haspopup="menu"
        aria-expanded={panelVisible}
        aria-controls={panelId}
        bind:this={triggerElement}
        onclick={handleTriggerClick}
    >
        <span>{label}</span>
        <span class="chevron-wrap" class:collapsed={!panelVisible}>
            <RightChevron height="0.55em" />
        </span>
    </button>

    {#if panelVisible}
        <div class="submenu" role="menu" id={panelId}>
            {#each items as item (item.href)}
                <a
                    href={resolve(item.href)}
                    role="menuitem"
                    class="submenu-item"
                    class:current={isCurrent(item.href)}
                    onclick={handleItemClick}
                >
                    <span class="child-marker"></span>
                    <span class="child-name">{item.name}</span>
                    {#if item.desc}
                        <span class="child-desc">{item.desc}</span>
                    {/if}
                </a>
            {/each}
        </div>
    {/if}
</li>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .submenu-li {
        position: relative;
        margin: 0 var(--s-1);
        padding: var(--s-1) 0;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
    }

    @include for-tablet-landscape-up {
        .submenu-li {
            margin: 0 var(--s-2);
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    .parent-trigger {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        height: 100%;
        margin: 0 var(--s-2);
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
        font-size: var(--text-sm);
        color: inherit;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .parent-trigger:hover,
    .parent-trigger:focus-visible {
        color: var(--link-color);
    }

    .parent-trigger:focus-visible {
        outline: 2px solid var(--high-contrast-color);
        outline-offset: 2px;
    }

    .chevron-wrap {
        display: flex;
        align-items: center;
        opacity: 0.5;
        transform: rotate(90deg);
        transition: transform var(--duration);
    }

    .chevron-wrap.collapsed {
        transform: rotate(0deg);
    }

    .submenu-li.section-active::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        background: var(--accent);
    }

    .submenu {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }

    .submenu-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        margin: 0;
        gap: 0.1rem;
        position: relative;
        padding: var(--s-2) var(--s-1);
        border-radius: var(--radius);
        text-decoration: none;
        text-transform: none;
        letter-spacing: 0;
    }

    .submenu-item:hover,
    .submenu-item:focus-visible {
        background: var(--background-color);
    }

    .submenu-item:focus-visible {
        outline: 2px solid var(--high-contrast-color);
        outline-offset: -2px;
    }

    .child-marker {
        display: none;
    }

    .submenu-item.current .child-marker {
        display: block;
        position: absolute;
        left: 0;
        top: var(--s-2);
        bottom: var(--s-2);
        width: 3px;
        background: var(--accent);
    }

    .child-name {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--high-contrast-color);
    }

    .child-desc {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        color: var(--text-color);
    }

    /* Mobile: accordion, no absolute panel */
    @media (max-width: $breakpoint-tablet-portrait-max) {
        .parent-trigger {
            width: 100%;
            justify-content: space-between;
            margin: 0;
        }

        .submenu {
            align-items: center;
            padding: var(--s-1) 0;
        }

        .submenu-item {
            align-items: center;
            text-align: center;
        }

        .child-desc {
            display: none;
        }

        .child-name {
            font-size: var(--text-sm);
            text-transform: none;
            color: var(--text-color);
        }

        .submenu-item.current .child-name {
            color: var(--high-contrast-color);
        }

        .submenu-item.current .child-marker {
            top: 0;
            bottom: 0;
            left: 0;
        }
    }

    @include for-tablet-landscape-up {
        .submenu-li.section-active::before {
            top: 0;
            bottom: auto;
            left: 0;
            right: 0;
            width: auto;
            height: 4px;
        }

        .submenu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 20;
            min-width: 20rem;
            padding: var(--s-3);
            background: var(--light-grey);
            border-radius: var(--radius);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            animation: submenu-in 0.16s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
            .submenu {
                animation: none;
            }
        }
    }

    @keyframes submenu-in {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
