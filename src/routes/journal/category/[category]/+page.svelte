<script>
    import { resolve } from '$app/paths'
    import JournalEntrySet from '#lib/components/journal/EntrySet.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import CategoryLink from '#lib/components/journal/CategoryLink.svelte'

    let { data } = $props()

    let posts = $derived(data.posts)
    let category = $derived(data.category)
    let otherCategories = $derived(data.otherCategories)
</script>

<SEO title={`Journal » ${category}`} />

<div class="char-limit">
    <header class="page-header">
        <p class="eyebrow"><a href={resolve('/journal')}>Journal</a></p>
        <h1>Posts categorized as “{category}”</h1>
    </header>
    <p class="categories">
        Other categories:
        {#each otherCategories as otherCategory, i (otherCategory)}
            <CategoryLink
                category={otherCategory}
            />{#if i !== otherCategories.length - 1}<span>&middot;</span>{/if}
        {/each}
    </p>

    <JournalEntrySet {posts} level={2} />
</div>

<style>
    .categories {
        margin: 0 0 var(--s2);
        font-size: var(--text-sm);
    }

    span {
        margin-left: var(--s-2);
        margin-right: var(--s-2);
    }
</style>
