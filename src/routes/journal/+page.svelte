<script>
    import { resolve } from '$app/paths'
    import JournalEntrySet from '#lib/components/journal/EntrySet.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import { EDITOR_PICKS } from '#lib/constants/journal'

    let { data } = $props()
    let posts = $derived(data.posts)
    let totalWordCount = $derived(data.totalWordCount)
</script>

<SEO title="Journal" />

<div class="journal restricted-width">
    <div class="page-header">
        <h1>Journal</h1>
        <p class="lede">
            Long-form thoughts on technology, the outdoors, and life.
        </p>
    </div>

    <div class="split">
        <aside class="sidebar">
            <p class="eyebrow">About</p>
            <p class="about-copy">
                I’ve kept an online journal since 2016. Text generation and
                ideas are my own, though I do use AI for editing and refining,
                as of 2025.
            </p>
            <p>
                <a href={resolve('/reading-list')}>Reading list</a>
            </p>
            <div class="start-here">
                <p class="eyebrow">Start Here</p>
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
            </div>
            <p class="count">
                Total words: {totalWordCount.toLocaleString('en-US')}
            </p>
        </aside>

        <div class="main">
            <div class="archive">
                <p class="eyebrow">All entries</p>
                <JournalEntrySet {posts} />
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .journal {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .split {
        display: flex;
        flex-direction: column;
    }

    .main {
        order: 1;
    }

    .sidebar {
        order: 2;
        min-width: 0;
        margin-top: var(--s3);
    }

    .archive {
        min-width: 0;
        margin-top: var(--s1);

        .eyebrow {
            margin: 0 0 var(--s0);
        }

        :global(.entries > section:last-child) {
            border-bottom: none;
        }
    }

    .sidebar .eyebrow {
        margin: 0 0 0.75rem;
    }

    .start-here {
        margin-top: var(--s2);
    }

    .sidebar p:not(.eyebrow):not(.count) {
        margin: 0 0 1rem;
        font-size: var(--text-sm);
        line-height: var(--leading-compact);
    }

    .sidebar p.about-copy:not(.eyebrow) {
        line-height: 1.3;
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
        .page-header {
            margin-bottom: var(--s2);
        }

        .split {
            display: grid;
            grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
            align-items: start;
        }

        .sidebar,
        .main {
            order: 0;
        }

        .main {
            grid-column: 1;
            grid-row: 1;
            min-width: 0;
            padding-inline-end: var(--s2);
        }

        .sidebar {
            grid-column: 2;
            grid-row: 1;
            margin-top: 0;
            padding-inline-start: var(--s2);
        }

        .archive {
            margin-top: 0;
        }
    }
</style>
