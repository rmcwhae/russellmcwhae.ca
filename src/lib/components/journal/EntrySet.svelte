<script>
    import JournalEntry from './Entry.svelte'

    export let posts
</script>

<div class="two-col-grid">
    {#each posts as post}
        <JournalEntry {post} />
    {/each}
</div>
