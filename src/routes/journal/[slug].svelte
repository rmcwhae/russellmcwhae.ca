<script context="module">
    import { posts } from '$lib/services/posts'

    export const prerender = false // Necessary for the hit counter

    export async function load({ params, fetch }) {
        const { slug } = params
        const index = posts.findIndex((post) => slug === post.slug)

        if (index === -1) {
            return {
                status: 404,
                error: new Error('Page not found'),
            }
        }

        const {
            title,
            date,
            readingTime,
            component,
            description,
            category,
        } = posts[index]
        const relatedPosts = posts
            .filter((post) => post.title !== title)
            .filter((post) => post.category === category)
            .slice(0, 4)

        let views = null

        try {
            const json = await fetch(`/journal/${slug}.json`).then((response) =>
                response.json()
            )
            const { hits } = json
            views = hits
        } catch (error) {
            console.log('error')
        }

        return {
            props: {
                title,
                date,
                category,
                views,
                readingTime,
                description,
                relatedPosts,
                component,
            },
        }
    }
</script>

<script>
    import Date from '$lib/components/misc/Date.svelte'
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Button from '$lib/components/buttons/Button.svelte'
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import ToC from '$lib/components/Journal/ToC.svelte'

    export let title
    export let date
    export let views
    export let category
    export let description
    export let readingTime
    export let component
    export let relatedPosts

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
        <span>{category}</span>
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
    }
    h1,
    p {
        margin: 0;
    }
    article {
        margin: 0 auto;
    }
</style>
