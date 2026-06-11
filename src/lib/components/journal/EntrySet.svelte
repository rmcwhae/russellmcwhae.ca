<script>
    import JournalEntry from './Entry.svelte'

    /** @typedef {'grid' | 'archive'} Layout */

    /**
     * @typedef {Object} Props
     * @property {import('$lib/services/posts').Post[]} posts
     * @property {Layout} [layout]
     */

    /** @type {Props} */
    let { posts, layout = 'grid' } = $props()

    let postsByYear = $derived.by(() => {
        if (layout !== 'archive') return []

        /** @type {Map<number, typeof posts>} */
        const groups = new Map()

        for (const post of posts) {
            const year = new Date(post.date).getFullYear()
            const yearPosts = groups.get(year)

            if (yearPosts) {
                yearPosts.push(post)
            } else {
                groups.set(year, [post])
            }
        }

        return Array.from(groups.entries()).sort(([a], [b]) => b - a)
    })
</script>

{#if layout === 'archive'}
    <div class="archive">
        {#each postsByYear as [year, yearPosts] (year)}
            <section class="year-group">
                <h4 class="mt-3">{year}</h4>
                <div class="archive-list">
                    {#each yearPosts as post, i (post.slug)}
                        <JournalEntry {post} archive firstInYear={i === 0} />
                    {/each}
                </div>
            </section>
        {/each}
    </div>
{:else}
    <div class="two-col-grid">
        {#each posts as post (post.slug)}
            <JournalEntry {post} />
        {/each}
    </div>
{/if}

<style lang="scss">
    .archive-list {
        display: flex;
        flex-direction: column;
    }
</style>
