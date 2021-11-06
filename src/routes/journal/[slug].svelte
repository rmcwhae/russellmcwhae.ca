<script context="module">
    import { posts } from '$lib/services/posts'

    export async function load({ page }) {
        const { slug } = page.params
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
        const next = posts[index - 1]
        const previous = posts[index + 1]

        return {
            props: {
                title,
                date,
                category,
                readingTime,
                next,
                description,
                previous,
                component,
            },
        }
    }
</script>

<script>
    import Date from '$lib/components/misc/Date.svelte'
    import LeftChevron from '$lib/components/icons/LeftChevron.svelte'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    export let title
    export let date
    export let category
    export let description
    export let readingTime
    export let component
    export let next
    export let previous
</script>

<SEO {title} />

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
        </div>
    </header>

    <div class="restricted-width flow">
        <svelte:component this={component} />
    </div>
    <nav class="flex justify-between">
        {#if previous}
            <div class="flex gap justify-between items-center left">
                <LeftChevron />
                <JournalEntry post={previous} />
            </div>
        {:else}
            <div />
        {/if}
        {#if next}
            <div class="flex gap justify-between items-center right">
                <JournalEntry post={next} />
                <RightChevron />
            </div>
        {/if}
    </nav>
</article>

<style>
    header {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        padding-bottom: var(--s0);
        margin-bottom: var(--s4);
        border-bottom: 1px solid var(--light-grey);
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
