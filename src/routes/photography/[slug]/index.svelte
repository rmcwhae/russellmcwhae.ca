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
	import { Lightbox, LightboxImage, LightboxGallery } from 'svelte-lightbox';

	export let gallery;
</script>

<h1>{gallery.title}</h1>

<p>{gallery.date}</p>

<style>
	/* your styles go here */
</style>
