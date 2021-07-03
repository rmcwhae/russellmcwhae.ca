<script context="module">
	export async function load({ page, fetch }) {
		const slug = page.params.slug;
		const gallery = await fetch(`/photography/${slug}.json`).then((r) => r.json());
		return {
			props: { gallery }
		};
	}
</script>

<script>
	export let gallery;
</script>

<h1>{gallery.title}</h1>

<p>{gallery.date}</p>

{#each gallery.images as image}
	<p>{image.title}</p>
	<!-- <img srcset={Logo1} type="image/webp" alt="testattribute" />  TODO build me -->
{/each}

<style>
	/* your styles go here */
</style>
