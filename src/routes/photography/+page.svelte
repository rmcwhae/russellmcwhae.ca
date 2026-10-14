<script>
    import Gallery from '#lib/components/images/Gallery.svelte'
    import ArrowNorthEast from '#lib/components/icons/ArrowNorthEast.svelte'
    import SEO from '#lib/components/base/SEO.svelte'

    let { data } = $props()

    let images = $derived(data.images ?? [])

    const BATCH = 12
    let visibleCount = $state(BATCH)
    let visibleImages = $derived(images.slice(0, visibleCount))
    let remaining = $derived(Math.max(images.length - visibleCount, 0))
    let hasMore = $derived(remaining > 0)
    /** @type {HTMLDivElement | null} */
    let sentinel = $state(null)
    let paging = false

    function loadMore() {
        if (paging || visibleCount >= images.length) return
        paging = true
        visibleCount = Math.min(visibleCount + BATCH, images.length)
        requestAnimationFrame(() => {
            paging = false
        })
    }

    $effect(() => {
        const node = sentinel
        if (!node) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) loadMore()
            },
            { rootMargin: '0px 0px 240px 0px' }
        )
        observer.observe(node)

        return () => observer.disconnect()
    })

    const destinations = [
        { href: '/events', text: 'Field Expeditions' },
        { href: '/calendars', text: 'Looking for Calendars?' },
    ]
</script>

<div class="page-header">
    <h1>Portfolio</h1>
    <p class="lede">
        A collection of landscape images from Western Canada and beyond.
    </p>
    <nav class="destinations" aria-label="Related">
        {#each destinations as destination (destination.href)}
            <a class="title-sm" href={destination.href}>
                <span>{destination.text}</span>
                <ArrowNorthEast />
            </a>
        {/each}
    </nav>
</div>

<SEO title="Photography" />

<Gallery images={visibleImages} rowHeight={300} />

{#if hasMore}
    <div class="load-more">
        <div class="sentinel" bind:this={sentinel} aria-hidden="true"></div>
        <button class="button" type="button" onclick={loadMore}>
            + Load more
            <span class="load-more-count">({remaining} more)</span>
        </button>
    </div>
{/if}

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .destinations {
        display: grid;
        margin: var(--s1) 0 0;
        border-top: 1px solid var(--light-grey);
    }

    .destinations a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.85rem 0;
        text-decoration: none;
        border-bottom: 1px solid var(--light-grey);
    }

    .destinations a:hover {
        color: var(--alpine);
        text-decoration: none;
    }

    @include for-tablet-portrait-up {
        .destinations {
            grid-template-columns: 1fr 1fr;
        }

        .destinations a:first-child {
            padding-right: var(--s1);
            border-right: 1px solid var(--light-grey);
        }

        .destinations a:last-child {
            padding-left: var(--s1);
        }
    }

    .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--s1) 0 var(--s2);
    }

    .sentinel {
        width: 100%;
        height: 1px;
    }

    .load-more-count {
        margin-left: 0.35em;
        color: var(--medium-grey);
        font-weight: 400;
    }
</style>
