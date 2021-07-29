<script context="module">
    const allPosts = import.meta.glob('./*.md')

    let body = []

    for (let path in allPosts) {
        body.push(
            allPosts[path]().then(({ metadata }) => {
                return { path, metadata }
            })
        )
    }

    export async function load() {
        const unsortedPosts = await Promise.all(body)
        const posts = unsortedPosts
            .filter((post) => !post.metadata.draft)
            .sort((a, b) => {
                return new Date(b.metadata.date) - new Date(a.metadata.date)
            })

        return {
            props: { posts },
        }
    }
</script>

<script>
    export let posts
</script>

<p>
    Welcome to my online journal. This is a collection of infrequently
    published, generally long-winded thoughts on topics that are important to
    me. In publishing on such a seldom basis, my aim is to prevent information
    overload and instead provide concise, polished-until-they-shine works that
    remain relevant beyond staying at the top of a news feed for a few days.
    Writing is my way of making sense of things, both by exploring subjects from
    many different angles, and by discussing the ideas of others who have
    wrestled with similar questions. I hope you’ll join me for a glimpse into my
    head.
</p>

<ul>
    {#each posts as { path, metadata: { title } }}
        <li>
            <a href={`/journal/${path.replace('.md', '')}`}>{title}</a>
        </li>
    {/each}
</ul>
