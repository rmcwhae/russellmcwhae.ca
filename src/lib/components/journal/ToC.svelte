<script>
    // Via: https://github.com/mattjennings/mattjennings.io/blob/master/src/lib/components/ToC.svelte
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import { browser } from '$app/env'

    export let allowedHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    export let activeHeading = null

    let scrollY
    let headings = []

    function updateHeadings() {
        const nodes = [
            // Exclude h1 as those should be reserved for the post title
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

        // set first heading as active if null on page load
        if (activeHeading === null) {
            activeHeading = headings[0]
        }
    }

    onMount(() => {
        updateHeadings()
        setActiveHeading()
    })

    if (browser) {
        page.subscribe(() => {
            updateHeadings()
            setActiveHeading()
        })
    }

    function setActiveHeading() {
        scrollY = window.scrollY

        const visibleIndex =
            headings.findIndex(
                (heading) =>
                    heading.node.offsetTop + heading.node.clientHeight > scrollY
            ) - 1

        activeHeading = headings[visibleIndex]

        const pageHeight = document.body.scrollHeight
        const scrollProgress = (scrollY + window.innerHeight) / pageHeight
        if (scrollProgress > 0.99) {
            // TODO add footer height…
            activeHeading = headings[headings.length - 1]
        }
    }
</script>

<svelte:window on:scroll={setActiveHeading} />
{#if headings.length}
    <aside class="toc char-limit">
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

<style type="scss">
    @import '../../../lib/scss/breakpoints.scss';

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
