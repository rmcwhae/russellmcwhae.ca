<script>
    const interests = [
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
</script>

<div class="interests-block">
    <h2 class="eyebrow">Other interests</h2>
    <ul class="interests">
    {#each interests as interest (interest.href)}
        <li>
            <a href={interest.href}>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
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
