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
            <h2>
                <a sveltekit:prefetch href={'/journal/' + slug}>{title}</a>
            </h2>
            <div class="ml">
                <div class="uppercase grey sub">
                    <Date {date} />
                    &middot;
                    <span>{category}</span>
                    &middot;
                    <span>{readingTime.text}</span>
                </div>
                {#if description}
                    <p>{description}</p>
                {/if}
            </div>
        </section>
    {/each}
</div>

<style>
    h2 {
        font-size: 1.6em;
        line-height: 1.2em;
        margin-bottom: 0;
    }
    h2 a {
        text-decoration: none;
    }
    .sub {
        margin-top: var(--s-1);
        margin-bottom: var(--s-1);
    }
    section {
        border-top: 1px solid var(--light-grey);
        /* margin: var(--s2) 0; */
    }
    .archive {
        padding-bottom: var(--s1);
        border-bottom: 1px solid var(--light-grey);
    }
    .sub {
        font-size: 0.8em;
    }
    p {
        font-size: 1.1em;
        margin: 0;
    }
    .archive {
        /* Define the element as a grid container */
        display: grid;
        /* Auto-fit as many items on a row as possible without going under 180px */
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        /* A little spacing between articles */
        grid-gap: var(--s1);
    }
</style>
