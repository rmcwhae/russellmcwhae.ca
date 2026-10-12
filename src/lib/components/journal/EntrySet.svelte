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

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    @include for-tablet-portrait-up {
        .entries {
            display: grid;
            grid-template-columns: max-content 1fr auto;
            column-gap: 1.5rem;
        }
    }
</style>
