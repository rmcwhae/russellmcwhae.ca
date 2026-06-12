<script>
    import { browser } from '$app/environment'
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

    let headings = $state([])
    let observer

    function disconnectObserver() {
        if (observer) {
            observer.disconnect()
            observer = undefined
        }
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
        page.url.pathname

        updateHeadings()

        return () => {
            headings = []
            disconnectObserver()
        }
    })

    function handleIntersect(entries) {
        const visibleHeadings = []

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const rect = entry.boundingClientRect
                const viewportHeight = window.innerHeight

                // Calculate how much of the heading's content is visible
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
            // Find the heading with the highest visibility ratio
            // or if tied, the one closest to the top
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

            // Update active state
            document.querySelectorAll('.toc li').forEach((element) => {
                element.classList.remove('active')
            })
            const activeElement = document.querySelector(
                `.toc li a[href="#${activeHeading.id}"]`
            )
            if (activeElement) {
                activeElement.parentElement.classList.add('active')
            }
        }
    }
</script>

{#if headings.length}
    <aside class="toc" data-test="toc">
        <ul>
            {#each headings as heading (heading.node.id)}
                <li
                    class="toc-level-{heading.depth}"
                    class:active={activeHeading?.node === heading.node}
                >
                    <a href={`#${heading.node.id}`}>{heading.title}</a>
                </li>
            {/each}
        </ul>
    </aside>
{/if}

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    aside {
        max-width: 70ch;
        margin: 0 auto;

        @include for-desktop-up {
            max-width: none;
            margin: 0;
            position: sticky;
            top: var(--s0);
            max-height: calc(100vh - var(--s0));
            overflow: auto;
        }
    }
</style>
