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

<header class="restricted-width">
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

<div class="restricted-width">
    <h2 class="related-heading">Related Entries</h2>
    <JournalEntrySet posts={relatedPosts} />

    <div class="mt-3">
        <ButtonSet>
            <Button href="/journal" text="All entries" right />
        </ButtonSet>
    </div>
</div>

<style lang="scss">
    @use '../../../lib/scss/breakpoints' as *;

    header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--s-1);
        width: 100%;
        max-width: $restricted-width;
        margin: 0 auto var(--s2);
        text-align: left;
        padding-bottom: var(--s1);
        background-image: linear-gradient(var(--light-grey), var(--light-grey));
        background-repeat: no-repeat;
        background-position: center bottom;
        background-size: min(62ch, 100%) 1px;
    }
    header h1 {
        width: 100%;
        max-width: none;
        margin: 0;
    }
    header p {
        margin: 0;
    }
    header .sub {
        color: var(--text-color);
    }

    @include for-tablet-portrait-up {
        header {
            align-items: center;
            text-align: center;
        }
    }
    .article-columns {
        display: grid;
        grid-template-columns: minmax(0, 1fr) min(62ch, 100%) minmax(0, 1fr);
        align-items: start;
        container: article-columns / inline-size;
    }
    .article-columns > article {
        grid-column: 2;
        min-width: 0;
    }
    .restricted-width {
        width: 100%;
    }
    article {
        margin: 0 auto;
    }

    .related-heading {
        margin-top: var(--s5);
        margin-bottom: var(--s3);
    }

    @include for-phone-only {
        .related-heading {
            margin-top: var(--s2);
            margin-bottom: var(--s1);
        }
    }
</style>
