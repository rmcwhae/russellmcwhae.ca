<script>
    import { preventLastTwoWordWrap } from '#lib/utils/string/index.js'
    import Date from '#lib/components/misc/Date.svelte'
    import Button from '#lib/components/buttons/Button.svelte'
    import CategoryLink from './CategoryLink.svelte'

    /**
     * @typedef {Object} Props
     * @property {any} post
     * @property {boolean} [featured]
     * @property {boolean} [showCategory]
     * @property {number} [level] Heading level for the title
     */

    /** @type {Props} */
    let {
        post,
        featured = false,
        showCategory = true,
        level = featured ? 2 : 3,
    } = $props()

    let { href, title, description, preview, date, readingTime, category } =
        $derived(post)

    let featuredPreview = $derived(
        featured ? preview || description : description
    )
</script>

<section class:featured>
    {#if featured}
        {#if date}
            <div class="sub">
                Latest &middot;
                <Date {date} />
            </div>
        {/if}
        <svelte:element this={`h${level}`} class="entry-title">
            <a {href}>{@html preventLastTwoWordWrap(title)}</a>
        </svelte:element>
        {#if featuredPreview}
            <p>{@html preventLastTwoWordWrap(featuredPreview)}</p>
        {/if}
        {#if (category && showCategory) || readingTime}
            <div class="sub">
                {#if category && showCategory}
                    <CategoryLink {category} />
                    {#if readingTime}&middot;{/if}
                {/if}
                {#if readingTime}
                    <span class="nowrap">{readingTime.words} words</span>
                    &middot;
                    <span class="nowrap">{readingTime.text}</span>
                {/if}
            </div>
        {/if}
        <Button {href} text="Continue reading" right />
    {:else}
        {#if date}
            <div class="when">
                <Date {date} compact />
            </div>
        {/if}
        <div class="body">
            <svelte:element this={`h${level}`} class="entry-title title-sm">
                <a {href}>{@html preventLastTwoWordWrap(title)}</a>
            </svelte:element>
            {#if featuredPreview}
                <p>{@html preventLastTwoWordWrap(featuredPreview)}</p>
            {/if}
            {#if category}
                <div class="meta">
                    <CategoryLink {category} />
                </div>
            {/if}
        </div>
        {#if readingTime}
            <div class="time">{readingTime.text}</div>
        {/if}
    {/if}
</section>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    section:not(.featured) {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.35rem 1rem;
        padding: var(--s0) 0;
        border-bottom: 1px solid var(--light-grey);
    }

    .entry-title {
        margin: 0;
    }

    .entry-title a {
        font-weight: 500;
        text-decoration: none;
    }

    .entry-title a:hover {
        color: var(--alpine);
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.18em;
    }

    p {
        margin: 0.35rem 0 0;
        color: var(--text-color);
        font-size: var(--text-sm);
        line-height: var(--leading-compact);
    }

    .when {
        grid-column: 1 / -1;
    }

    .time {
        color: var(--medium-grey);
        font-size: var(--text-xs);
        white-space: nowrap;
    }

    .meta {
        margin-top: 0.35rem;
        font-size: var(--text-xs);
    }

    section.featured {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--s-1);
        width: 100%;
        padding: 0;
        border: none;
    }

    section.featured .entry-title {
        width: 100%;
        max-width: none;
        font-size: var(--text-xl);
        line-height: var(--leading-tight);
    }

    section.featured p {
        width: 100%;
        max-width: none;
        margin: 0;
        font-size: inherit;
        line-height: inherit;
    }

    section.featured .sub {
        color: var(--text-color);
    }

    @include for-tablet-portrait-up {
        section:not(.featured) {
            grid-template-columns: 8.5rem 1fr auto;
            align-items: baseline;
            gap: 0.25rem 1.5rem;
        }

        section:not(.featured) .when {
            grid-column: auto;
        }
    }
</style>
