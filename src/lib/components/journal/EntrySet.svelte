<script>
    import JournalEntry from './Entry.svelte'

    export let posts
</script>

<div class="journal-entry-set">
    {#each posts as post}
        <div class="border-bottom">
            <JournalEntry {post} />
        </div>
    {/each}
</div>

<style>
    .journal-entry-set {
        margin-top: var(--s2);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        grid-gap: var(--s2);
    }
    @media (max-width: 640px) {
        .journal-entry-set {
            grid-gap: var(--s0);
        }
    }
</style>
