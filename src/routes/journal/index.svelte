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

<div class="flex">
    <div>
        {#each posts as { slug, title, description, date, readingTime, category }}
            <section>
                <div class="uppercase">
                    <Date {date} />
                    &middot;
                    <span class="grey">{category}</span>
                    &middot;
                    <span class="grey">{readingTime.text}</span>
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
    <p>
        Welcome to my online journal. This is a collection of infrequently
        published, generally long-winded thoughts on topics that are important
        to me. In publishing on such a seldom basis, my aim is to prevent
        information overload and instead provide concise,
        polished-until-they-shine works that remain relevant beyond staying at
        the top of a news feed for a few days. Writing is my way of making sense
        of things, both by exploring subjects from many different angles, and by
        discussing the ideas of others who have wrestled with similar questions.
        I hope you’ll join me for a glimpse into my head.
    </p>
</div>

<style>
    .secondary {
        margin-left: var(--s-3);
    }
    h2 {
        font-size: 2em;
        line-height: 1.2em;
    }
    h2 a {
        text-decoration: none;
    }
    section {
        margin: var(--s2) 0;
    }
    .flex {
        display: flex;
    }
    .flex > * {
        flex-grow: 1;
        max-width: 50%;
    }
</style>
