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
    import SEO from '$lib/components/base/SEO.svelte'

    export let events
</script>

<SEO title="Events" />

<div class="flex items-center justify-between">
    <h1>Events</h1>
    <Button href="/photography" text="Portfolio" left />
</div>

<div class="events">
    {#each events as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>

<style>
    .events {
        margin-top: var(--s1);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        grid-gap: var(--s2);
    }
</style>
