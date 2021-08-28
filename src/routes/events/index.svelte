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
    import Image from '$lib/components/Image.svelte'

    export let events
</script>

<h1>Events</h1>

<p><a href="/photography">Portfolio</a> / Events</p>

{#each events as { name: eventName, featuredImage: { name, filePath, width, height }, date, count, title }}
    <section>
        <h2><a href={'/events/' + eventName}>{title}</a></h2>

        <p class="sub">{date} &middot; {count} photos</p>

        <Image {name} {filePath} {width} {height} />
    </section>
{/each}
