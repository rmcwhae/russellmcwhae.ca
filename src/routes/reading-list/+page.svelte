<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import { READING_LIST, FEATURED_BOOKS } from '$lib/data/reading-list'

    let { data } = $props()

    let searchQuery = $state('')
    let activeTopic = $state(null)

    const allBooks = READING_LIST.flatMap(({ books }) => books)

    const totalBooks = allBooks.length

    const uniqueAuthors = new Set(allBooks.map((b) => b.author)).size

    const topicCounts = $derived.by(() => {
        const counts = new Map()
        for (const book of allBooks) {
            for (const cat of book.categories ?? []) {
                counts.set(cat, (counts.get(cat) ?? 0) + 1)
            }
        }
        return Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([topic, count]) => ({ topic, count }))
    })

    const allTopics = $derived(topicCounts.map(({ topic }) => topic))

    const topTopics = $derived(topicCounts.slice(0, 6))

    const featuredBooks = $derived(
        FEATURED_BOOKS.flatMap((title) => {
            const book = allBooks.find((b) => b.title === title)
            return book ? [book] : []
        })
    )

    const filtered = $derived.by(() => {
        return READING_LIST.map(({ year, books }) => ({
            year,
            books: books.filter((b) => {
                const matchesSearch =
                    !searchQuery.trim() ||
                    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    b.author.toLowerCase().includes(searchQuery.toLowerCase())
                const matchesTopic =
                    !activeTopic || (b.categories ?? []).includes(activeTopic)
                return matchesSearch && matchesTopic
            }),
        })).filter(({ books }) => books.length > 0)
    })

    function formatDate(iso) {
        return new Date(iso + 'T00:00:00').toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }
</script>

<SEO title="Reading List" />

<div class="reading-layout">
    <div class="reading-main">
        <header>
            <div class="kicker">Library</div>
            <h1>Reading List</h1>
        </header>

        <p class="intro">
            Reading is one of the ways I make sense of the world. Since 2012,
            I’ve tracked books that have influenced my thinking on faith,
            history, adventure, and life.
        </p>

        <div class="page-meta">
            {#if data.lastUpdated}
                <span>Last updated: {formatDate(data.lastUpdated)}</span>
                <span class="meta-sep">·</span>
            {/if}
            <span>{totalBooks} books</span>
            <span class="meta-sep">·</span>
            <span>{uniqueAuthors} authors</span>
        </div>

        <div class="topic-tabs" role="tablist" aria-label="Filter by topic">
            <button
                role="tab"
                aria-selected={activeTopic === null}
                class:active={activeTopic === null}
                onclick={() => (activeTopic = null)}
            >
                All
            </button>
            {#each allTopics as topic (topic)}
                <button
                    role="tab"
                    aria-selected={activeTopic === topic}
                    class:active={activeTopic === topic}
                    onclick={() =>
                        (activeTopic = activeTopic === topic ? null : topic)}
                >
                    {topic}
                </button>
            {/each}
        </div>

        <div class="archive-header">
            <span class="section-label">Books</span>
            <input
                class="archive-search"
                type="search"
                placeholder="Filter…"
                bind:value={searchQuery}
                aria-label="Filter books"
            />
        </div>

        {#if filtered.length === 0}
            <p class="no-results">No books match your filter.</p>
        {:else}
            <div class="archive">
                {#each filtered as { year, books } (year)}
                    <div class="year-group">
                        <div class="year-label">{year}</div>
                        <div class="year-items">
                            {#each books as book (book.title)}
                                <div class="book-row">
                                    <div class="book-info">
                                        <span class="book-title"
                                            >{book.title}</span
                                        >
                                        {#if book.categories && book.categories.length > 0}
                                            <span class="book-cats">
                                                {#each book.categories as cat (cat)}
                                                    <span class="cat-chip"
                                                        >{cat}</span
                                                    >
                                                {/each}
                                            </span>
                                        {/if}
                                    </div>
                                    <span class="book-meta"
                                        >{book.author}{book.format
                                            ? ' · ' + book.format
                                            : ''}</span
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    <aside class="reading-sidebar">
        <section class="sidebar-section">
            <h2 class="sidebar-heading">Books That Stayed With Me</h2>
            {#each featuredBooks as book (book.title)}
                <div class="featured-book">
                    <span class="featured-title">{book.title}</span>
                    <span class="featured-author">{book.author}</span>
                </div>
            {/each}
        </section>

        <section class="sidebar-section stats-section">
            <div class="stat">
                <span class="stat-value">{totalBooks}</span>
                <span class="stat-label">books read</span>
            </div>
            <div class="stat">
                <span class="stat-value">{uniqueAuthors}</span>
                <span class="stat-label">authors</span>
            </div>
        </section>

        <section class="sidebar-section">
            <h2 class="sidebar-heading">Most Read Topics</h2>
            {#each topTopics as { topic, count } (topic)}
                <div class="topic-row">
                    <span class="topic-name">{topic}</span>
                    <span class="topic-count">{count}</span>
                </div>
            {/each}
        </section>
    </aside>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;
    @use '../../lib/scss/archive' as archive;

    .reading-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s3);
        max-width: 1100px;
        margin: 0 auto;
        padding-top: var(--s2);

        @include for-tablet-landscape-up {
            grid-template-columns: 1fr 260px;
            align-items: start;
        }
    }

    header {
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s1);

        h1 {
            margin: var(--s-3) 0 0;
        }
    }

    .intro {
        font-size: var(--text-base);
        color: var(--text-color);
        max-width: 60ch;
        margin: 0 0 var(--s0);
        line-height: 1.7;
    }

    .page-meta {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--text-color);
        margin-bottom: var(--s1);
        display: flex;
        gap: var(--s-2);
        flex-wrap: wrap;
    }

    .meta-sep {
        opacity: 0.4;
    }

    .topic-tabs {
        display: flex;
        gap: var(--s-3);
        flex-wrap: wrap;
        margin-bottom: var(--s1);

        button {
            font-family: var(--font-sans);
            font-size: var(--text-xs);
            padding: var(--s-4) var(--s-1);
            border: 1px solid var(--light-grey);
            border-radius: var(--circle-radius);
            background: transparent;
            color: var(--text-color);
            cursor: pointer;
            transition:
                background var(--duration),
                color var(--duration),
                border-color var(--duration);
            white-space: nowrap;
            letter-spacing: 0.03em;
            text-transform: uppercase;

            &:hover {
                border-color: var(--accent);
                color: var(--high-contrast-color);
            }

            &.active {
                background: var(--accent);
                border-color: var(--accent);
                color: var(--background-color);
            }
        }
    }

    @include archive.styles();

    .year-label {
        font-size: var(--text-lg);
        color: var(--high-contrast-color);
    }

    .book-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--s1);
        padding: var(--s-1) 0;
        border-bottom: 1px solid var(--light-grey);

        &:last-child {
            border-bottom: none;
        }
    }

    .book-info {
        display: flex;
        flex-direction: column;
        gap: var(--s-4);
        min-width: 0;
    }

    .book-title {
        font-family: var(--font-serif);
        font-size: var(--text-lg);
        color: var(--high-contrast-color);
    }

    .book-cats {
        display: flex;
        gap: var(--s-4);
        flex-wrap: wrap;
    }

    .cat-chip {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        color: var(--text-color);
        border: 1px solid var(--light-grey);
        border-radius: var(--circle-radius);
        padding: 0 var(--s-3);
        line-height: 1.6;
        letter-spacing: 0.02em;
        white-space: nowrap;
    }

    .book-meta {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--text-color);
        white-space: nowrap;
        flex-shrink: 0;
        text-align: right;
        padding-top: 0.15em;
    }

    // Sidebar

    .reading-sidebar {
        display: none;

        @include for-tablet-landscape-up {
            display: flex;
            flex-direction: column;
            gap: var(--s1);
        }
    }

    .sidebar-section {
        border: 1px solid var(--light-grey);
        border-radius: var(--radius);
        padding: var(--s0);
    }

    .sidebar-heading {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-color);
        margin: 0 0 var(--s0);
    }

    .featured-book {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: var(--s-2) 0;
        border-top: 1px solid var(--light-grey);

        &:first-of-type {
            border-top: none;
            padding-top: 0;
        }
    }

    .featured-title {
        font-family: var(--font-serif);
        font-size: var(--text-sm);
        color: var(--high-contrast-color);
        line-height: 1.4;
    }

    .featured-author {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        color: var(--text-color);
    }

    .stats-section {
        display: flex;
        gap: var(--s1);
    }

    .stat {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .stat-value {
        font-family: var(--font-sans);
        font-size: var(--text-xl);
        font-weight: 600;
        color: var(--high-contrast-color);
        line-height: 1;
    }

    .stat-label {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        color: var(--text-color);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .topic-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: var(--s-3) 0;
        border-top: 1px solid var(--light-grey);

        &:first-of-type {
            border-top: none;
            padding-top: 0;
        }
    }

    .topic-name {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--high-contrast-color);
    }

    .topic-count {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        color: var(--text-color);
    }
</style>
