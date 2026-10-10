<script>
    import SEO from '#lib/components/base/SEO.svelte'
    import { books } from './books'

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
        /** @type {Map<string, typeof filteredBooks>} */
        // eslint-disable-next-line svelte/prefer-svelte-reactivity -- recreated inside $derived.by
        const groups = new Map()
        for (const book of filteredBooks) {
            const yearBooks = groups.get(book.year)
            if (yearBooks) yearBooks.push(book)
            else groups.set(book.year, [book])
        }

        return Array.from(groups.entries()).sort(([a], [b]) => {
            const aYear = Number(a)
            const bYear = Number(b)
            const aValid = Number.isInteger(aYear)
            const bValid = Number.isInteger(bYear)
            if (aValid && bValid) return bYear - aYear
            if (aValid) return -1
            if (bValid) return 1
            return 0
        })
    })
</script>

<SEO title="Reading List" />

<div class="restricted-width">
    <div class="page-header">
        <h1>Reading List</h1>
        <p class="lede">
            Reading is one of the ways I make sense of the world. Since 2012,
            I’ve tracked books that have influenced my thinking.
        </p>
    </div>

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
                    <h2 class="year-label">{year}</h2>
                    <div class="year-items">
                        {#if year === 'Earlier'}
                            <p class="earlier-note">
                                Exact timing on when I read these is fuzzy, but
                                I do remember these titles being worthwhile.
                            </p>
                        {/if}
                        {#each yearBooks as book (book.title)}
                            <div class="book-row">
                                <span class="book-title title-sm"
                                    >{book.title}</span
                                >
                                <span class="book-meta">
                                    {book.author}{book.audiobook
                                        ? ' · Audiobook'
                                        : ''}
                                </span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        {/if}
    </section>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .restricted-width {
        width: 100%;
    }

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

    .year-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s-2);
    }

    .year-group + .year-group {
        margin-top: -1px;
        border-top: 1px solid var(--light-grey);
        padding-top: var(--s-1);
    }

    .year-label {
        margin: 0;
        padding-top: var(--s-1);
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        font-weight: 400;
        line-height: var(--leading-body);
        letter-spacing: 0;
        color: var(--medium-grey);
    }

    .earlier-note {
        margin: 0;
        padding-top: var(--s-1);
        color: var(--text-color);
        font-size: var(--text-sm);
        line-height: var(--leading-compact);
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
        text-wrap: pretty;
    }

    .book-meta {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        font-weight: 400;
        color: var(--medium-grey);
        white-space: nowrap;
        flex-shrink: 0;
    }

    .no-results {
        margin: var(--s0) 0;
        color: var(--text-color);
    }

    @include for-tablet-landscape-up {
        .year-group {
            grid-template-columns: 5rem minmax(0, 1fr);
            gap: var(--s2);
        }

        .year-label {
            padding-top: calc(var(--s0) + 0.1rem);
        }

        .book-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: baseline;
        }

        .book-meta {
            max-width: 16rem;
            justify-self: end;
            white-space: normal;
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
