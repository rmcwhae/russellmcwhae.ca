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
    import SEO from '$lib/components/base/SEO.svelte'
</script>

<SEO title="Journal" />

<JournalEntrySet {posts} />
