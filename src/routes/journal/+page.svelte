<script>
    import { resolve } from '$app/paths'
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
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
    <section class="featured-article border-bottom full-bleed">
        <div class="featured-article-inner restricted-width">
            <div class="journal-page-header">
                <h1 class="kicker">Writing</h1>
            </div>
            <JournalEntry post={featuredPost} featured />
        </div>
    </section>
{:else}
    <div class="journal-page-header">
        <h1 class="kicker">Writing</h1>
    </div>
{/if}

<div class="journal restricted-width">
    <div class="journal-main">
        <JournalEntrySet posts={remainingPosts} layout="archive" />
    </div>

    <aside class="journal-sidebar">
        <div class="sidebar-block">
            <div class="section-label sidebar-heading">About</div>
            <p>
                Welcome to my online journal, a collection of long-form thoughts
                on technology, the outdoors, and life. Text generation and ideas
                are my own, though I do use AI for editing and refining (as of
                2025). I hope you’ll join me for a glimpse into my head.
            </p>
            <p>
                Also see my <a href={resolve('/reading-list')}>reading list</a>.
            </p>
        </div>
    </aside>
</div>

<div class="journal-stats restricted-width">
    <div class="stat">
        <span class="stat-value">{writingSinceYear}</span>
        <span class="stat-label">Writing since</span>
    </div>
    <div class="stat">
        <span class="stat-value">{essayCount}</span>
        <span class="stat-label">{essayCount === 1 ? 'entry' : 'entries'}</span>
    </div>
    <div class="stat">
        <span class="stat-value">{formattedWordCount}</span>
        <span class="stat-label">words</span>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .journal-page-header {
        padding-bottom: var(--s1);
    }

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

    .journal-stats {
        display: flex;
        justify-content: center;
        gap: var(--s4);
        padding: var(--s3) 0;
        text-align: center;
    }

    .stat {
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
    }

    .stat-value {
        font-size: 1.953rem;
        font-weight: normal;
        color: var(--high-contrast-color);
        line-height: 1;
    }

    .stat-label {
        font-family: var(--font-sans);
        font-size: 0.7rem;
        font-weight: normal;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--text-color);
    }

    @include for-tablet-landscape-up {
        .featured-article {
            margin-bottom: 0;
        }

        .journal {
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            align-items: start;
            gap: 0;
        }

        .journal-main {
            grid-column: 1;
            grid-row: 1;
            min-width: 0;
            padding-top: var(--s3);
            padding-right: var(--s2);
            border-right: 1px solid var(--light-grey);
        }

        .journal-sidebar {
            grid-column: 2;
            grid-row: 1;
            font-size: 0.95rem;
            line-height: 1.5;
            position: sticky;
            top: var(--s1);
            padding-top: var(--s3);
            padding-left: var(--s2);
        }
    }

    @include for-laptop-only {
        .journal-main {
            padding-top: var(--s2);
        }

        .journal-sidebar {
            padding-top: var(--s2);
        }
    }
</style>
