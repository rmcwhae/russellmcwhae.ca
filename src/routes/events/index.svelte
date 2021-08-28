<script context="module">
    export async function load({ fetch }) {
        try {
            const events = await fetch('/events.json').then((r) => r.json())
            return { props: events }
        } catch (error) {
            console.error(error)
        }
    }
</script>

<script>
    import Event from '$lib/components/Event.svelte'
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'

    const items = [
        { text: 'Portfolio', url: '/photography' },
        { text: 'Events' },
    ]

    export let events
</script>

<h1>Events</h1>

<Breadcrumbs {items} />

<div>
    {#each events as { name: eventName, featuredImage, date, count, title }}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: var(--s2);
    }
</style>
