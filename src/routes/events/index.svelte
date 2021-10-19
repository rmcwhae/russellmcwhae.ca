<script context="module">
    export async function load({ page, fetch }) {
        try {
            const { events, pages } = await fetch(
                `/events.json?${page.query}`
            ).then((r) => r.json())

            return {
                props: {
                    events,
                    pages,
                },
            }
        } catch (error) {
            console.error(error)
        }
    }
</script>

<script>
    import { page } from '$app/stores'
    import Event from '$lib/components/images/Event.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import Pagination from '$lib/components/misc/Pagination.svelte'

    export let events
    export let pages

    $: currentPage = +$page.query.get('page') || 1
</script>

<SEO title="Events" />

<div class="flex items-center justify-between">
    <h1>Events</h1>
    <Button href="/photography" text="Portfolio" left />
</div>

<div class="three-col-grid full-bleed">
    {#each events as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>

<Pagination {pages} {currentPage} href={(page) => `?page=${page}`} />
