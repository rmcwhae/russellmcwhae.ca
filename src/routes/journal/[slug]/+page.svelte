<script>
    import Date from '#lib/components/misc/Date.svelte'
    import NoWrapLastTwoWords from '#lib/components/misc/NoWrapLastTwoWords.svelte'
    import Button from '#lib/components/buttons/Button.svelte'
    import ButtonSet from '#lib/components/buttons/ButtonSet.svelte'
    import JournalEntrySet from '#lib/components/journal/EntrySet.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import ToC from '#lib/components/journal/ToC.svelte'
    import CategoryLink from '#lib/components/journal/CategoryLink.svelte'
    import { mountFootnotes } from '#lib/components/journal/mountFootnotes.js'

    let { data } = $props()

    let title = $derived(data.title)
    let date = $derived(data.date)
    let category = $derived(data.category)
    let description = $derived(data.description)
    let readingTime = $derived(data.readingTime)
    let component = $derived(data.component)
    let relatedPosts = $derived(data.relatedPosts)

    const SvelteComponent = $derived(component)

    /** @type {HTMLElement | undefined} */
    let article = $state()

    $effect(() => {
        if (!article || !component) return

        const footnotes = mountFootnotes(article)
        return () => footnotes.destroy()
    })
</script>

<SEO title={'Journal » ' + title} {description} />

<header class="page-header page-header-entry">
    <div class="sub">
        <Date {date} />
    </div>
    <h1><NoWrapLastTwoWords text={title} /></h1>
    {#if description}
        <p class="lede"><NoWrapLastTwoWords text={description} /></p>
    {/if}
    <div class="sub">
        {#if category}
            <CategoryLink {category} />
            &middot;
        {/if}
        <span class="nowrap">{readingTime.words} words</span>
        &middot;
        <span class="nowrap">{readingTime.text}</span>
    </div>
</header>

<div class="article-columns">
    <article class="char-limit flow" bind:this={article}>
        <SvelteComponent />
    </article>
    <ToC allowedHeadings={['h2', 'h3']} />
</div>

<section class="related section-break">
    <h2 class="eyebrow">Related entries</h2>
    <JournalEntrySet posts={relatedPosts} />

    <div class="mt-3">
        <ButtonSet>
            <Button href="/journal" text="All entries" right />
        </ButtonSet>
    </div>
</section>

<style>
    .page-header-entry {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        max-width: var(--measure);
        margin-bottom: var(--s2);
        padding-bottom: var(--s1);
        border-bottom: 1px solid var(--light-grey);
    }
    .page-header-entry .lede {
        margin: 0;
    }
    .page-header-entry .sub {
        color: var(--text-color);
    }

    .article-columns {
        display: grid;
        grid-template-columns: minmax(0, var(--measure)) minmax(0, 1fr);
        column-gap: var(--s3);
        align-items: start;
        container: article-columns / inline-size;
    }
    .article-columns > article {
        min-width: 0;
    }

    .related {
        max-width: var(--measure);
    }
    .related h2 {
        margin: 0;
    }
</style>
