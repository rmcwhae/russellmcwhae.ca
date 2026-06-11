<script>
    import { preventLastTwoWordWrap } from '$lib/utils/string'
    import Date from '$lib/components/misc/Date.svelte'
    import CategoryLink from './CategoryLink.svelte'

    /**
     * @typedef {Object} Props
     * @property {any} post
     * @property {boolean} [archive]
     * @property {boolean} [firstInYear]
     * @property {boolean} [featured]
     */

    /** @type {Props} */
    let { post, archive = false, firstInYear = false, featured = false } =
        $props()

    let { href, title, description, date, readingTime, category } =
        $derived(post)
</script>

<section
    class:archive
    class:first-in-year={firstInYear}
    class:featured
>
    {#if category || featured}
        <div class="entry-category">
            {#if category}
                <CategoryLink {category} />
            {/if}
            {#if featured}
                <span class="latest-label">Latest</span>
            {/if}
        </div>
    {/if}
    {#if featured}
        <h2>
            <a {href}>{title}</a>
        </h2>
    {:else}
        <h3>
            <a {href}>{@html preventLastTwoWordWrap(title)}</a>
        </h3>
    {/if}
    {#if description}
        <p class:big={featured}>{@html preventLastTwoWordWrap(description)}</p>
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
    @use '../../scss/breakpoints' as *;

    h2,
    h3 {
        margin: 0;
        line-height: 1.2;

        a {
            transition: none;

            &:hover {
                color: var(--link-color-hover);
            }

            &:focus-visible {
                outline: 2px solid var(--link-color);
                outline-offset: 2px;
            }
        }
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
    section.featured {
        gap: var(--s-1);
        padding: 0;
        border-bottom: none;

        .entry-category {
            align-items: center;
            gap: var(--s-2);
        }

        .latest-label {
            font-size: 0.85rem;
            font-weight: 600;
            line-height: 1.3;
            white-space: nowrap;
            color: var(--text-color);
        }

        h2 {
            font-size: max(3em, 1.953rem);
            line-height: 1.1;
            // white-space: nowrap;
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
