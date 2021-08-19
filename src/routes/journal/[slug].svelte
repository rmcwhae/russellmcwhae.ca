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

    export let title
    export let date
    export let category
    export let description
    export let readingTime
    export let component
    export let next
    export let previous
</script>

<article class="restricted-width">
    <header>
        <h1>{@html preventLastTwoWordWrap(title)}</h1>
        {#if description}
            <p>{@html preventLastTwoWordWrap(description)}</p>
        {/if}
        <div class="sub">
            <Date {date} />
            &middot;
            <span>{category}</span>
            &middot;
            <span class="nowrap">{readingTime.words} words</span>
            &middot;
            <span class="nowrap">{readingTime.text}</span>
        </div>
    </header>
    <svelte:component this={component} />
    <nav>
        {#if previous}
            <a href={'/journal/' + previous.slug}>
                <LeftChevron />
                {previous.title}</a
            >
        {:else}
            <div />
        {/if}
        {#if next}
            <a href={'/journal/' + next.slug} class="right"
                >{next.title}
                <RightChevron />
            </a>
        {/if}
    </nav>
</article>

<style>
    h1 {
        margin-top: var(--s0);
        /* margin-bottom: var(--s-3); */
    }
    nav {
        /* font-weight: 600; */
        display: flex;
        justify-content: space-between;
        margin-top: var(--s3);
        /* margin-bottom: var(--s3); */
        flex-wrap: wrap;
        padding-top: var(--s0);
        border-top: 1px solid var(--text-color);
    }
    nav a {
        color: var(--high-contrast-color);
    }
    a {
        text-decoration: none;
        vertical-align: middle;
    }
    .sub {
        border-top: 1px solid var(--text-color);
        padding-top: var(--s-4);
    }
    a:first-child {
        margin-right: var(--s0);
    }
    p {
        margin: 0;
        line-height: 1.2em;
        padding: var(--s-2) 0;
        color: var(--high-contrast-color);
    }
    @media screen and (min-width: 1023px) {
        p {
            font-size: 1.2em;
        }
    }
    .right {
        text-align: right;
        margin-left: auto;
    }
</style>
