<script>
    import JournalEntry from './Entry.svelte'

    let { posts, level = 3 } = $props()
</script>

<div class="entries">
    {#each posts as post (post.href)}
        <JournalEntry {post} {level} />
    {/each}
</div>
