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
        const { title, date, readingTime, component } = posts[index]
        // next/previous posts
        const next = posts[index - 1]
        const previous = posts[index + 1]
        return {
            props: {
                title,
                date,
                readingTime,
                next,
                previous,
                component,
            },
        }
    }
</script>

<script>
    import Date from '$lib/components/Date.svelte'
    export let title
    export let date
    export let readingTime
    export let component
    export let next
    export let previous
</script>

<article>
    <header>
        <div class="uppercase">
            <Date {date} />
        </div>
        <h1>{title}</h1>
        <div class="grey">
            <span>{readingTime.words} words</span>
            &middot;
            <span>{readingTime.text}</span>
        </div>
    </header>
    <svelte:component this={component} />
</article>
<div>
    {#if previous}
        <a href={`/journal/${previous.slug}`}>{previous.title}</a>
    {:else}
        <div />
    {/if}
    {#if next}
        <a href={`/journal/${next.slug}`}>{next.title}</a>
    {/if}
</div>

<style>
    h1 {
        font-size: 3em;
        line-height: 1.2em;
    }
    article {
        max-width: 700px;
        margin: 0 auto;
    }
</style>
