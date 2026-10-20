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
                placeholder: featured?.placeholder,
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

    const lede = 'Complete photo sets from individual trips.'
</script>

<SEO title="Field Expeditions" description={lede} />

<header class="page-header">
    <h1>Field Expeditions</h1>
    <p class="lede">{lede}</p>
</header>

<section class="archive" aria-label="All expeditions">
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

<style>
    .year-mosaic {
        min-width: 0;
    }
</style>
