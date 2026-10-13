<script>
    import Date from '#lib/components/misc/Date.svelte'
    import NoWrapLastTwoWords from '#lib/components/misc/NoWrapLastTwoWords.svelte'
    import Button from '#lib/components/buttons/Button.svelte'
    import CategoryLink from './CategoryLink.svelte'

    /**
     * @typedef {Object} Props
     * @property {any} post
     * @property {boolean} [featured]
     * @property {boolean} [showCategory]
     * @property {boolean} [showDescription]
     * @property {boolean} [showPreview]
     * @property {number} [level] Heading level for the title
     */

    /** @type {Props} */
    let {
        post,
        featured = false,
        showCategory = true,
        showDescription = true,
        showPreview = true,
        level = featured ? 2 : 3,
    } = $props()

    let { href, title, description, preview, date, readingTime, category } =
        $derived(post)

    let featuredPreview = $derived(
        featured
            ? showPreview
                ? preview || description
                : description
            : showDescription
              ? description
              : ''
    )
</script>

<section class:featured>
    {#if featured}
        {#if date}
            <div class="sub">
                <span class="eyebrow">Latest</span>
                &middot;
                <Date {date} />
                {#if readingTime}
                    &middot;
                    <span class="nowrap">{readingTime.text}</span>
                {/if}
            </div>
        {/if}
        <svelte:element this={`h${level}`} class="entry-title">
            <a {href}><NoWrapLastTwoWords text={title} /></a>
        </svelte:element>
        {#if featuredPreview}
            <p><NoWrapLastTwoWords text={featuredPreview} /></p>
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
                <a {href}><NoWrapLastTwoWords text={title} /></a>
            </svelte:element>
            {#if featuredPreview}
                <p><NoWrapLastTwoWords text={featuredPreview} /></p>
            {/if}
        </div>
        {#if readingTime || (category && showCategory)}
            <div class="meta">
                {#if readingTime}
                    <div class="time">{readingTime.text}</div>
                {/if}
                {#if category && showCategory}
                    <CategoryLink {category} />
                {/if}
            </div>
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
        font-family: var(--font-serif);
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
        color: var(--medium-grey);
        font-size: var(--text-xs);
    }

    .meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.15rem;
        color: var(--medium-grey);
        font-size: var(--text-xs);
        text-align: right;
    }

    .time {
        white-space: nowrap;
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

    @include for-phone-only {
        section.featured .entry-title {
            font-size: var(--text-md);
        }

        section.featured p {
            font-size: var(--text-sm);
        }

        section:not(.featured) {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            column-gap: 0.5rem;
        }

        section:not(.featured) .body {
            flex: 1 0 100%;
            order: 1;
        }

        section:not(.featured) .when {
            order: 2;
        }

        section:not(.featured) .meta {
            order: 3;
            flex-direction: row;
            align-items: baseline;
            text-align: left;
        }
    }

    @include for-tablet-portrait-up {
        section:not(.featured) {
            grid-template-columns: max-content 1fr auto;
            align-items: baseline;
            gap: 0.25rem 1.5rem;
        }

        section:not(.featured) .when {
            grid-column: auto;
        }

        :global(.entries) > section:not(.featured) {
            grid-column: 1 / -1;
            grid-template-columns: subgrid;
        }
    }
</style>
