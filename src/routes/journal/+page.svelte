<script>
    import { resolve } from '$app/paths'
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import CategorySelector from '$lib/components/journal/CategorySelector.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    let { data } = $props()
    let posts = $derived(data.posts)
    let totalWordCount = $derived(data.totalWordCount)
    let essayCount = $derived(data.essayCount)
    let writingSinceYear = $derived(data.writingSinceYear)
    let formattedWordCount = $derived(totalWordCount.toLocaleString('en-US'))
    let featuredPost = $derived(posts[0])
    let remainingPosts = $derived(posts.slice(1))
</script>

<SEO title="Journal" />

{#if featuredPost}
    <section class="featured-article border-bottom-thick full-bleed">
        <div class="featured-article-inner restricted-width">
            <JournalEntry post={featuredPost} featured />
        </div>
    </section>
{/if}

<div class="journal restricted-width">
    <div class="journal-main">
        <JournalEntrySet posts={remainingPosts} layout="archive" />
    </div>

    <aside class="journal-sidebar">
        <div class="sidebar-block">
            <div class="section-label sidebar-heading">About this journal</div>
            <p>
                Welcome to my online journal, a collection of long-form thoughts on
                topics that are important to me. Text generation and ideas are my
                own, though I do use AI for editing and refining (as of 2025). I
                hope you'll join me for a glimpse into my head.
            </p>
            <p>
                Also see my <a href={resolve('/reading-list')}>reading list</a>.
            </p>
        </div>

        <div class="sidebar-block">
            <div class="section-label sidebar-heading">Categories</div>
            <CategorySelector />
        </div>

        <div class="sidebar-block sidebar-stats">
            <div class="section-label sidebar-heading">Stats</div>
            <ul class="stats-list sub">
                <li>Writing since {writingSinceYear}</li>
                <li>{essayCount} {essayCount === 1 ? 'essay' : 'essays'}</li>
                <li>{formattedWordCount} words</li>
            </ul>
        </div>
    </aside>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .featured-article {
        margin-bottom: var(--s3);
        padding: var(--s3) 0 var(--s3);

        @include for-laptop-only {
            margin-bottom: var(--s2);
            padding: var(--s2) 0 var(--s3);
        }

        @include for-desktop-up {
            padding: var(--s3) 0 var(--s4);
        }
    }

    .journal {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s2);
    }

    .journal-sidebar {
        display: flex;
        flex-direction: column;
        gap: var(--s2);
    }

    .sidebar-block p {
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0;
        color: var(--text-color);

        & + p {
            margin-top: var(--s-1);
        }
    }

    .sidebar-heading {
        margin-bottom: var(--s-1);
    }

    .stats-list {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
        color: var(--text-color);
    }

    @include for-tablet-landscape-up {
        .journal {
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            align-items: start;
        }

        .journal-main {
            grid-column: 1;
            grid-row: 1;
            min-width: 0;
        }

        .journal-sidebar {
            grid-column: 2;
            grid-row: 1;
            font-size: 0.95rem;
            line-height: 1.5;
            position: sticky;
            top: var(--s1);
        }
    }
</style>
