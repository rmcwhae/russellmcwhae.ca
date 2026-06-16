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
                    <div class="year-books">
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
            margin: 0;
        }
    }

    .intro {
        font-size: 15px;
        color: var(--text-color);
        max-width: 60ch;
        margin: 0 0 var(--s2);
    }

    .archive-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--s1);
        margin-bottom: var(--s1);
        flex-wrap: wrap;
    }

    .archive-search {
        font-family: var(--font-sans);
        font-size: 0.85rem;
        padding: var(--s-3) var(--s-1);
        border: 1px solid var(--light-grey);
        border-radius: var(--radius);
        background: var(--background-color);
        color: var(--text-color);
        width: 12rem;
        transition: border-color var(--duration);

        &:focus {
            outline: none;
            border-color: var(--accent);
        }
    }

    .year-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s-2);

        @include for-tablet-landscape-up {
            grid-template-columns: 5rem minmax(0, 1fr);
            gap: var(--s2);
        }
    }

    .year-group + .year-group {
        margin-top: -1px;
        border-top: 1px solid var(--light-grey);
        padding-top: var(--s-1);
    }

    .year-label {
        font-family: var(--font-sans);
        font-size: 0.85rem;
        color: var(--text-color);
        padding-top: var(--s-1);

        @include for-tablet-landscape-up {
            padding-top: calc(var(--s0) + 0.1rem);
        }
    }

    .year-books {
        display: flex;
        flex-direction: column;
    }

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
        font-size: 0.95rem;
        font-style: italic;
    }

    .book-meta {
        font-family: var(--font-sans);
        font-size: 0.8rem;
        color: var(--text-color);
        white-space: nowrap;
        flex-shrink: 0;
        text-align: right;
    }

    .no-results {
        font-size: 0.9rem;
        color: var(--text-color);
        margin: var(--s0) 0;
    }
</style>
