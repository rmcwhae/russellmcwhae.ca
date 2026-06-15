<script>
    import Date from '$lib/components/misc/Date.svelte'
    import NoWrapLastTwoWords from '$lib/components/misc/NoWrapLastTwoWords.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import ToC from '$lib/components/journal/ToC.svelte'
    import CategoryLink from '$lib/components/journal/CategoryLink.svelte'
    import StatusPill from '$lib/components/journal/StatusPill.svelte'
    import { isLongRead } from '$lib/constants/journal'

    let { data } = $props()

    let title = $derived(data.title)
    let date = $derived(data.date)
    let category = $derived(data.category)
    let description = $derived(data.description)
    let readingTime = $derived(data.readingTime)
    let component = $derived(data.component)
    let relatedPosts = $derived(data.relatedPosts)

    const SvelteComponent = $derived(component)
    let longRead = $derived(isLongRead(readingTime))
</script>

<SEO title={'Journal » ' + title} {description} />

<section class="article-header border-bottom-thick full-bleed">
    <div class="restricted-width">
        <header>
            <div class="entry-category">
                <div class="entry-category-leading">
                    {#if category}
                        <CategoryLink {category} />
                    {/if}
                    {#if longRead}
                        <StatusPill variant="long-read" />
                    {/if}
                </div>
                <div class="sub entry-meta">
                    <Date {date} />
                    &middot;
                    <span class="nowrap">{readingTime.words} words</span>
                    &middot;
                    <span class="nowrap">{readingTime.text}</span>
                </div>
            </div>
            <h1><NoWrapLastTwoWords text={title} /></h1>
            {#if description}
                <p class="big"><NoWrapLastTwoWords text={description} /></p>
            {/if}
        </header>
    </div>
</section>

<div class="article-body">
    <ToC allowedHeadings={['h2', 'h3']} />
    <article class="article-main char-limit flow">
        <SvelteComponent />
    </article>
</div>

<div class="restricted-width">
    <h2 class="mt-5 mb-3">Related Entries</h2>
    <JournalEntrySet posts={relatedPosts} />

    <div class="mt-3">
        <ButtonSet>
            <Button href="/journal" text="All entries" right />
        </ButtonSet>
    </div>
</div>

<style lang="scss">
    @use '../../../lib/scss/breakpoints' as *;

    .article-header {
        margin-bottom: var(--s1);
        padding-bottom: var(--s0);
    }
    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--s-1);
        text-align: center;
    }
    h1,
    p {
        margin: 0;
    }
    h1 {
        font-weight: normal;
    }
    header .entry-category {
        align-items: center;
        gap: var(--s-2);
        flex-wrap: wrap;
    }
    header .entry-category-leading {
        display: flex;
        align-items: center;
        gap: var(--s-2);
        flex-wrap: wrap;
    }
    header .entry-meta {
        white-space: nowrap;
        font-family: var(--font-sans);
        font-size: 0.7rem;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }
    .article-body {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--s1);
    }
    .article-main {
        margin: 0 auto;
        min-width: 0;
        width: 100%;
    }

    @include for-tablet-landscape-up {
        .article-header {
            margin-bottom: var(--s3);
            padding: var(--s3) 0 var(--s4);
        }
        header {
            align-items: flex-start;
            gap: var(--s-1);
            text-align: left;
        }
        header .entry-category {
            justify-content: flex-start;
        }
        h1 {
            font-size: max(3em, 1.953rem);
            line-height: 1.1;
        }
        header p {
            max-width: 70ch;
        }
    }

    @include for-laptop-only {
        .article-header {
            margin-bottom: var(--s2);
            padding: var(--s2) 0 var(--s3);
        }
        h1 {
            font-size: max(2.5em, 1.802rem);
        }
        header p:global(.big) {
            font-size: 1.2rem;
        }
    }

    @include for-desktop-up {
        header {
            gap: var(--s1);
        }
        .article-main {
            margin: 0 auto;
        }
    }
</style>
