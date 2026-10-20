<script>
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

    let { heading = 'Beyond the Work', items = defaultItems } = $props()
</script>

<div class="interests-block">
    <h2 class="eyebrow">{heading}</h2>
    <ul class="interests">
        {#each items as item (item.href)}
            <li>
                <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                >
                    <h3>{item.title}</h3>
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
    }

    li:not(:last-child) {
        border-bottom: 1px solid var(--light-grey);
    }

    a {
        display: grid;
        gap: 0.2rem;
        padding: 0.9rem 0;
    }

    h3 {
        margin: 0;
        font-family: var(--font-sans);
        font-size: var(--text-base);
        font-weight: 500;
        letter-spacing: 0;
        color: inherit;
    }

    p {
        margin: 0;
        color: var(--text-color);
        font-size: var(--text-sm);
        font-weight: 400;
        line-height: var(--leading-compact);
    }
</style>
