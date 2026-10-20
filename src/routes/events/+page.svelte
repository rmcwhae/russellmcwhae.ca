<script>
    import { MediaQuery } from 'svelte/reactivity'
    import Gallery from 'svelte-gallery'
    import EventCard from '#lib/components/images/EventCard.svelte'
    import SEO from '#lib/components/base/SEO.svelte'

    let { data } = $props()

    let events = $derived(data.events ?? [])
    // Read synchronously on the client so the gallery lays out once with the
    // right row height; the server renders the desktop values.
    const phone = new MediaQuery('max-width: 576px', false)
    let rowHeight = $derived(phone.current ? 112 : 300)
    let gutter = $derived(phone.current ? 8 : 12)

    /** @param {string} date */
    function groupLabel(date) {
        // Prefer a 4-digit year from the string — Safari rejects Date.parse of
        // values like “September 2025”, which would otherwise group by month.
        const match = String(date).match(/\b(19|20)\d{2}\b/)
        if (match) return match[0]

        const parsed = new Date(date)
        if (Number.isNaN(parsed.getTime())) return date
        const year = parsed.getFullYear()
        return Number.isNaN(year) ? date : String(year)
    }

    /**
     * @param {typeof events} yearEvents
     */
    function mosaicImages(yearEvents) {
        return yearEvents.map((event) => {
            const featured = event.featuredImage
            return {
                filePath: featured?.filePath,
                width: featured?.width || 3,
                height: featured?.height || 2,
                title: event.title,
                href: `/events/${event.name}`,
            }
        })
    }

    let eventsByYear = $derived.by(() => {
        /** @type {Map<string, typeof events>} */
        // eslint-disable-next-line svelte/prefer-svelte-reactivity -- recreated inside $derived.by
        const groups = new Map()
        for (const event of events) {
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

<div class="restricted-width">
    <div class="page-header">
        <h1>Field Expeditions</h1>
        <p class="lede">Complete photo sets from individual trips.</p>
    </div>

    <section class="archive" aria-label="All expeditions">
        <p class="eyebrow archive-heading">All expeditions</p>

        {#each eventsByYear as [year, yearEvents] (year)}
            <div class="year-group">
                <h2 class="year-label">{year}</h2>
                <div class="year-mosaic">
                    <Gallery
                        images={mosaicImages(yearEvents)}
                        {rowHeight}
                        {gutter}
                        imageComponent={EventCard}
                    />
                </div>
            </div>
        {/each}
    </section>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .restricted-width {
        width: 100%;
    }

    .archive-heading {
        margin: 0 0 var(--s1);
    }

    .year-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s-2);
    }

    .year-group + .year-group {
        margin-top: var(--s2);
        padding-top: var(--s1);
        border-top: 1px solid var(--light-grey);
    }

    .year-label {
        margin: 0;
        padding-top: var(--s-1);
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        font-weight: 600;
        line-height: var(--leading-body);
        letter-spacing: 0;
        color: var(--medium-grey);
    }

    .year-mosaic {
        min-width: 0;
    }

    @include for-phone-only {
        .year-group {
            gap: 0.35rem;
        }

        .year-group + .year-group {
            margin-top: var(--s0);
            padding-top: var(--s0);
        }

        .year-label {
            padding-top: 0;
            font-size: var(--text-xs);
        }
    }

    @include for-tablet-landscape-up {
        .year-group {
            grid-template-columns: 5rem minmax(0, 1fr);
            gap: var(--s2);
        }

        .year-label {
            padding-top: 0.35rem;
        }
    }
</style>
