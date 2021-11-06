<script>
    import JournalEntry from './Entry.svelte'

    export let posts
</script>

<div>
    {#each posts as post}
        <JournalEntry {post} />
    {/each}
</div>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        grid-gap: var(--s2);
    }
    @media (max-width: 640px) {
        div {
            grid-gap: var(--s0);
        }
    }
</style>
