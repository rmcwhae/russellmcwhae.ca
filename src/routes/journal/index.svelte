<script context="module">
    export async function load() {
        const posts = Object.entries(
            import.meta.globEager('/content/journal/*.md')
        )
            .map(([, post]) => ({
                // frontmatter data
                ...post.metadata,
            }))
            .filter((post) => !post.draft)
            .sort((a, b) => (a.date < b.date ? 1 : -1))

        return {
            props: {
                posts,
            },
        }
    }
</script>

<script>
    import Date from '$lib/components/Date.svelte'

    export let posts
</script>

<!-- <p>
    Writing is my way of making sense of things, both by exploring subjects from
    many different angles, and by discussing the ideas of others who have
    wrestled with similar questions. I hope you’ll join me for a glimpse into my
    head.
</p> -->
<div class="archive">
    {#each posts as { slug, title, description, date, readingTime, category }}
        <section>
            <div class="sub">
                <Date {date} />
                &middot;
                <span>{category}</span>
                &middot;
                <span>{readingTime.text}</span>
            </div>
            <h2>
                <a sveltekit:prefetch href={'/journal/' + slug}>{title}</a>
            </h2>
            {#if description}
                <p>{description}</p>
            {/if}
        </section>
    {/each}
</div>

<style>
    h2 {
        font-size: 1.5em;
        line-height: 1.2em;
        margin: 0;
    }
    h2 a {
        text-decoration: none;
    }
    h2 a:hover {
        /* color: var(--blue); */
    }
    /* section:first-of-type {
        padding-bottom: var(--s1);
    }
    section:not(:first-of-type) {
        padding: var(--s1) 0;
        border-top: 1px solid var(--light-grey);
    } */
    section {
        padding-bottom: var(--s2);
        border-bottom: 1px solid var(--light-grey);
    }
    p {
        /* font-size: 1.2rem; */
        margin: 0;
    }
    .archive {
        /* max-width: 1200px; */
        margin: 0 auto;
        /* Define the element as a grid container */
        display: grid;
        /* Auto-fit as many items on a row as possible without going under the min */
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        /* A little spacing between articles */
        grid-gap: var(--s2);
    }
    @media (max-width: 1023px) {
        .archive {
            grid-template-columns: 1fr;
            grid-gap: var(--s0);
            max-width: 560px;
        }
        h2 {
            font-size: 1.25em;
        }
        section:first-of-type {
            padding-bottom: var(--s0);
        }
        section:not(:first-of-type) {
            padding: var(--s0) 0;
        }
    }
</style>
