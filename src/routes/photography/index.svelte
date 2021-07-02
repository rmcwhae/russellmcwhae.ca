<script context="module">
	export async function load({ fetch }) {
		try {
			const galleries = await fetch('/photography.json').then((r) => r.json());
			return { props: { galleries } };
		} catch (error) {
			console.error(error);
		}
	}
</script>

<script>
	export let galleries = [];
</script>

<h1>Photography</h1>

<h2>All Galleries</h2>

<ul>
	{#each galleries as gallery}
		<li><a href={'photos/' + gallery.slug}>{gallery.title}</a> {gallery.date}</li>
	{/each}
</ul>

<style>
	/* your styles go here */
</style>
