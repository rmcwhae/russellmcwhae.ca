<script>
    import { browser } from '$app/env'
    import { page } from '$app/state'

    /**
     * @typedef {Object} Props
     * @property {any} [allowedHeadings]
     * @property {any} [activeHeading]
     */

    /** @type {Props} */
    let {
        allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        activeHeading = null,
    } = $props()

    const PROGRESS_RADIUS = 25
    const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS

    let headings = $state([])
    let scrollProgress = $state(0)
    let observer
    let drawerOpen = $state(false)
    let drawerEl = $state(null)
    let triggerEl = $state(null)
    let sidebarEl = $state(null)

    let progressOffset = $derived(PROGRESS_CIRCUMFERENCE * (1 - scrollProgress))

    function disconnectObserver() {
        if (observer) {
            observer.disconnect()
            observer = undefined
        }
    }

    function updateScrollProgress() {
        const scrollTop = window.scrollY
        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight

        scrollProgress =
            maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0
    }

    function updateHeadings() {
        disconnectObserver()

        const nodes = [
            ...document.querySelectorAll(
                `article :where(${allowedHeadings.join(', ')})`
            ),
        ]

        if (nodes.length === 0) {
            headings = []
            return
        }

        const depths = nodes.map((node) => Number(node.nodeName[1]))
        const minDepth = Math.min(...depths)

        headings = nodes.map((node, idx) => ({
            title: node.innerText,
            depth: depths[idx] - minDepth,
            node,
        }))

        observer = new IntersectionObserver(handleIntersect)

        nodes.forEach((heading) => {
            observer.observe(heading)
        })
    }

    $effect(() => {
        if (!browser) return

        // Re-run when navigating between journal entries
        void page.url.pathname

        updateHeadings()
        updateScrollProgress()
        drawerOpen = false

        window.addEventListener('scroll', updateScrollProgress, {
            passive: true,
        })
        window.addEventListener('resize', updateScrollProgress)

        return () => {
            headings = []
            drawerOpen = false
            disconnectObserver()
            window.removeEventListener('scroll', updateScrollProgress)
            window.removeEventListener('resize', updateScrollProgress)
        }
    })

    $effect(() => {
        if (!browser || !sidebarEl) return

        const container = sidebarEl.parentElement
        if (!container) return

        const closeWhenSidebarFits = () => {
            if (window.getComputedStyle(sidebarEl).display !== 'none')
                drawerOpen = false
        }

        const observer = new ResizeObserver(closeWhenSidebarFits)
        observer.observe(container)
        closeWhenSidebarFits()

        return () => observer.disconnect()
    })

    $effect(() => {
        if (!browser || !drawerOpen) return

        document.addEventListener('keydown', handleKeydown)
        drawerEl?.querySelector('a, button')?.focus()

        return () => document.removeEventListener('keydown', handleKeydown)
    })

    function toggleDrawer() {
        drawerOpen = !drawerOpen
    }

    function closeDrawer() {
        drawerOpen = false
        triggerEl?.focus()
    }

    function handleLinkClick() {
        closeDrawer()
    }

    function handleBackdropClick() {
        closeDrawer()
    }

    function handleKeydown(event) {
        if (event.key === 'Escape' && drawerOpen) closeDrawer()
    }

    function handleIntersect(entries) {
        const visibleHeadings = []

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const rect = entry.boundingClientRect
                const viewportHeight = window.innerHeight

                const visibleHeight =
                    Math.min(rect.bottom, viewportHeight) -
                    Math.max(rect.top, 0)
                const visibilityRatio = visibleHeight / viewportHeight

                visibleHeadings.push({
                    id: entry.target.getAttribute('id'),
                    element: entry.target,
                    visibilityRatio,
                    top: rect.top,
                })
            }
        })

        if (visibleHeadings.length > 0) {
            const activeHeading = visibleHeadings.reduce((prev, current) => {
                if (current.visibilityRatio > prev.visibilityRatio)
                    return current
                if (
                    current.visibilityRatio === prev.visibilityRatio &&
                    current.top < prev.top
                )
                    return current

                return prev
            })

            document.querySelectorAll('.toc li').forEach((element) => {
                element.classList.remove('active')
            })
            document
                .querySelectorAll(`.toc li a[href="#${activeHeading.id}"]`)
                .forEach((activeElement) => {
                    activeElement.parentElement.classList.add('active')
                })
        }
    }
</script>

{#snippet headingList(closeOnClick)}
    <ul>
        {#each headings as heading (heading.node.id)}
            <li
                class="toc-level-{heading.depth}"
                class:active={activeHeading?.node === heading.node}
            >
                <a
                    href={`#${heading.node.id}`}
                    onclick={closeOnClick ? handleLinkClick : undefined}
                    >{heading.title}</a
                >
            </li>
        {/each}
    </ul>
{/snippet}

{#if headings.length}
    <aside class="toc toc-sidebar" data-test="toc" bind:this={sidebarEl}>
        {@render headingList(false)}
    </aside>

    <div class="toc-fab-wrap" data-test="toc-fab">
        <svg class="toc-progress-ring" viewBox="0 0 56 56" aria-hidden="true">
            <circle
                class="toc-progress-track"
                cx="28"
                cy="28"
                r={PROGRESS_RADIUS}
            />
            <circle
                class="toc-progress-fill"
                cx="28"
                cy="28"
                r={PROGRESS_RADIUS}
                style="stroke-dasharray: {PROGRESS_CIRCUMFERENCE}; stroke-dashoffset: {progressOffset}"
            />
        </svg>

        <button
            class="toc-fab"
            type="button"
            aria-expanded={drawerOpen}
            aria-controls="toc-drawer"
            aria-label="Table of contents"
            bind:this={triggerEl}
            onclick={toggleDrawer}
        >
            <svg class="toc-fab-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="4.5" cy="6" r="1.25" fill="currentColor" />
                <line
                    x1="8"
                    y1="6"
                    x2="20"
                    y2="6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <circle cx="4.5" cy="12" r="1.25" fill="currentColor" />
                <line
                    x1="8"
                    y1="12"
                    x2="15"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <circle cx="4.5" cy="18" r="1.25" fill="currentColor" />
                <line
                    x1="8"
                    y1="18"
                    x2="17"
                    y2="18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                />
            </svg>
        </button>
    </div>

    <button
        class="toc-backdrop"
        class:active={drawerOpen}
        type="button"
        aria-label="Close table of contents"
        tabindex="-1"
        onclick={handleBackdropClick}
    ></button>

    <div
        id="toc-drawer"
        class="toc-drawer"
        class:active={drawerOpen}
        role="dialog"
        aria-modal={drawerOpen}
        aria-hidden={!drawerOpen}
        aria-label="Table of contents"
        bind:this={drawerEl}
    >
        <div class="toc-drawer-header">
            <p class="toc-drawer-title">On this page</p>
            <button
                class="toc-drawer-close"
                type="button"
                aria-label="Close table of contents"
                onclick={closeDrawer}
                ><span aria-hidden="true">&times;</span></button
            >
        </div>
        <nav class="toc" aria-label="Table of contents">
            {@render headingList(true)}
        </nav>
    </div>
{/if}

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    // Matches the article's 62ch column. The sidebar stays hidden until the
    // centered column has a full 238px sidebar's worth of room on the left.
    $toc-sidebar-max: 238px;

    @mixin when-sidebar-fits {
        @container article-columns (min-width: calc(62ch + 2 * #{$toc-sidebar-max})) {
            @content;
        }
    }

    .toc-sidebar {
        display: none;

        @include when-sidebar-fits {
            display: block;
            grid-column: 1;
            justify-self: start;
            align-self: start;
            max-width: $toc-sidebar-max;
            position: sticky;
            top: var(--s0);
            max-height: calc(100vh - var(--s0));
            overflow: auto;
        }
    }

    .toc-fab-wrap {
        position: fixed;
        bottom: var(--s2);
        right: var(--s1);
        z-index: 8;
        width: 56px;
        height: 56px;

        @include for-tablet-portrait-down {
            bottom: max(var(--s-2), env(safe-area-inset-bottom, 0px));
            right: var(--s0);
        }

        @include when-sidebar-fits {
            display: none;
        }
    }

    .toc-progress-ring {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        pointer-events: none;
    }

    .toc-progress-track,
    .toc-progress-fill {
        fill: none;
        stroke-width: 2;
    }

    .toc-progress-track {
        stroke: var(--light-grey);
    }

    .toc-progress-fill {
        stroke: var(--high-contrast-color);
        stroke-linecap: round;
        transition: stroke-dashoffset 0.15s ease;
    }

    .toc-fab {
        position: absolute;
        inset: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        margin: 0;
        padding: 0;
        border: none;
        border-radius: 50%;
        background-color: var(--background-color);
        color: var(--high-contrast-color);
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.14);
        transition:
            color var(--duration),
            box-shadow var(--duration);

        &:hover,
        &:focus-visible {
            color: var(--alpine);
            outline: none;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        }
    }

    .toc-fab-icon {
        width: 22px;
        height: 22px;
        display: block;
    }

    .toc-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9;
        margin: 0;
        padding: 0;
        border: none;
        background-color: var(--background-color-transparent);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition:
            opacity var(--duration) ease,
            visibility 0s linear var(--duration);

        &.active {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transition:
                opacity var(--duration) ease,
                visibility 0s linear 0s;
        }

        @include when-sidebar-fits {
            display: none;
        }
    }

    .toc-drawer {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        max-height: min(60vh, 28rem);
        background-color: var(--background-color);
        border-top: 1px solid var(--light-grey);
        border-radius: var(--radius) var(--radius) 0 0;
        padding: var(--s0) var(--s1)
            max(var(--s1), env(safe-area-inset-bottom, 0px));
        overflow: hidden;
        transform: translateY(100%);
        visibility: hidden;
        pointer-events: none;
        transition:
            transform var(--duration) ease,
            visibility 0s linear var(--duration);

        &.active {
            transform: translateY(0);
            visibility: visible;
            pointer-events: auto;
            transition:
                transform var(--duration) ease,
                visibility 0s linear 0s;
        }

        .toc {
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
        }

        .toc ul {
            margin-bottom: 0;
        }

        @include when-sidebar-fits {
            display: none;
        }
    }

    .toc-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        margin-bottom: var(--s-1);
        padding-bottom: var(--s-1);
        border-bottom: 1px solid var(--light-grey);
    }

    .toc-drawer-title {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        color: var(--high-contrast-color);
    }

    .toc-drawer-close {
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--high-contrast-color);
        line-height: 1;
        padding: var(--s-2);
        display: flex;
        align-items: center;
        font: inherit;
        font-size: 1.5rem;
        border-radius: var(--radius);
        transition: color var(--duration);

        &:hover,
        &:focus-visible {
            color: var(--alpine);
            outline: none;
        }
    }
</style>
