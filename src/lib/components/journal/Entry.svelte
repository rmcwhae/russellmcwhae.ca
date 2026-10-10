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
     */

    /** @type {Props} */
    let { post, featured = false, showCategory = true } = $props()

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
                <Date {date} />
            </div>
        {/if}
        <h1>
            <a {href}>{@html preventLastTwoWordWrap(title)}</a>
        </h1>
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
            <h3>
                <a {href}>{@html preventLastTwoWordWrap(title)}</a>
            </h3>
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

    h1,
    h3 {
        margin: 0;
        line-height: 1.15;
    }

    h3 {
        font-size: 1.2rem;
        line-height: 1.25;
    }

    h1 a,
    h3 a {
        font-weight: 500;
        text-decoration: none;
    }

    h1 a:hover,
    h3 a:hover {
        color: var(--alpine);
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.18em;
    }

    p {
        margin: 0.35rem 0 0;
        color: var(--text-color);
        font-size: 0.95rem;
        line-height: 1.45;
    }

    .when {
        grid-column: 1 / -1;
    }

    .time {
        color: var(--medium-grey);
        font-size: 0.8rem;
        white-space: nowrap;
    }

    .meta {
        margin-top: 0.35rem;
        font-size: 0.8rem;
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

    section.featured h1 {
        width: 100%;
        max-width: none;
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
