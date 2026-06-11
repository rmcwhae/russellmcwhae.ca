<script>
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Date from '$lib/components/misc/Date.svelte'
    import CategoryLink from './CategoryLink.svelte'

    /**
     * @typedef {Object} Props
     * @property {any} post
     * @property {boolean} [archive]
     * @property {boolean} [firstInYear]
     */

    /** @type {Props} */
    let { post, archive = false, firstInYear = false } = $props()

    let { href, title, description, date, readingTime, category } =
        $derived(post)
</script>

<section class:archive class:first-in-year={firstInYear}>
    {#if category}
        <div class="entry-category">
            <CategoryLink {category} />
        </div>
    {/if}
    <h3>
        <a {href}>{@html preventLastTwoWordWrap(title)}</a>
    </h3>
    {#if description}
        <p>{@html preventLastTwoWordWrap(description)}</p>
    {/if}
    {#if date || readingTime}
        <div class="sub entry-meta">
            {#if date}
                <Date {date} />
            {/if}
            {#if date && readingTime}
                &middot;
            {/if}
            {#if readingTime}
                <span>{readingTime.text}</span>
            {/if}
        </div>
    {/if}
</section>

<style lang="scss">
    h3 {
        margin: 0;
        line-height: 1.2;
    }
    p {
        margin: 0;
    }
    section {
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
    }
    section.archive {
        padding-top: var(--s0);
    }
    section.archive.first-in-year {
        padding-top: 0;
    }

    @media (max-width: 640px) {
        section {
            padding-bottom: var(--s0);
        }
    }
</style>
