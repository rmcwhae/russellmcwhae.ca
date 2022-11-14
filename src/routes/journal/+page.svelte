<script>
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    export let data
    $: posts = data.posts
    $: latestPost = data.latestPost
</script>

<SEO title="Journal" />

<div class="restricted-width">
    <!-- <h1 class="mb-s0">Journal</h1> -->

    <p class="mb-2">
        Welcome to my online journal, a collection of infrequently published,
        usually long-winded thoughts on topics that are important to me. I hope
        you’ll join me for a glimpse into my head.
    </p>
    <div class="mb-s0 featured">
        <JournalEntry post={latestPost} featured />
    </div>

    <JournalEntrySet {posts} />
</div>

<style>
    .featured {
        /* text-align: center; */
        border-top: 1px solid var(--light-grey);
        /* padding-top: var(--s0); */
    }
</style>
