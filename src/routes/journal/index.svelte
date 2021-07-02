<script context="module">
	export async function load({ fetch }) {
		try {
			const blog = await fetch('/journal.json');
			const posts = await blog.json();
			return { props: { posts } };
		} catch (error) {
			console.error(error);
		}
	}
</script>

<script>
	export let posts = [];
</script>

<p>
	Welcome to my online journal. This is a collection of infrequently published, generally
	long-winded thoughts on topics that are important to me. In publishing on such a seldom basis, my
	aim is to prevent information overload and instead provide concise, polished-until-they-shine
	works that remain relevant beyond staying at the top of a news feed for a few days. Writing is my
	way of making sense of things, both by exploring subjects from many different angles, and by
	discussing the ideas of others who have wrestled with similar questions. I hope you’ll join me for
	a glimpse into my head.
</p>

<ul>
	{#each posts as post}
		<li>
			<a href={'journal/' + post.slug}>{post.title}</a>
			{post.description}
			{post.readingTime}
			{post.date}
		</li>
	{/each}
</ul>

<style>
	/* your styles go here */
</style>
