<script>
    import JournalEntry from './Entry.svelte'

    let { posts } = $props()
</script>

<div class="entries">
    {#each posts as post (post.href)}
        <JournalEntry {post} />
    {/each}
</div>
