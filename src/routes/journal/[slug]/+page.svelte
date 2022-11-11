<script>
    import Date from '$lib/components/misc/Date.svelte'
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Button from '$lib/components/buttons/Button.svelte'
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import ToC from '$lib/components/journal/ToC.svelte'
    import CategoryLink from '$lib/components/journal/CategoryLink.svelte'

    export let data

    $: title = data.title
    $: date = data.date
    $: views = data.views
    $: category = data.category
    $: description = data.description
    $: readingTime = data.readingTime
    $: component = data.component
    $: relatedPosts = data.relatedPosts

    const viewText = views === 1 ? 'view' : 'views'
</script>

<SEO title={'Journal » ' + title} {description} />

<header>
    <div class="sub">
        <Date {date} />
    </div>
    <h1>{@html preventLastTwoWordWrap(title)}</h1>
    {#if description}
        <p>{@html preventLastTwoWordWrap(description)}</p>
    {/if}
    <div class="sub">
        <CategoryLink {category} />
        &middot;
        <span class="nowrap">{readingTime.words} words</span>
        &middot;
        <span class="nowrap">{readingTime.text}</span>
        {#if views}
            &middot;
            <span class="nowrap" data-test="article-views"
                >{views} {viewText}</span
            >
        {/if}
    </div>
</header>

<div class="wrapper">
    <ToC allowedHeadings={['h2', 'h3']} />
    <article class="char-limit flow">
        <svelte:component this={component} />
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

<style>
    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--s-1);
        margin-bottom: var(--s2);
        text-align: center;
    }
    h1,
    p {
        margin: 0;
    }
    article {
        margin: 0 auto;
    }
</style>
