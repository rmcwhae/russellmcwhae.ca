<script>
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

    let { href, title, description, preview, date, readingTime, category } =
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
            <a class="entry-title-link" {href}
                >{@html preventLastTwoWordWrap(title)}</a
            >
        </h2>
    {:else}
        <h3>
            <a class="entry-title-link" {href}
                >{@html preventLastTwoWordWrap(title)}</a
            >
        </h3>
    {/if}
    {#if featuredPreview}
        <p class:big={featured}>
            {@html preventLastTwoWordWrap(featuredPreview)}{#if featured}{' '}
                <a {href}>Continue Reading →</a>{/if}
        </p>
    {/if}
</section>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    h2,
    h3 {
        margin: 0;
        line-height: 1.2;
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
    .entry-meta {
        white-space: nowrap;
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
        }

        @include for-tablet-landscape-up {
            gap: var(--s0);
        }

        @include for-desktop-up {
            gap: var(--s1);
        }

        p {
            max-width: 70ch;
        }
    }
    section.archive {
        padding-top: var(--s0);
        border-bottom: none;
    }
    section.archive.first-in-year {
        padding-top: 0;
    }

    @media (max-width: 640px) {
        section:not(.featured) {
            padding-bottom: var(--s0);
        }
    }
</style>
