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

    export let events
</script>

<SEO title="Events" />

<div class="flex items-center justify-between full-bleed mb-s0">
    <h1>Events</h1>
    <Button href="/photography" text="Portfolio" left />
</div>

<div class="three-col-grid full-bleed">
    {#each events as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>
