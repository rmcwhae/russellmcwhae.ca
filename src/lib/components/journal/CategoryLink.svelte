<script>
    import { resolve } from '$app/paths'

    let { category } = $props()

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
    >
        {category}
    </a>
{/if}

<style lang="scss">
    .category-pill {
        display: inline-block;
        padding: 0.15em 0.65em;
        border-radius: 999px;
        font-size: 0.9rem;
        font-weight: 600;
        line-height: 1.3;
        text-decoration: none;
        white-space: nowrap;
        background-color: var(--pill-bg);
        color: var(--pill-color);
    }

    .category-pill:hover {
        background-color: var(--pill-bg-hover);
    }

    .category-pill[data-variant='reflection'] {
        --pill-bg: #ede7f6;
        --pill-bg-hover: #e1d5f3;
        --pill-color: #5e35b1;
    }

    .category-pill[data-variant='outdoor'] {
        --pill-bg: #e8f5e9;
        --pill-bg-hover: #d7eed9;
        --pill-color: #2e7d32;
    }

    .category-pill[data-variant='tech'] {
        --pill-bg: #e3f2fd;
        --pill-bg-hover: #d2e8fb;
        --pill-color: #1565c0;
    }

    .category-pill[data-variant='neutral'] {
        --pill-bg: color-mix(in srgb, var(--light-grey) 65%, transparent);
        --pill-bg-hover: color-mix(in srgb, var(--light-grey) 80%, transparent);
        --pill-color: var(--text-color);
    }

    :global(html body[data-theme='dark']) .category-pill[data-variant='reflection'] {
        --pill-bg: rgba(126, 87, 194, 0.25);
        --pill-bg-hover: rgba(126, 87, 194, 0.35);
        --pill-color: #ce93d8;
    }

    :global(html body[data-theme='dark']) .category-pill[data-variant='outdoor'] {
        --pill-bg: rgba(76, 175, 80, 0.25);
        --pill-bg-hover: rgba(76, 175, 80, 0.35);
        --pill-color: #a5d6a7;
    }

    :global(html body[data-theme='dark']) .category-pill[data-variant='tech'] {
        --pill-bg: rgba(66, 165, 245, 0.25);
        --pill-bg-hover: rgba(66, 165, 245, 0.35);
        --pill-color: #90caf9;
    }

    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='reflection'] {
            --pill-bg: rgba(126, 87, 194, 0.25);
            --pill-bg-hover: rgba(126, 87, 194, 0.35);
            --pill-color: #ce93d8;
        }

        :global(html body:not([data-theme='light']))
            .category-pill[data-variant='outdoor'] {
            --pill-bg: rgba(76, 175, 80, 0.25);
            --pill-bg-hover: rgba(76, 175, 80, 0.35);
            --pill-color: #a5d6a7;
        }

        :global(html body:not([data-theme='light'])) .category-pill[data-variant='tech'] {
            --pill-bg: rgba(66, 165, 245, 0.25);
            --pill-bg-hover: rgba(66, 165, 245, 0.35);
            --pill-color: #90caf9;
        }
    }
</style>
