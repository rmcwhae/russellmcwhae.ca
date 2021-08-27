<script context="module">
    export async function load({ fetch }) {
        const images = await fetch(`/photography.json`).then((r) => r.json())
        return {
            props: images,
        }
    }
</script>

<script>
    import Image from 'svelte-image'
    // import Image from 'svimg'
    // export let images
</script>

<h1>Portfolio</h1>

<p>
    These are my favourite photos. Also see <a href="/photos">Events</a>.
</p>

<Image src="portfolio-images/RMCWHAE-20210504-DSC00303-Edit-Edit.jpg" />
<Image src="portfolio-images/RMCWHAE-20210611-DSC03897.jpg" />
<Image src="portfolio-images/RMCWHAE-20210109-DSC03464-Edit-Enhanced.jpg" />
<!-- Preprocessors only have access to a component's source code, so src strings MUST be hardcoded. Let's find a way to automate this… -->
