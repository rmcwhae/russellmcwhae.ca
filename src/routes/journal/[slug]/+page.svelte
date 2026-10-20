<script>
    import Date from '#lib/components/misc/Date.svelte'
    import NoWrapLastTwoWords from '#lib/components/misc/NoWrapLastTwoWords.svelte'
    import Button from '#lib/components/buttons/Button.svelte'
    import ButtonSet from '#lib/components/buttons/ButtonSet.svelte'
    import JournalEntrySet from '#lib/components/journal/EntrySet.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import ToC from '#lib/components/journal/ToC.svelte'
    import CategoryLink from '#lib/components/journal/CategoryLink.svelte'
    import LinkList from '#lib/components/misc/LinkList.svelte'
    import { mountFootnotes } from '#lib/components/journal/mountFootnotes.js'

    let { data } = $props()

    let title = $derived(data.title)
    let date = $derived(data.date)
    let category = $derived(data.category)
    let description = $derived(data.description)
    let readingTime = $derived(data.readingTime)
    let component = $derived(data.component)
    let relatedPosts = $derived(data.relatedPosts)
    let wordCount = $derived(readingTime.words.toLocaleString('en-US'))
    let relatedLinks = $derived(
        relatedPosts.map((post) => ({ href: post.href, title: post.title }))
    )

    const SvelteComponent = $derived(component)

    /** @type {HTMLElement | undefined} */
    let article = $state()

    $effect(() => {
        if (!article || !component) return

        const footnotes = mountFootnotes(article)
        return () => footnotes.destroy()
    })
</script>

<SEO title={'Journal » ' + title} {description} type="article" />

<div class="entry">
    <div class="entry-grid">
        <header class="page-header page-header-entry">
            <div class="header-main">
                <div class="sub">
                    <Date {date} />
                </div>
                <h1><NoWrapLastTwoWords text={title} /></h1>
                {#if description}
                    <p class="lede">
                        <NoWrapLastTwoWords text={description} />
                    </p>
                {/if}
                <!-- Becomes the facts list once the sidebar fits -->
                <div class="sub header-meta">
                    {#if category}
                        <CategoryLink {category} />
                        &middot;
                    {/if}
                    <span class="nowrap">{wordCount} words</span>
                    &middot;
                    <span class="nowrap">{readingTime.text}</span>
                </div>
            </div>
            <dl class="facts">
                {#if category}
                    <div>
                        <dt class="eyebrow">Category</dt>
                        <dd><CategoryLink {category} /></dd>
                    </div>
                {/if}
                <div>
                    <dt class="eyebrow">Length</dt>
                    <dd>{wordCount} words</dd>
                </div>
                <div>
                    <dt class="eyebrow">Reading time</dt>
                    <dd>{readingTime.text}</dd>
                </div>
            </dl>
        </header>

        <article class="char-limit flow" bind:this={article}>
            <SvelteComponent />
        </article>
        <aside class="entry-sidebar">
            <ToC allowedHeadings={['h2', 'h3']} />
            {#if relatedLinks.length}
                <div class="sidebar-related">
                    <LinkList heading="Related entries" items={relatedLinks} />
                    <Button href="/journal" text="All entries" right />
                </div>
            {/if}
        </aside>

        <!-- Moves into the sidebar once it fits -->
        <section class="related section-break">
            <h2 class="eyebrow">Related entries</h2>
            <JournalEntrySet posts={relatedPosts} />

            <div class="mt-3">
                <ButtonSet>
                    <Button href="/journal" text="All entries" right />
                </ButtonSet>
            </div>
        </section>
    </div>
</div>

<style lang="scss">
    @use '../../../lib/scss/breakpoints' as *;

    .entry {
        container: article-columns / inline-size;
    }

    // A single column until the sidebar fits; an empty second column would
    // still take the gap and narrow the article on small screens. Once it
    // fits, the header and body share one grid from the logo edge: article
    // and title on the left, facts and sidebar in the right column.
    .entry-grid {
        @include when-entry-sidebar-fits {
            display: grid;
            grid-template-columns:
                minmax(0, var(--measure))
                $entry-sidebar-width;
            column-gap: var(--s3);
            align-items: start;
        }
    }

    .page-header-entry {
        max-width: var(--measure);
        margin-bottom: var(--s2);
        padding-bottom: var(--s1);
        border-bottom: 1px solid var(--light-grey);

        @include when-entry-sidebar-fits {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: subgrid;
            align-items: end;
            max-width: none;
        }
    }
    .header-main {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
    }
    .page-header-entry .lede {
        margin: 0;
    }
    .page-header-entry .sub {
        color: var(--text-color);
    }

    .header-meta {
        @include when-entry-sidebar-fits {
            display: none;
        }
    }

    article {
        min-width: 0;
    }

    // Label and value side by side, one row per fact
    .facts {
        display: none;
        margin: 0;

        @include when-entry-sidebar-fits {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            align-items: baseline;
            gap: var(--s-2) var(--s0);
        }

        > div {
            display: contents;
        }

        dt {
            margin: 0;
        }

        dd {
            margin: 0;
            color: var(--high-contrast-color);
            font-size: var(--text-sm);
            line-height: var(--leading-compact);
        }
    }

    // Only the ToC’s floating button and drawer render until the sidebar fits
    .entry-sidebar {
        display: contents;

        @include when-entry-sidebar-fits {
            display: flex;
            flex-direction: column;
            gap: var(--s2);
            position: sticky;
            top: var(--s0);
            max-height: calc(100vh - var(--s0));
            overflow: auto;
        }
    }

    .sidebar-related {
        display: none;

        @include when-entry-sidebar-fits {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: var(--s0);
        }

        // Ruled off from the ToC when there is one above it
        &:not(:first-child) {
            padding-top: var(--s1);
            border-top: 1px solid var(--light-grey);
        }

        // The list spans the sidebar; the button keeps its own width
        > :global(div) {
            align-self: stretch;
        }
    }

    .related {
        max-width: var(--measure);

        @include when-entry-sidebar-fits {
            display: none;
        }
    }
    .related h2 {
        margin: 0;
    }
</style>
