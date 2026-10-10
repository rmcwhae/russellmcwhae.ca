<script>
    import { resolve } from '$app/paths'
    import JournalEntrySet from '#lib/components/journal/EntrySet.svelte'
    import JournalEntry from '#lib/components/journal/Entry.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import { EDITOR_PICKS } from '#lib/constants/journal'

    let { data } = $props()
    let posts = $derived(data.posts)
    let latestPost = $derived(data.latestPost)
    let totalWordCount = $derived(data.totalWordCount)
</script>

<SEO title="Journal" />

<div class="restricted-width journal">
    <div class="page-header">
        <h1>Journal</h1>
        <p class="lede">
            Long-form thoughts on technology, the outdoors, and life. I hope
            you’ll join me for a glimpse into my head.
        </p>
    </div>

    {#if latestPost}
        <div class="featured">
            <JournalEntry post={latestPost} featured />
        </div>
    {/if}

    <div class="columns">
        <div class="archive">
            <JournalEntrySet {posts} />
        </div>

        <aside class="sidebar">
            <p class="eyebrow">About</p>
            <p>
                I’ve kept an online journal since 2016. Text generation and
                ideas are my own, though I do use AI for editing and refining
                (as of 2025).
            </p>
            <p>
                Also see my
                <a href={resolve('/reading-list')}>reading list</a>.
            </p>
            <p class="starters-label">
                If you’re new here, these articles are a good place to start:
            </p>
            <ul class="starters">
                {#each EDITOR_PICKS as pick (pick.slug)}
                    <li>
                        <a
                            href={resolve('/journal/[slug]', {
                                slug: pick.slug,
                            })}>{pick.title}</a
                        >
                    </li>
                {/each}
            </ul>
            <p class="count">
                Total written words: {totalWordCount.toLocaleString('en-US')}
            </p>
        </aside>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .featured {
        margin-top: var(--s2);
        margin-bottom: var(--s3);
    }

    .columns {
        display: grid;
        gap: var(--s3);
        margin-top: var(--s2);
        padding-top: var(--s2);
        border-top: 1px solid var(--light-grey);
    }

    .archive {
        min-width: 0;
    }

    .sidebar {
        min-width: 0;
    }

    .sidebar .eyebrow {
        margin: 0 0 0.75rem;
    }

    .sidebar p:not(.eyebrow):not(.count) {
        max-width: 42ch;
        margin: 0 0 1rem;
        font-size: var(--text-sm);
        line-height: var(--leading-compact);
    }

    .sidebar p a {
        text-decoration: underline;
        text-decoration-color: currentColor;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.18em;

        &:hover {
            color: var(--alpine);
            text-decoration-color: currentColor;
        }
    }

    .starters-label {
        margin-bottom: 0.35rem;
    }

    .starters {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--light-grey);
    }

    .starters li {
        border-bottom: 1px solid var(--light-grey);
    }

    .starters a {
        display: block;
        padding: 0.75rem 0;
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        font-weight: 500;
        line-height: var(--leading-compact);
        text-decoration: none;
    }

    .starters a:hover {
        color: var(--alpine);
        text-decoration: none;
    }

    .count {
        margin: var(--s1) 0 0;
        font-size: var(--text-sm);
        color: var(--medium-grey);
    }

    @include for-tablet-landscape-up {
        .columns {
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            align-items: start;
            gap: 0;
        }

        .archive {
            padding-inline-end: var(--s2);
            border-inline-end: 1px solid var(--light-grey);
        }

        .sidebar {
            padding-inline-start: var(--s1);
        }
    }
</style>
