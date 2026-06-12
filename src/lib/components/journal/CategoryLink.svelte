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
        padding: 0.08em 0.6em;
        border-radius: 999px;
        font-size: 0.85rem;
        // font-weight: 600;
        line-height: 1.3;
        text-decoration: none;
        white-space: nowrap;
        background-color: transparent;
        color: var(--pill-color);
        border: 1px solid var(--light-grey);
    }

    .category-pill[aria-current='page'] {
        font-weight: 600;
        border-color: var(--pill-color);
    }

    .category-pill[data-variant='reflection'] {
        --pill-color: #5e35b1;
    }

    .category-pill[data-variant='outdoor'] {
        --pill-color: #2e7d32;
    }

    .category-pill[data-variant='tech'] {
        --pill-color: #1565c0;
    }

    .category-pill[data-variant='neutral'] {
        --pill-color: var(--text-color);
    }

    :global(html body[data-theme='dark'])
        .category-pill[data-variant='reflection'] {
        --pill-color: #ce93d8;
    }

    :global(html body[data-theme='dark'])
        .category-pill[data-variant='outdoor'] {
        --pill-color: #a5d6a7;
    }

    :global(html body[data-theme='dark']) .category-pill[data-variant='tech'] {
        --pill-color: #90caf9;
    }

    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='reflection'] {
            --pill-color: #ce93d8;
        }

        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='outdoor'] {
            --pill-color: #a5d6a7;
        }

        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='tech'] {
            --pill-color: #90caf9;
        }
    }
</style>
