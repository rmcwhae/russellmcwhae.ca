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
    import SEO from '$lib/components/SEO.svelte'

    export let posts
</script>

<SEO title="Journal" />

<!-- <p>
    Writing is my way of making sense of things, both by exploring subjects from
    many different angles, and by discussing the ideas of others who have
    wrestled with similar questions. I hope you’ll join me for a glimpse into my
    head.
</p> -->
<div class="archive">
    {#each posts as { slug, title, description, date, readingTime, category }}
        <section>
            <div class="date sub">
                <Date {date} />
            </div>
            <div class="title">
                <h2>
                    <a sveltekit:prefetch href={'/journal/' + slug}>{title}</a>
                </h2>
                {#if description}
                    <p>{description}</p>
                {/if}
                <div class="sub">
                    <span>{category}</span>
                    &middot;
                    <span>{readingTime.text}</span>
                </div>
            </div>
        </section>
    {/each}
</div>

<style>
    h2 {
        font-size: 1.5rem;
        line-height: 1.2em;
        margin: 0;
    }
    h2 a {
        text-decoration: none;
    }
    .date {
        flex-basis: 12rem;
        min-width: 12rem;
    }
    .title {
    }
    h2 a:hover {
        /* color: var(--blue); */
    }
    section:not(:first-of-type) {
        padding-top: var(--s1);
        border-top: 1px solid var(--light-grey);
    }
    section {
        margin-bottom: var(--s1);
        display: flex;
        align-items: baseline;
        /* padding-top: var(--s1); */
        /* border-top: 1px solid var(--light-grey); */
    }
    p {
        /* font-size: 1.2rem; */
        margin: 0;
    }
    .archive {
        /* max-width: 1200px; */
        margin: var(--s1) auto 0;
        /* Define the element as a grid container */
        /* display: grid; */
        /* Auto-fit as many items on a row as possible without going under the min */
        /* grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); */
        /* A little spacing between articles */
        /* grid-gap: var(--s2); */
    }
    @media (max-width: 1023px) {
        .archive {
            margin-top: var(--s2);
        }
    }
    @media (max-width: 767px) {
        section {
            display: inherit;
        }
        h2 {
            font-size: 1.25em;
        }
        /* section:first-of-type {
            padding-bottom: var(--s0);
        }
        section:not(:first-of-type) {
            padding: var(--s0) 0;
        } */
    }
</style>
