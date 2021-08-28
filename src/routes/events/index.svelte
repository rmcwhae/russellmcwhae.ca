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
    import * as StringUtils from '$lib/utils/string'

    export let events
</script>

<h1>Events</h1>

<p><a href="/photography">Portfolio</a> / Events</p>

<ul>
    {#each events as { name }}
        <li>
            <a href={'/events/' + name}>{StringUtils.createTitle(name)}</a>
            {StringUtils.extractDate(name)}
        </li>
    {/each}
</ul>
