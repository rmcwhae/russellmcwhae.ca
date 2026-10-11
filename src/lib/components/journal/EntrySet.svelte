<script>
    import JournalEntry from './Entry.svelte'

    let { posts, level = 3, showDescription = true, showCategory = true } =
        $props()
</script>

<div class="entries">
    {#each posts as post (post.href)}
        <JournalEntry {post} {level} {showDescription} {showCategory} />
    {/each}
</div>
