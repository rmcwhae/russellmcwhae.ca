<script>
    import { browser } from '$app/environment'

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

    function updateHeadings() {
        const nodes = [
            ...document.querySelectorAll(
                `article :where(${allowedHeadings.join(', ')})`
            ),
        ]
        const depths = nodes.map((node) => Number(node.nodeName[1]))
        const minDepth = Math.min(...depths)

        headings = nodes.map((node, idx) => ({
            title: node.innerText,
            depth: depths[idx] - minDepth,
            node,
        }))

        observer = new IntersectionObserver(handleIntersect)

        // Track all headings that have an `id` applied
        nodes.forEach((heading) => {
            observer.observe(heading)
        })
    }

    $effect(() => {
        if (browser) {
            updateHeadings()

            return () => {
                if (observer) {
                    observer.disconnect()
                }
            }
        }
    })

    $effect(() => {
        if (browser) {
            // Access page to make this reactive to page changes
            updateHeadings()
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
    <aside class="toc char-limit" data-test="toc">
        <ul>
            {#each headings as heading}
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
            margin: inherit;
            max-width: 238px;
            position: sticky;
            top: var(--s0);
            left: var(--s0);
            float: left;
            max-height: calc(100vh - var(--s0));
            overflow: auto;
        }
    }
</style>
