<script>
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import CategoryLink from '$lib/components/journal/CategoryLink.svelte'

    let { data } = $props();

    let posts = $derived(data.posts)
    let category = $derived(data.category)
    let otherCategories = $derived(data.otherCategories)
</script>

<SEO title="Journal" />

<div class="restricted-width">
    <h2 class="mb-s0">Posts categorized as “{category}”</h2>
    <p class="mb-2">
        <a href="/journal">All posts</a><span>|</span>Other categories:
        {#each otherCategories as otherCategory, i (otherCategory)}
            <CategoryLink
                category={otherCategory}
            />{#if i !== otherCategories.length - 1}<span>|</span>{/if}
        {/each}
    </p>

    <JournalEntrySet {posts} />
</div>

<style>
    span {
        margin-left: var(--s-2);
        margin-right: var(--s-2);
    }
</style>
