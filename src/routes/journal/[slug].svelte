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
            console.log('returning 404')
            return {
                status: 404,
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
        // next/previous posts
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

    export let title
    export let date
    export let category
    export let description
    export let readingTime
    export let component
    export let next
    export let previous
</script>

<article>
    <header>
        <h1>{title}</h1>
        <div class="uppercase grey sub">
            <Date {date} />
            &middot;
            <span>{category}</span>
            &middot;
            <span>{readingTime.words} words</span>
            &middot;
            <span>{readingTime.text}</span>
        </div>
        {#if description}
            <p>{description}</p>
        {/if}
    </header>
    <svelte:component this={component} />
</article>
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

<style>
    .sub {
        font-size: 0.8em;
        margin-top: var(--s-2);
        margin-bottom: var(--s-2);
    }
    header {
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
    }
    h1 {
        font-size: 3em;
        line-height: 1.2em;
    }
    article {
        max-width: 700px;
        margin: 0 auto;
    }
    nav {
        display: flex;
        justify-content: space-between;
        margin-top: var(--s3);
        margin-bottom: var(--s3);
        flex-wrap: wrap;
    }
    a {
        text-decoration: none;
        vertical-align: middle;
    }
    a:first-child {
        margin-right: var(--s0);
    }
    p {
        font-size: 1.1em;
    }
    .right {
        text-align: right;
        margin-left: auto;
    }
</style>
