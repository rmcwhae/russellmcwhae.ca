<script>
    import { resolve } from '$app/paths'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    let { data } = $props()
    let posts = $derived(data.posts)
    let latestPost = $derived(data.latestPost)
    let totalWordCount = $derived(data.totalWordCount)
</script>

<SEO title="Journal" />

<div class="restricted-width">
    <p class="mb-2">
        Welcome to my online journal, a collection of long-form thoughts on
        technology, the outdoors, and life. Text generation and ideas are my
        own, though I do use AI for editing and refining (as of 2025). I hope
        you’ll join me for a glimpse into my head. Also see my
        <a href={resolve('/reading-list')}>reading list</a>.
    </p>
    <div class="mb-s0 featured">
        <JournalEntry post={latestPost} featured />
    </div>

    <JournalEntrySet {posts} />

    <p class="count sub mt-2">Total written words: {totalWordCount}</p>
</div>

<style>
    .featured {
        border-top: 1px solid var(--light-grey);
    }
    .count {
        text-align: center;
    }
</style>
