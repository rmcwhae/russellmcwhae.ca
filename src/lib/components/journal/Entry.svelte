<script>
    import { resolve } from '$app/paths'
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Date from '$lib/components/misc/Date.svelte'
    import CategoryLink from './CategoryLink.svelte'
    import StatusPill from './StatusPill.svelte'
    import { isLongRead } from '$lib/constants/journal'

    /**
     * @typedef {Object} Props
     * @property {any} post
     * @property {boolean} [archive]
     * @property {boolean} [firstInYear]
     * @property {boolean} [featured]
     */

    /** @type {Props} */
    let {
        post,
        archive = false,
        firstInYear = false,
        featured = false,
    } = $props()

    let { slug, title, description, preview, date, readingTime, category } =
        $derived(post)

    let featuredPreview = $derived(
        featured ? preview || description : description
    )
    let longRead = $derived(isLongRead(readingTime))
</script>

<section class:archive class:first-in-year={firstInYear} class:featured>
    {#if category || date || readingTime || featured || longRead}
        <div class="entry-category">
            <div class="entry-category-leading">
                {#if category}
                    <CategoryLink {category} />
                {/if}
                {#if featured}
                    <StatusPill variant="latest" />
                {/if}
                {#if longRead}
                    <StatusPill variant="long-read" />
                {/if}
            </div>
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
        </div>
    {/if}
    {#if featured}
        <h2>
            <a
                class="entry-title-link"
                href={resolve('/journal/[slug]', { slug })}
                >{@html preventLastTwoWordWrap(title)}</a
            >
        </h2>
    {:else}
        <h3>
            <a
                class="entry-title-link"
                href={resolve('/journal/[slug]', { slug })}
                >{@html preventLastTwoWordWrap(title)}</a
            >
        </h3>
    {/if}
    {#if featuredPreview}
        <p class:big={featured}>
            {@html preventLastTwoWordWrap(featuredPreview)}
        </p>
    {/if}
    {#if featured}
        <a class="continue-reading" href={resolve('/journal/[slug]', { slug })}>
            <span>Continue Reading</span> →
        </a>
    {/if}
</section>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    h2,
    h3 {
        margin: 0;
        line-height: 1.2;
        font-variant-numeric: lining-nums;
        font-feature-settings: 'lnum' 1;
    }

    :is(h2, h3) :global(a.entry-title-link) {
        color: var(--high-contrast-color);
        text-decoration: none;
        transition: none;

        &:hover {
            color: var(--link-color);
        }

        &:focus-visible {
            outline: 2px solid var(--link-color);
            outline-offset: 2px;
        }
    }
    p {
        margin: 0;
        font-size: 0.9rem;
    }
    .continue-reading {
        font-family: var(--font-sans);
        font-size: 12px;
        letter-spacing: 0.1em;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--high-contrast-color);

        span {
            text-decoration: underline;
            text-decoration-color: var(--accent);
            text-decoration-thickness: 3px;
            text-underline-offset: 5px;
        }
    }
    .entry-category {
        align-items: center;
        gap: var(--s-2);
        flex-wrap: wrap;
    }
    .entry-category-leading {
        display: flex;
        align-items: center;
        gap: var(--s-2);
        min-width: 0;
    }
    .entry-category-leading :global(.category-pill + .status-pill)::before {
        content: '·';
        margin-right: var(--s-2);
        color: var(--medium-grey);
    }
    .entry-meta {
        white-space: nowrap;
        font-family: var(--font-sans);
        font-size: 0.7rem;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-variant-numeric: lining-nums;
        font-feature-settings: 'lnum' 1;
    }
    section {
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
    }
    section.featured {
        gap: var(--s-1);
        padding: 0;
        border-bottom: none;

        h2 {
            font-size: max(3em, 1.953rem);
            line-height: 1.1;

            @include for-laptop-only {
                font-size: max(2.5em, 1.802rem);
            }
        }

        @include for-tablet-landscape-up {
            gap: var(--s0);
        }

        @include for-laptop-only {
            gap: var(--s-1);
        }

        @include for-desktop-up {
            gap: var(--s1);
        }

        p {
            max-width: 70ch;
        }

        p:global(.big) {
            @include for-laptop-only {
                font-size: 1.2rem;
            }
        }
    }
    section.archive {
        padding-top: var(--s0);
    }

    @media (max-width: 640px) {
        section:not(.featured) {
            padding-bottom: var(--s0);
        }
    }
</style>
