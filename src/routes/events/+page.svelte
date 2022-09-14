<script>
    import Event from '$lib/components/images/Event.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    export let data
    const { events } = data
</script>

<SEO title="Events" />

<div class="flex items-center justify-between mb-s0">
    <h1>Events</h1>
    <Button href="/photography" text="Portfolio" left />
</div>

<div class="three-col-grid">
    {#each events as { name: eventName, featuredImage, date, count, title } (eventName)}
        <Event {eventName} {featuredImage} {date} {count} {title} />
    {/each}
</div>
