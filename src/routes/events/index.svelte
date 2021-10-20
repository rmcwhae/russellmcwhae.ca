<script context="module">
    export async function load({ fetch }) {
        try {
            const events = await fetch('/events.json').then((r) => r.json())
            return {
                props: {
                    events,
                },
            }
        } catch (error) {
            console.error(error)
        }
    }
</script>

<script>
    import Event from '$lib/components/images/Event.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import Pagination from '$lib/components/misc/Pagination.svelte'
    import { paginate } from '$lib/utils/array'
    import { EVENTS_PER_PAGE } from '$lib/constants'

    export let events

    const pageSize = EVENTS_PER_PAGE

    let currentPage = 1

    $: paginatedEvents = paginate(events, pageSize, currentPage)
</script>

<SEO title="Events" />

<div class="flex items-center justify-between">
    <h1>Events</h1>
    <Button href="/photography" text="Portfolio" left />
</div>

<div class="three-col-grid full-bleed">
    {#each paginatedEvents as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>

<Pagination
    totalItems={events.length}
    {pageSize}
    {currentPage}
    on:setPage={(e) => {
        currentPage = e.detail.page
    }}
/>
