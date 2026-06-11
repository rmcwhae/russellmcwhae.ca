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
                <h4 class="year-label">{year}</h4>
                <div class="year-posts">
                    {#each yearPosts as post, i (post.slug)}
                        <JournalEntry {post} archive firstInYear={i === 0} />
                    {/each}
                </div>
            </section>
        {/each}
    </div>
{:else}
    <div class="two-col-grid">
        {#each posts as post (post.slug ?? post.href)}
            <JournalEntry {post} />
        {/each}
    </div>
{/if}

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .year-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s-1);
    }

    .year-group + .year-group {
        margin-top: var(--s3);
    }

    .year-label {
        margin: 0;
        color: var(--text-color);
    }

    .year-posts {
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    @include for-tablet-landscape-up {
        .archive {
            --entry-title-line-height: calc(1.536rem * 1.2);
        }

        .year-group {
            grid-template-columns: auto minmax(0, 1fr);
            gap: var(--s2);
            align-items: start;
        }

        .year-label {
            display: flex;
            align-items: flex-end;
            height: var(--entry-title-line-height);
            line-height: 1.2;
        }
    }
</style>
