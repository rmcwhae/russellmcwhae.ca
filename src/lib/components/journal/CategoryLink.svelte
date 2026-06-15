<script>
    import { resolve } from '$app/paths'

    /** @typedef {Object} Props
     * @property {string} category
     * @property {boolean} [active]
     */

    /** @type {Props} */
    let { category, active = false } = $props()

    /** @param {string | undefined} value */
    function getCategoryVariant(value) {
        switch (value?.toLowerCase()) {
            case 'reflection':
                return 'reflection'
            case 'outdoor':
            case 'outdoors':
                return 'outdoor'
            case 'tech':
                return 'tech'
            default:
                return 'neutral'
        }
    }

    let variant = $derived(getCategoryVariant(category))
</script>

{#if category}
    <a
        class="category-pill"
        data-variant={variant}
        href={resolve('/journal/category/[category]', { category })}
        aria-current={active ? 'page' : undefined}
    >
        {category}
    </a>
{/if}

<style lang="scss">
    .category-pill {
        display: inline-block;
        font-family: var(--font-sans);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        line-height: 1.3;
        text-decoration: none;
        white-space: nowrap;
        color: var(--pill-color);
    }

    .category-pill[aria-current='page'] {
        text-decoration: underline;
        text-underline-offset: 0.2em;
    }

    .category-pill[data-variant='reflection'],
    .category-pill[data-variant='outdoor'],
    .category-pill[data-variant='tech'] {
        --pill-color: var(--accent);
    }

    .category-pill[data-variant='neutral'] {
        --pill-color: var(--text-color);
    }
</style>
