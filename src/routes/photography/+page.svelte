<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import PageHero from '$lib/components/layout/PageHero.svelte'
    import { resolve } from '$app/paths'
    import { SvelteMap } from 'svelte/reactivity'

    let { data } = $props()

    let images = $derived(data.images)
    let events = $derived(data.events ?? [])

    const BATCH = 12
    let visibleCount = $state(BATCH)
    let visibleImages = $derived(images?.slice(0, visibleCount) ?? [])
    let hasMore = $derived((images?.length ?? 0) > visibleCount)

    function loadMore() {
        visibleCount += BATCH
    }

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

<SEO title="Photography" />

<div class="photography-page">
    <PageHero title="Photography">
        {#snippet eyebrow()}
            <div class="kicker">Visual Work</div>
        {/snippet}
        {#snippet right()}
            <p class="hero-description">
                A collection of landscape images from Western Canada and beyond.
            </p>
        {/snippet}
    </PageHero>

    <section class="portfolio-section">
        <div class="section-header-row">
            <span class="section-label">Selected Works</span>
        </div>
        <Gallery images={visibleImages} />
        {#if hasMore}
            <div class="load-more-row">
                <button class="load-more-btn" type="button" onclick={loadMore}>
                    + Load more
                    <span class="load-more-count"
                        >({(images?.length ?? 0) - visibleCount} more)</span
                    >
                </button>
            </div>
        {/if}
    </section>

    {#if events.length > 0}
        <section class="archive-section">
            <div class="archive-header">
                <span class="section-label">Field Expeditions</span>
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
                                        href={resolve('/events/' + event.name)}
                                        class="event-row"
                                    >
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
    {/if}

    <section class="calendars-note">
        <p>
            Looking for calendars? I am no longer actively making annual wall
            calendars, but you can still see an archive of them on the <a
                href={resolve('/calendars')}>calendars page</a
            >.
        </p>
    </section>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;
    @use '../../lib/scss/archive' as archive;

    .photography-page {
        margin: 0 auto;
    }

    .hero-description {
        font-size: var(--text-base);
        color: var(--text-color);
        margin: 0;
        max-width: 52ch;
        line-height: 1.7;
    }

    .portfolio-section {
        margin-bottom: var(--s3);

        .section-header-row {
            margin-bottom: var(--s1);
        }

        :global(img) {
            border-radius: 0;
        }
    }

    .archive-section {
        padding-top: var(--s2);
        border-top: 1px solid var(--light-grey);
        padding-bottom: var(--s3);
    }

    @include archive.styles();

    .event-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
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

    .event-title {
        font-family: var(--font-sans);
        font-size: var(--text-base);
        transition: color var(--duration);
    }

    .event-meta {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--text-color);
        white-space: nowrap;
        flex-shrink: 0;
    }

    .calendars-note {
        padding: var(--s2) 0 var(--s3);
        border-top: 1px solid var(--light-grey);

        p {
            font-size: var(--text-base);
            color: var(--text-color);
            max-width: 60ch;
            margin: 0;
        }
    }

    .load-more-row {
        display: flex;
        justify-content: center;
        margin-top: var(--s1);
    }

    .load-more-btn {
        font-family: var(--font-sans);
        font-size: var(--text-base);
        padding: var(--s-2) var(--s1);
        border: 1px solid var(--light-grey);
        border-radius: var(--radius);
        background: var(--background-color);
        color: var(--text-color);
        cursor: pointer;
        transition:
            border-color var(--duration),
            color var(--duration);

        &:hover {
            border-color: var(--accent);
            color: var(--link-color);
        }

        &:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
        }
    }

    .load-more-count {
        color: var(--text-color);
        font-size: var(--text-sm);
        margin-left: var(--s-3);
    }
</style>
