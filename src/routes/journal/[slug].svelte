<script context="module">
    import { mode } from '$app/env'
    import { posts } from '$lib/services/posts'

    export async function load({ url, params, fetch }) {
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

        const json = await fetch(`/journal/${slug}.json?mode=${mode}`)

        const { hits } = await json.json()

        return {
            props: {
                title,
                date,
                category,
                views: hits,
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

    export let title
    export let date
    export let views
    export let category
    export let description
    export let readingTime
    export let component
    export let relatedPosts
</script>

<SEO title={'Journal » ' + title} {description} />

<article>
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
            &middot;
            <span class="nowrap">{views} views</span>
        </div>
    </header>

    <main class="char-limit flow margin-0-auto">
        <svelte:component this={component} />
    </main>
</article>

<h2 class="mt-5 mb-3">Related Entries</h2>
<JournalEntrySet posts={relatedPosts} />

<div class="mt-3">
    <ButtonSet>
        <Button href="/journal" text="All entries" right />
    </ButtonSet>
</div>

<style>
    header {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        padding-bottom: var(--s0);
        margin-bottom: var(--s2);
        /* border-bottom: 1px solid var(--light-grey); */
    }
    h1,
    p {
        margin: 0;
    }
    nav {
        margin-top: var(--s4);
        flex-wrap: wrap;
        gap: var(--s4);
    }
    .left {
        margin-right: auto;
    }
    .right {
        text-align: right;
        margin-left: auto;
    }
    .gap {
        gap: var(--s0);
    }
</style>
