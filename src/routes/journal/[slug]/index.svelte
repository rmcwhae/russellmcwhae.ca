<script context="module">
	export async function load({ page, fetch }) {
		const slug = page.params.slug;
		const post = await fetch(`/journal/${slug}.json`).then((r) => r.json());
		return {
			props: { post }
		};
	}
</script>

<script>
	export let post;
</script>

<h1>{post.title}</h1>

<p>
	{post.description}
	{post.readingTime}
	{post.date}
</p>

{@html post.html}

<style>
	/* your styles go here */
</style>
