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
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
</script>

<SEO title="Journal" />

<h1 class="mb-s0">Journal</h1>

<p class="mb-2 big">
    Welcome to my online journal. This is a collection of sporadically
    published, generally long-winded thoughts on topics that are important to
    me. I hope you’ll join me for a glimpse into my head.
</p>

<JournalEntrySet {posts} />
