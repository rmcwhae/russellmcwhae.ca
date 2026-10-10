<script>
    import ArrowNorthEast from '#lib/components/icons/ArrowNorthEast.svelte'

    const defaultItems = [
        {
            href: '/reading-list',
            title: 'Reading list',
            description: 'Books I have read.',
        },
        {
            href: '/uses',
            title: 'What I use',
            description: 'Tools used in my work.',
        },
    ]

    let { heading = 'Beyond the Work', items = defaultItems, arrow = true } =
        $props()
</script>

<div class="interests-block">
    <h2 class="eyebrow">{heading}</h2>
    <ul class="interests">
        {#each items as item (item.href)}
            <li>
                <a href={item.href} class:has-arrow={arrow}>
                    <span class="title-row">
                        <h3>{item.title}</h3>
                        {#if arrow}
                            <ArrowNorthEast />
                        {/if}
                    </span>
                    {#if item.description}
                        <p>{item.description}</p>
                    {/if}
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .interests {
        list-style: none;
        margin: var(--s1) 0 0;
        padding: 0;
        border-top: 1px solid var(--light-grey);
    }

    li {
        border-bottom: 1px solid var(--light-grey);
    }

    a {
        display: grid;
        gap: 0.2rem;
        padding: 0.9rem 0;
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
    }

    .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .title-row :global(.icon) {
        flex: none;
    }

    a.has-arrow:hover {
        color: var(--alpine);
    }

    h3 {
        margin: 0;
        font-family: var(--font-sans);
        font-size: var(--text-base);
        font-weight: 500;
        letter-spacing: 0;
    }

    a:hover h3 {
        color: var(--alpine);
    }

    p {
        margin: 0;
        color: var(--text-color);
        font-size: var(--text-sm);
        font-weight: 400;
        line-height: var(--leading-compact);
    }
</style>
