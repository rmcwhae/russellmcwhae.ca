<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import PageHero from '$lib/components/layout/PageHero.svelte'
    import Image from '$lib/components/images/Image.svelte'
    import { resolve } from '$app/paths'
    import { SvelteMap } from 'svelte/reactivity'

    let { data } = $props()

    let events = $derived(data.events ?? [])

    let searchQuery = $state('')

    let filteredEvents = $derived(
        searchQuery.trim()
            ? events.filter((e) =>
                  e.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : events
    )

    let eventsByYear = $derived.by(() => {
        const groups = new SvelteMap()
        for (const event of filteredEvents) {
            const year = new Date(event.date).getFullYear()
            if (!groups.has(year)) groups.set(year, [])
            groups.get(year).push(event)
        }
        return Array.from(groups.entries()).sort(([a], [b]) => b - a)
    })
</script>

<SEO title="Field Expeditions" />

<div class="field-expeditions-page">
    <PageHero title="Field Expeditions">
        {#snippet eyebrow()}
            <div class="kicker">Photography</div>
        {/snippet}
        {#snippet right()}
            <p class="hero-description">
                Complete photo sets from individual trips — ski traverses,
                alpine routes, and coastal walks — newest first.
            </p>
        {/snippet}
    </PageHero>

    <section class="archive-section">
        <div class="archive-header">
            <span class="section-label">All Expeditions</span>
            <input
                class="archive-search"
                type="search"
                placeholder="Filter…"
                bind:value={searchQuery}
                aria-label="Filter expeditions"
            />
        </div>

        {#if eventsByYear.length === 0}
            <p class="no-results">No expeditions match your search.</p>
        {:else}
            <div class="archive">
                {#each eventsByYear as [year, yearEvents] (year)}
                    <div class="year-group">
                        <div class="year-label">{year}</div>
                        <div class="year-items">
                            {#each yearEvents as event (event.name)}
                                <a
                                    href={resolve(
                                        '/field-expeditions/' +
                                            event.name
                                    )}
                                    class="event-row"
                                >
                                    <div class="event-thumb">
                                        <Image
                                            filePath={event.featuredImage
                                                ?.filePath}
                                            width={event.featuredImage?.width}
                                            height={event.featuredImage?.height}
                                            lockedRatio
                                            photoswipe={false}
                                            displayWidth={96}
                                        />
                                    </div>
                                    <span class="event-title"
                                        >{event.title}</span
                                    >
                                    <span class="event-meta">
                                        {event.date}&thinsp;·&thinsp;{event.count}
                                        photos
                                    </span>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </section>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;
    @use '../../lib/scss/archive' as archive;

    .field-expeditions-page {
        margin: 0 auto;
    }

    .hero-description {
        font-size: var(--text-base);
        color: var(--text-color);
        margin: 0;
        max-width: 52ch;
        line-height: 1.7;
    }

    .archive-section {
        padding-top: var(--s2);
        padding-bottom: var(--s3);
    }

    @include archive.styles();

    .event-row {
        display: flex;
        align-items: center;
        gap: var(--s1);
        padding: var(--s-1) 0;
        border-bottom: 1px solid var(--light-grey);
        text-decoration: none;
        color: inherit;

        &:last-child {
            border-bottom: none;
        }

        &:hover .event-title {
            color: var(--link-color);
            text-decoration: underline;
            text-decoration-color: var(--accent);
            text-decoration-thickness: 2px;
            text-underline-offset: 4px;
        }
    }

    .event-thumb {
        width: 96px;
        flex-shrink: 0;
        border-radius: 2px;
        overflow: hidden;

        @media (max-width: $breakpoint-tablet-portrait-max) {
            width: 64px;
        }
    }

    .event-title {
        font-family: var(--font-sans);
        font-size: var(--text-base);
        flex: 1;
        min-width: 0;
        transition: color var(--duration);
    }

    .event-meta {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--text-color);
        white-space: nowrap;
        flex-shrink: 0;
    }
</style>
