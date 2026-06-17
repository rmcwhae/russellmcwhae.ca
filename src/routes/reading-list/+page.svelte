<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import { READING_LIST } from '$lib/data/reading-list'

    let searchQuery = $state('')

    let filtered = $derived(
        searchQuery.trim()
            ? READING_LIST.map(({ year, books }) => ({
                  year,
                  books: books.filter(
                      (b) =>
                          b.title
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                          b.author
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                  ),
              })).filter(({ books }) => books.length > 0)
            : READING_LIST
    )
</script>

<SEO title="Reading List" />

<div class="reading-page">
    <header>
        <div class="kicker">Library</div>
        <h1>Reading List</h1>
    </header>

    <p class="intro">
        Reading is how I feed my soul. A list of books I’ve read, in reverse
        chronological&nbsp;order.
    </p>

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
        <p class="no-results">No books match your search.</p>
    {:else}
        <div class="archive">
            {#each filtered as { year, books } (year)}
                <div class="year-group">
                    <div class="year-label">{year}</div>
                    <div class="year-items">
                        {#each books as book (book.title)}
                            <div class="book-row">
                                <span class="book-title">{book.title}</span>
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

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;
    @use '../../lib/scss/archive' as archive;

    .reading-page {
        max-width: 900px;
        margin: 0 auto;
        padding-top: var(--s2);
    }

    header {
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s2);

        h1 {
            margin: var(--s-3) 0 0;
        }
    }

    .intro {
        font-size: var(--text-base);
        color: var(--text-color);
        max-width: 60ch;
        margin: 0 0 var(--s2);
        line-height: 1.7;
    }

    @include archive.styles();

    .book-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: var(--s1);
        padding: var(--s-1) 0;
        border-bottom: 1px solid var(--light-grey);

        &:last-child {
            border-bottom: none;
        }
    }

    .book-title {
        font-family: var(--font-serif);
        font-size: var(--text-base);
        font-style: italic;
    }

    .book-meta {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--text-color);
        white-space: nowrap;
        flex-shrink: 0;
        text-align: right;
    }
</style>
