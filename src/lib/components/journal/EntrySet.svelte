<script>
    import JournalEntry from './Entry.svelte'

    let { posts } = $props();
</script>

<div class="two-col-grid">
    {#each posts as post}
        <JournalEntry {post} />
    {/each}
</div>
