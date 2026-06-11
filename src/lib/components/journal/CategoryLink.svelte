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
        class:reflection={variant === 'reflection'}
        class:outdoor={variant === 'outdoor'}
        class:tech={variant === 'tech'}
        class:neutral={variant === 'neutral'}
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
        vertical-align: baseline;
    }

    .category-pill:hover {
        text-decoration: none;
    }

    .reflection {
        background-color: #ede7f6;
        color: #5e35b1;
    }

    .outdoor {
        background-color: #e8f5e9;
        color: #2e7d32;
    }

    .tech {
        background-color: #e3f2fd;
        color: #1565c0;
    }

    .neutral {
        background-color: color-mix(in srgb, var(--light-grey) 65%, transparent);
        color: var(--text-color);
    }

    :global(html body[data-theme='dark']) .reflection {
        background-color: rgba(126, 87, 194, 0.25);
        color: #ce93d8;
    }

    :global(html body[data-theme='dark']) .outdoor {
        background-color: rgba(76, 175, 80, 0.25);
        color: #a5d6a7;
    }

    :global(html body[data-theme='dark']) .tech {
        background-color: rgba(66, 165, 245, 0.25);
        color: #90caf9;
    }

    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light'])) .reflection {
            background-color: rgba(126, 87, 194, 0.25);
            color: #ce93d8;
        }

        :global(html body:not([data-theme='light'])) .outdoor {
            background-color: rgba(76, 175, 80, 0.25);
            color: #a5d6a7;
        }

        :global(html body:not([data-theme='light'])) .tech {
            background-color: rgba(66, 165, 245, 0.25);
            color: #90caf9;
        }
    }
</style>
