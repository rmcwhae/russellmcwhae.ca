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

    export let events
</script>

<h1>Events</h1>

<p><a href="/photography">Portfolio</a> / Events</p>

{#each events as { name: eventName, featuredImage, date, count, title }}
    <Event {eventName} {featuredImage} {date} {count} {title} />
{/each}
