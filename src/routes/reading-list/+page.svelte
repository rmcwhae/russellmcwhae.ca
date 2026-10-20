<script>
    import SEO from '#lib/components/base/SEO.svelte'
    import { books, earlierYear } from './books'

    let searchQuery = $state('')

    let filteredBooks = $derived(
        searchQuery.trim()
            ? books.filter((book) => {
                  const query = searchQuery.trim().toLowerCase()
                  return (
                      book.title.toLowerCase().includes(query) ||
                      book.author.toLowerCase().includes(query)
                  )
              })
            : books
    )

    let booksByYear = $derived.by(() => {
        /** @type {Map<number, typeof filteredBooks>} */
        // eslint-disable-next-line svelte/prefer-svelte-reactivity -- recreated inside $derived.by
        const groups = new Map()
        for (const book of filteredBooks) {
            const yearBooks = groups.get(book.year)
            if (yearBooks) yearBooks.push(book)
            else groups.set(book.year, [book])
        }

        return Array.from(groups.entries()).sort(([a], [b]) => b - a)
    })

    const lede =
        'Reading is one of the ways I make sense of the world. Since 2012, I’ve tracked all the books I’ve read.'
</script>

<SEO title="Reading List" description={lede} />

<header class="page-header">
    <h1>Reading List</h1>
    <p class="lede">{lede}</p>
</header>

<section class="archive" aria-label="All books">
    <div class="archive-header">
        <p class="eyebrow">All books</p>
        <input
            class="archive-search"
            type="search"
            placeholder="Filter…"
            bind:value={searchQuery}
            aria-label="Filter books"
        />
    </div>

    {#if booksByYear.length === 0}
        <p class="no-results">No books match your search.</p>
    {:else}
        {#each booksByYear as [year, yearBooks] (year)}
            <div class="year-group">
                <h2 class="year-label">
                    {year === earlierYear ? 'Earlier' : year}
                </h2>
                <div class="year-items">
                    {#each yearBooks as book (book.title)}
                        <div class="book-row">
                            <span class="book-title">{book.title}</span>
                            <span class="book-meta">
                                <span>{book.author}</span>
                                {#if book.audiobook}
                                    <span class="caps book-format">Audio</span>
                                {/if}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    {/if}
</section>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .archive-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--s1);
        margin-bottom: var(--s1);
        flex-wrap: wrap;
    }

    .archive-header .eyebrow {
        margin: 0;
    }

    .archive-search {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        padding: var(--s-3) var(--s-1);
        border: 1px solid var(--light-grey);
        background: var(--background-color);
        color: var(--high-contrast-color);
        width: 12rem;
    }

    .book-row {
        display: flex;
        align-items: baseline;
        gap: var(--s1);
        padding: var(--s-1) 0;
        border-bottom: 1px solid var(--light-grey);
    }

    .book-row:last-child {
        border-bottom: none;
    }

    .book-title {
        flex: 1;
        min-width: 0;
        font-family: var(--font-sans);
        font-size: var(--text-base);
        font-weight: 400;
        line-height: var(--leading-compact);
        letter-spacing: 0;
        color: var(--text-color);
        text-wrap: pretty;
    }

    .book-meta {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        font-weight: 400;
        color: var(--medium-grey);
        flex-shrink: 0;
    }

    .book-format {
        margin-inline-start: 0.65rem;
        color: var(--medium-grey);
        white-space: nowrap;
    }

    .no-results {
        margin: var(--s0) 0;
        color: var(--text-color);
    }

    @include for-tablet-landscape-up {
        .year-group {
            align-items: baseline;
        }

        .book-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: baseline;
        }

        .book-meta {
            max-width: 16rem;
            justify-self: end;
            text-align: right;
            text-wrap: pretty;
        }
    }

    @include for-tablet-portrait-down {
        .book-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.15rem;
        }

        .book-meta {
            white-space: normal;
        }
    }
</style>
