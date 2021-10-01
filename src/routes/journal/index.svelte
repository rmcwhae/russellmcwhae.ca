<script context="module">
    import { posts } from '$lib/services/posts'

    export async function load() {
        return {
            props: {
                posts,
            },
        }
    }
</script>

<script>
    import JournalEntrySet from '$lib/components/JournalEntrySet.svelte'
    import SEO from '$lib/components/SEO.svelte'
</script>

<SEO title="Journal" />

<!-- <p>
    Writing is my way of making sense of things, both by exploring subjects from
    many different angles, and by discussing the ideas of others who have
    wrestled with similar questions. I hope you’ll join me for a glimpse into my
    head.
</p> -->

<JournalEntrySet {posts} />
