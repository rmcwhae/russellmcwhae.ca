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
    import Event from '$lib/components/Event.svelte'
    import Button from '$lib/components/Button.svelte'
    import Pagination from '$lib/components/Pagination.svelte'
    import SEO from '$lib/components/SEO.svelte'

    export let events

    const total = events.length
    const per_page = 40

    let current_page = 1

    $: filteredEvents = events.slice(
        (current_page - 1) * per_page,
        current_page * per_page
    )

    function changePage(event) {
        current_page = event.page
    }
</script>

<SEO title="Events" />

<Button href="/photography" text="Portfolio" left />

<h1>Events</h1>

<div>
    {#each filteredEvents as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>

{#if total > per_page}
    <Pagination
        {current_page}
        {total}
        {per_page}
        on:change={(event) => changePage({ page: event.detail })}
    />
{/if}

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
