<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import { resolve } from '$app/paths'
    import { SvelteMap } from 'svelte/reactivity'

    let { data } = $props()

    let images = $derived(data.images)
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

<SEO title="Photography" />

<div class="photography-page">
    <section class="hero-section">
        <div class="hero-left">
            <div class="kicker">Visual Work</div>
            <h1>Photography</h1>
        </div>
        <div class="hero-right">
            <p>
                A collection of images from the Canadian Rockies and beyond. I
                also produce annual wall calendars — see the <a
                    href={resolve('/calendars')}>calendars page</a
                > for more.
            </p>
        </div>
    </section>

    <section class="portfolio-section">
        <div class="section-header-row">
            <span class="section-label">Selected Works</span>
        </div>
        <Gallery {images} />
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
                            <div class="year-events">
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
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .photography-page {
        max-width: 1400px;
        margin: 0 auto;
    }

    .hero-section {
        padding: var(--s2) 0;
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s2);

        @include for-tablet-landscape-up {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--s3);
            align-items: end;
        }
    }

    .hero-left h1 {
        margin: var(--s-2) 0 0;
    }

    .hero-right p {
        font-size: 15px;
        color: var(--text-color);
        margin: 0;
        max-width: 52ch;
    }

    .portfolio-section {
        margin-bottom: var(--s3);

        .section-header-row {
            margin-bottom: var(--s1);
        }
    }

    .archive-section {
        padding-top: var(--s2);
        border-top: 1px solid var(--light-grey);
        padding-bottom: var(--s3);
    }

    .archive-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--s1);
        margin-bottom: var(--s1);
        flex-wrap: wrap;
    }

    .archive-search {
        font: inherit;
        font-size: 0.85rem;
        padding: var(--s-3) var(--s-1);
        border: 1px solid var(--light-grey);
        border-radius: var(--radius);
        background: var(--background-color);
        color: var(--text-color);
        width: 12rem;
        transition: border-color var(--duration);

        &:focus {
            outline: none;
            border-color: var(--accent);
        }
    }

    .year-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s-2);

        @include for-tablet-landscape-up {
            grid-template-columns: 5rem minmax(0, 1fr);
            gap: var(--s2);
        }
    }

    .year-group + .year-group {
        margin-top: -1px;
        border-top: 1px solid var(--light-grey);
        padding-top: var(--s-1);
    }

    .year-label {
        font-family: var(--font-sans);
        font-size: 0.85rem;
        color: var(--text-color);
        padding-top: var(--s-1);

        @include for-tablet-landscape-up {
            padding-top: calc(var(--s0) + 0.1rem);
        }
    }

    .year-events {
        display: flex;
        flex-direction: column;
    }

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
        font-size: 0.95rem;
        transition: color var(--duration);
    }

    .event-meta {
        font-family: var(--font-sans);
        font-size: 0.8rem;
        color: var(--text-color);
        white-space: nowrap;
        flex-shrink: 0;
    }

    .no-results {
        font-size: 0.9rem;
        color: var(--text-color);
        margin: var(--s0) 0;
    }
</style>
