<script>
    import Image from '#lib/components/images/Image.svelte'
    import SEO from '#lib/components/base/SEO.svelte'

    let { data } = $props()

    let events = $derived(data.events ?? [])
    let searchQuery = $state('')

    let filteredEvents = $derived(
        searchQuery.trim()
            ? events.filter((event) =>
                  event.title
                      .toLowerCase()
                      .includes(searchQuery.trim().toLowerCase())
              )
            : events
    )

    /** @param {string} date */
    function groupLabel(date) {
        const parsed = new Date(date)
        if (Number.isNaN(parsed.getTime())) return date
        const year = parsed.getFullYear()
        return Number.isNaN(year) ? date : String(year)
    }

    let eventsByYear = $derived.by(() => {
        /** @type {Map<string, typeof filteredEvents>} */
        // eslint-disable-next-line svelte/prefer-svelte-reactivity -- recreated inside $derived.by
        const groups = new Map()
        for (const event of filteredEvents) {
            const label = groupLabel(event.date)
            const yearEvents = groups.get(label)
            if (yearEvents) yearEvents.push(event)
            else groups.set(label, [event])
        }

        return Array.from(groups.entries()).sort(([a], [b]) => {
            const aYear = Number(a)
            const bYear = Number(b)
            const aValid = Number.isInteger(aYear)
            const bValid = Number.isInteger(bYear)
            if (aValid && bValid) return bYear - aYear
            if (aValid) return -1
            if (bValid) return 1
            return 0
        })
    })
</script>

<SEO title="Field Expeditions" />

<div class="page-header">
    <h1>Field Expeditions</h1>
    <p class="lede">Complete photo sets from individual trips.</p>
</div>

<section class="archive" aria-label="All expeditions">
    <div class="archive-header">
        <p class="eyebrow">All expeditions</p>
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
        {#each eventsByYear as [year, yearEvents] (year)}
            <div class="year-group">
                <div class="year-label">{year}</div>
                <div class="year-items">
                    {#each yearEvents as event (event.name)}
                        <a class="event-row" href="/events/{event.name}">
                            <div class="event-thumb">
                                {#if event.featuredImage}
                                    <Image
                                        filePath={event.featuredImage.filePath}
                                        width={event.featuredImage.width}
                                        height={event.featuredImage.height}
                                        lockedRatio
                                        photoswipe={false}
                                    />
                                {/if}
                            </div>
                            <span class="event-copy">
                                <span class="event-title">{event.title}</span>
                                <span class="event-meta">
                                    {event.date} · {event.count} photos
                                </span>
                            </span>
                        </a>
                    {/each}
                </div>
            </div>
        {/each}
    {/if}
</section>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    h1 {
        margin-top: 0.35rem;
        margin-bottom: 0.4rem;
    }

    .eyebrow a {
        color: inherit;
        font-weight: 500;
        text-decoration: none;
    }

    .eyebrow a:hover {
        color: var(--alpine);
        text-decoration: none;
    }

    .lede {
        max-width: 36rem;
        margin: 0 0 var(--s1);
        color: var(--text-color);
        font-size: 1.05rem;
        line-height: 1.5;
    }

    .archive-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--s1);
        margin-bottom: var(--s1);
        flex-wrap: wrap;
    }

    .archive-header .eyebrow {
        margin: 0;
    }

    .archive-search {
        font-family: var(--font-sans);
        font-size: 0.95rem;
        padding: var(--s-3) var(--s-1);
        border: 1px solid var(--light-grey);
        background: var(--background-color);
        color: var(--high-contrast-color);
        width: 12rem;
    }

    .year-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s-2);
    }

    .year-group + .year-group {
        margin-top: -1px;
        border-top: 1px solid var(--light-grey);
        padding-top: var(--s-1);
    }

    .year-label {
        font-family: var(--font-sans);
        font-size: 0.95rem;
        color: var(--medium-grey);
        padding-top: var(--s-1);
    }

    .event-row {
        display: flex;
        align-items: center;
        gap: var(--s1);
        padding: var(--s-1) 0;
        border-bottom: 1px solid var(--light-grey);
        color: inherit;
        text-decoration: none;
    }

    .event-row:last-child {
        border-bottom: none;
    }

    .event-row:hover {
        text-decoration: none;
    }

    .event-row:hover .event-title {
        color: var(--alpine);
    }

    .event-thumb {
        width: 96px;
        flex-shrink: 0;
        overflow: hidden;
    }

    .event-copy {
        display: flex;
        align-items: baseline;
        gap: var(--s1);
        flex: 1;
        min-width: 0;
    }

    .event-title {
        font-family: var(--font-serif);
        font-size: 1.15rem;
        font-weight: 500;
        line-height: 1.25;
        flex: 1;
        min-width: 0;
    }

    .event-meta {
        font-family: var(--font-sans);
        font-size: 0.95rem;
        font-weight: 400;
        color: var(--medium-grey);
        white-space: nowrap;
        flex-shrink: 0;
    }

    .no-results {
        margin: var(--s0) 0;
        color: var(--text-color);
    }

    @include for-tablet-landscape-up {
        .year-group {
            grid-template-columns: 5rem minmax(0, 1fr);
            gap: var(--s2);
        }

        .year-label {
            padding-top: calc(var(--s0) + 0.1rem);
        }
    }

    @include for-tablet-portrait-down {
        .event-copy {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.15rem;
        }

        .event-meta {
            white-space: normal;
        }
    }

    @include for-phone-only {
        .event-thumb {
            width: 64px;
        }
    }
</style>
