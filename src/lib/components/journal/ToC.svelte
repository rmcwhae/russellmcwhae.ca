<script>
    import { page } from '$app/stores'
    import { browser } from '$app/environment'

    /**
     * @typedef {Object} Props
     * @property {any} [allowedHeadings]
     * @property {any} [activeHeading]
     */

    /** @type {Props} */
    let { allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], activeHeading = null } = $props();

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
        updateHeadings()
        
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    })

    $effect(() => {
        if (browser) {
            // Access $page to make this reactive to page changes
            $page
            updateHeadings()
        }
    })

    function handleIntersect(entries) {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id')

            if (entry.isIntersecting) {
                document.querySelectorAll(`.toc li`).forEach((element) => {
                    element.classList.remove('active')
                })
                document
                    .querySelector(`.toc li a[href="#${id}"]`)
                    .parentElement.classList.add('active')
            }
        })
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
