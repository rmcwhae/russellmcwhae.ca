<script context="module">
    export async function load() {
        const posts = Object.entries(
            import.meta.globEager('/content/journal/*.md')
        )
            .map(([, post]) => ({
                // frontmatter data
                ...post.metadata,
            }))
            .filter((post) => !post.draft)
            .sort((a, b) => (a.date < b.date ? 1 : -1))

        return {
            props: {
                posts,
            },
        }
    }
</script>

<script>
    import JournalEntry from '$lib/components/JournalEntry.svelte'
    import SEO from '$lib/components/SEO.svelte'

    export let posts
</script>

<SEO title="Journal" />

<!-- <p>
    Writing is my way of making sense of things, both by exploring subjects from
    many different angles, and by discussing the ideas of others who have
    wrestled with similar questions. I hope you’ll join me for a glimpse into my
    head.
</p> -->
<div class="archive">
    {#each posts as post}
        <JournalEntry {post} />
    {/each}
</div>

<style>
    .archive {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        grid-gap: var(--s3);
    }
</style>
