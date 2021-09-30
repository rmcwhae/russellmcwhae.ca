<script context="module">
    export async function load({ page }) {
        const posts = Object.entries(
            import.meta.globEager('/content/journal/*.md')
        )
            .map(([, post]) => ({
                // frontmatter data
                ...post.metadata,
                // the processed Svelte component from the markdown file
                component: post.default,
            }))
            .filter((post) => !post.draft)
            .sort((a, b) => (a.date < b.date ? 1 : -1))

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
    import Date from '$lib/components/Date.svelte'
    import LeftChevron from '$lib/components/icons/LeftChevron.svelte'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Button from '$lib/components/Button.svelte'
    import JournalEntry from '$lib/components/JournalEntry.svelte'
    import SEO from '$lib/components/SEO.svelte'

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
    <!-- <Button left href="/journal" text="All entries" /> -->
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

    <div class="restricted-width">
        <svelte:component this={component} />
    </div>
    <nav>
        {#if previous}
            <div class="left">
                <div class="mb"><LeftChevron /></div>
                <JournalEntry post={previous} />
            </div>
        {:else}
            <div />
        {/if}
        {#if next}
            <div class="right">
                <div class="mb"><RightChevron /></div>
                <JournalEntry post={next} />
            </div>
        {/if}
    </nav>
</article>

<style>
    header {
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
        padding-bottom: var(--s0);
        margin-bottom: var(--s4);
        border-bottom: 1px solid var(--light-grey);
    }
    h1,
    p {
        margin: 0;
    }
    nav {
        display: flex;
        justify-content: space-between;
        margin-top: var(--s4);
        align-items: flex-end;
        flex-wrap: wrap;
        padding-top: var(--s0);
        gap: var(--s3);
    }
    /* nav > div {
        flex-grow: 1;
        flex-basis: 0;
    } */
    .left {
        margin-right: auto;
    }
    .right {
        text-align: right;
        margin-left: auto;
    }
    .mb {
        margin-bottom: var(--s-1);
    }
</style>
