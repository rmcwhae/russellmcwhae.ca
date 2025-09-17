<script>
    import Event from '$lib/components/images/Event.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    let { data } = $props()

    let events = $derived(data.events)
</script>

<SEO title="Events" />

<div class="flex items-center justify-between mb-s0">
    <h1>Events</h1>
    <Button href="/photography" text="Portfolio" left />
</div>

<div class="events-grid">
    {#each events as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>
