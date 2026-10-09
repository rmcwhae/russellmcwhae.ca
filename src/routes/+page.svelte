<script>
    import Image from '#lib/components/images/Image.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import Button from '#lib/components/buttons/Button.svelte'
    import JournalEntrySet from '#lib/components/journal/EntrySet.svelte'

    let { data } = $props()

    let images = $derived(Array.isArray(data.images) ? data.images : [])
    let latestPosts = $derived(data.latestPosts)
    let hero = $derived(images[0])
    let favourites = $derived(images.slice(1, 5))

    const interests = [
        {
            href: '/calendars',
            title: 'Calendars',
            description: 'Printed photo calendars from a ten-year run.',
        },
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

<SEO />

<div class="home">
    <section class="hero">
        <div class="intro">
            <h1>
                <span class="line-sans">Thoughtful work.</span>
                <span class="line-serif">Open horizons.</span>
            </h1>
            <p class="lede">
                I’m Russell — a web developer with a background in engineering
                and biomedical research, drawn to good systems, thoughtful
                design, and time outside.
            </p>
        </div>
        {#if hero}
            <a class="photo-link" href="/photography">
                <Image
                    filePath={hero.filePath}
                    width={hero.width}
                    height={hero.height}
                    customMetadata={hero.customMetadata}
                    lockedRatio
                    priority
                />
            </a>
        {/if}
    </section>

    {#if favourites.length}
        <section class="band">
            <div class="section-label">
                <h2 class="eyebrow">Favourite moments</h2>
                <Button href="/photography" text="View all photography" right />
            </div>
            <div class="moments" style:--count={favourites.length}>
                {#each favourites as image (image.filePath)}
                    <a class="photo-link" href="/photography">
                        <Image
                            filePath={image.filePath}
                            width={image.width}
                            height={image.height}
                            customMetadata={image.customMetadata}
                            lockedRatio
                        />
                    </a>
                {/each}
            </div>
        </section>
    {/if}

    <section class="band split">
        <div class="about">
            <p class="eyebrow">About</p>
            <h2>
                Engineer, researcher, photographer, and lifelong outdoor
                enthusiast.
            </h2>
            <p>
                Growing up in Calgary, I spent time mountain biking, hiking, and
                skiing in the Canadian Rockies. I trained as a structural
                engineer, completed an MSc in biomedical engineering, and now
                work as a web developer.
            </p>
            <Button href="/about" text="Learn more about me" right />
        </div>
        <div>
            <div class="section-label">
                <h2 class="eyebrow">Recent journal entries</h2>
                <Button href="/journal" text="View all" right />
            </div>
            <div class="journal-list">
                <JournalEntrySet posts={latestPosts} />
            </div>
        </div>
    </section>

    <section class="band">
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
    </section>
</div>

<style lang="scss">
    @use '../lib/scss/breakpoints' as *;

    .home {
        display: flex;
        flex-direction: column;
    }

    .hero {
        display: grid;
        gap: var(--s2);
        align-items: end;
    }

    .intro {
        max-width: 40rem;
    }

    h1 {
        display: flex;
        flex-direction: column;
        margin: 0 0 1.25rem;
        font-size: clamp(2.6rem, 4.6vw, 4.35rem);
        font-weight: 500;
        letter-spacing: -0.035em;
        line-height: 0.98;
    }

    .line-sans {
        font-family: var(--font-sans);
        font-style: normal;
        font-weight: 500;
    }

    .line-serif {
        font-family: var(--font-serif);
        font-style: italic;
        font-weight: 400;
        letter-spacing: -0.03em;
    }

    .lede {
        max-width: 34rem;
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.55;
    }

    .band {
        margin-top: var(--s4);
        padding-top: var(--s2);
        border-top: 1px solid var(--light-grey);
    }

    .section-label {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: var(--s1);
    }

    @include for-phone-only {
        .section-label {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.65rem;
        }
    }

    .section-label :global(h2) {
        margin: 0;
    }

    .moments {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
    }

    .photo-link {
        display: block;
        min-width: 0;
        color: inherit;
    }

    .photo-link:hover {
        text-decoration: none;
    }

    .split {
        display: grid;
        gap: var(--s3);
    }

    .about h2 {
        margin: 0.6rem 0 1rem;
        max-width: 16ch;
    }

    .about p:not(.eyebrow) {
        max-width: 42ch;
        margin: 0 0 1.25rem;
    }

    .journal-list {
        border-top: 1px solid var(--light-grey);
    }

    .interests {
        list-style: none;
        margin: var(--s1) 0 0;
        padding: 0;
        border-top: 1px solid var(--light-grey);
    }

    .interests li {
        border-bottom: 1px solid var(--light-grey);
    }

    .interests a {
        display: grid;
        gap: 0.2rem;
        padding: 0.9rem 0;
        text-decoration: none;
    }

    .interests a:hover {
        text-decoration: none;
    }

    .interests h3 {
        margin: 0;
        font-family: var(--font-sans);
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0;
    }

    .interests a:hover h3 {
        color: var(--alpine);
    }

    .interests p {
        margin: 0;
        color: var(--text-color);
        font-weight: 400;
    }

    @include for-tablet-landscape-up {
        .hero {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
            gap: var(--s3);
        }

        .moments {
            grid-template-columns: repeat(var(--count, 4), minmax(0, 1fr));
        }

        .split {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
            gap: var(--s4);
        }
    }
</style>
