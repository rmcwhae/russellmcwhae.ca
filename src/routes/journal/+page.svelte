<script>
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    let { data } = $props()
    let posts = $derived(data.posts)
    let totalWordCount = $derived(data.totalWordCount)
    let featuredPost = $derived(posts[0])
    let remainingPosts = $derived(posts.slice(1))
</script>

<SEO title="Journal" />

{#if featuredPost}
    <section class="featured-article full-bleed">
        <div class="featured-article-inner restricted-width">
            <JournalEntry post={featuredPost} featured />
        </div>
    </section>
{/if}

<div class="journal restricted-width">
    <aside class="journal-intro">
        <p>
            Welcome to my online journal, a collection of long-form thoughts on
            topics that are important to me. Text generation and ideas are my
            own, though I do use AI for editing and refining. I hope you’ll join
            me for a glimpse into my head.
        </p>
        <p class="sub">
            Also see my <a href="/reading-list">reading list</a>.
        </p>
    </aside>

    <div class="journal-main">
        <JournalEntrySet posts={remainingPosts} layout="archive" />

        <p class="count sub mt-2">Total written words: {totalWordCount}</p>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .featured-article {
        margin-bottom: var(--s3);
        padding: var(--s3) 0 var(--s3);
        border-bottom: 1px solid var(--light-grey);

        @include for-tablet-landscape-up {
            padding: var(--s3) 0 var(--s4);
        }
    }

    .journal {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s1);
    }

    .journal-intro p {
        margin: 0;
    }

    .journal-intro p + p {
        margin-top: var(--s1);
    }

    .count {
        text-align: left;
    }

    @include for-tablet-landscape-up {
        .journal {
            grid-template-columns: auto minmax(0, 2fr) minmax(0, 1fr);
            gap: var(--s2);
            align-items: start;
        }

        .journal-main {
            grid-column: 1 / 3;
            grid-row: 1;
            min-width: 0;
        }

        .journal-intro {
            grid-column: 3;
            grid-row: 1;
            font-size: 0.95rem;
            line-height: 1.5;
        }
    }
</style>
