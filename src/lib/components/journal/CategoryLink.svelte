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

    .category-pill[data-variant='outdoor'] {
        --pill-color: #5a8f5a;
    }

    .category-pill[data-variant='reflection'] {
        --pill-color: #7a5a9e;
    }

    .category-pill[data-variant='tech'] {
        --pill-color: #4a7a9e;
    }

    .category-pill[data-variant='neutral'] {
        --pill-color: var(--text-color);
    }

    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='outdoor'] {
            --pill-color: #90c890;
        }
        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='reflection'] {
            --pill-color: #b890d0;
        }
        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='tech'] {
            --pill-color: #90b8d8;
        }
    }

    :global(html body[data-theme='dark'])
        .category-pill[data-variant='outdoor'] {
        --pill-color: #90c890;
    }
    :global(html body[data-theme='dark'])
        .category-pill[data-variant='reflection'] {
        --pill-color: #b890d0;
    }
    :global(html body[data-theme='dark']) .category-pill[data-variant='tech'] {
        --pill-color: #90b8d8;
    }
</style>
