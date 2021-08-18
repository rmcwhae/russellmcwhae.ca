<script context="module">
    export async function load({ fetch }) {
        try {
            const galleries = await fetch('/photos.json').then((r) => r.json())
            return { props: { galleries } }
        } catch (error) {
            console.error(error)
        }
    }
</script>

<script>
    export let galleries = []
</script>

<h1>Events</h1>

<p><a href="/photography">Portfolio</a> / Events</p>

<ul>
    {#each galleries as gallery}
        <li>
            <a href={'/photos/' + gallery.slug}>{gallery.title}</a>
            {gallery.date}
        </li>
    {/each}
</ul>
