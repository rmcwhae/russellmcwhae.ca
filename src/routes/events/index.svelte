<script context="module">
    const PAGE_SIZE = 40
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
    import Event from '$lib/components/Event.svelte'
    import Button from '$lib/components/Button.svelte'
    import Pagination from '$lib/components/Pagination.svelte'

    export let events
    export let page
</script>

<Button href="/photography" text="Portfolio" left />

<h1>Events</h1>

<div>
    {#each events as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>

<!-- <Pagination {page} href="/events" pageSize={PAGE_SIZE} length={events.length} /> -->
<style>
    div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        grid-gap: var(--s2);
    }
    h1 {
        margin: var(--s0) 0;
        /* TODO make me DRYer */
    }
</style>
