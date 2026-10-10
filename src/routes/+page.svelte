<script>
    import Image from '#lib/components/images/Image.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import Button from '#lib/components/buttons/Button.svelte'
    import JournalEntry from '#lib/components/journal/Entry.svelte'
    import { mountPhotoSwipe } from '#lib/components/images/mountPhotoSwipe.js'
    import { preventLastTwoWordWrap } from '#lib/utils/string/index.js'

    let { data } = $props()

    let images = $derived(Array.isArray(data.images) ? data.images : [])
    let latestPosts = $derived(data.latestPosts ?? [])
    let latestPost = $derived(latestPosts[0])
    let recentPosts = $derived(latestPosts.slice(1, 4))
    let favourites = $derived(images.slice(0, 4))

    $effect(() => {
        if (!favourites.length) return

        let lightbox
        let cancelled = false

        mountPhotoSwipe('#home-favourites').then((instance) => {
            if (cancelled) instance.destroy()
            else lightbox = instance
        })

        return () => {
            cancelled = true
            lightbox?.destroy()
        }
    })

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

<SEO />

<svelte:head>
    <link rel="preload" as="image" href="/hero.jpg" fetchpriority="high" />
</svelte:head>

<div class="home">
    <section class="hero full-width">
        <img
            class="hero-bg"
            src="/hero.jpg"
            alt=""
            fetchpriority="high"
            decoding="async"
        />
        <div class="hero-frame">
            <div class="intro">
                <h1>
                    <span class="line-sans">Thoughtful work.</span>
                    <span class="line-serif">Open horizons.</span>
                </h1>
                <p class="lede">
                    I’m Russell—a web developer, photographer, and writer with a
                    deep appreciation for the natural world.
                </p>
            </div>
        </div>
    </section>

    {#if favourites.length}
        <section class="band">
            <div class="section-label">
                <h2 class="eyebrow">Favourite Landscapes</h2>
                <Button href="/photography" text="View all photos" right />
            </div>
            <div class="moments" id="home-favourites">
                {#each favourites as image, i (image.filePath)}
                    <figure
                        class="photo"
                        class:lead={i === 0}
                        class:tall={i === 1}
                    >
                        <Image
                            filePath={image.filePath}
                            width={image.width}
                            height={image.height}
                            customMetadata={image.customMetadata}
                            lockedRatio
                            photoswipe
                        />
                        {#if image.customMetadata?.caption}
                            <figcaption class="caption">
                                <span class="index"
                                    >{String(i + 1).padStart(2, '0')}</span
                                >
                                <span class="caption-text"
                                    >{image.customMetadata.caption}</span
                                >
                            </figcaption>
                        {/if}
                    </figure>
                {/each}
            </div>
        </section>
    {/if}

    {#if latestPost}
        <section class="band">
            <h2 class="eyebrow journal-heading">Journal</h2>
            <div class="journal-grid">
                <div class="journal-featured">
                    <JournalEntry
                        post={latestPost}
                        featured
                        showCategory={false}
                    />
                </div>
                <div class="journal-recent">
                    <p class="eyebrow">Recent entries</p>
                    {#each recentPosts as post (post.href)}
                        <article class="recent-entry">
                            <h3 class="recent-title">
                                <a href={post.href}
                                    >{@html preventLastTwoWordWrap(
                                        post.title
                                    )}</a
                                >
                            </h3>
                            {#if post.description}
                                <p>
                                    {@html preventLastTwoWordWrap(
                                        post.description
                                    )}
                                </p>
                            {/if}
                        </article>
                    {/each}
                    <Button href="/journal" text="View all" right />
                </div>
            </div>
        </section>
    {/if}

    <section class="band about-band">
        <p class="eyebrow about-kicker">About</p>
        <h2 class="about-title">
            A balance of logic, curiosity, and creativity.
        </h2>
        <figure class="portrait">
            <img
                src="/russell.png"
                alt="Russell McWhae"
                width="1000"
                height="822"
                loading="lazy"
                decoding="async"
            />
        </figure>
        <div class="about-copy">
            <p>
                My work has moved through structural engineering, biomedical
                research, and web development. Across those fields, I’ve always
                enjoyed the same process: understanding how things work, then
                making them work better.
            </p>
            <p>
                Away from the computer, you’ll find me exploring the natural
                world on foot, skis, or a bike, with my camera along for the
                journey.
            </p>
            <p>
                This website is my creative outlet, a place to share the world
                as I see it through photographs and words.
            </p>

            <Button href="/about" text="More about me" right />
        </div>
        <div class="interests-col">
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
    </section>
</div>

<style lang="scss">
    @use '../lib/scss/breakpoints' as *;

    .home {
        display: grid;
        grid-template-columns:
            1fr
            min(#{$breakpoint-xl}, 100%)
            1fr;
    }

    .hero,
    .band {
        grid-column: 1 / -1;
    }

    .band {
        width: min(#{$breakpoint-xl}, 100%);
        margin-inline: auto;
    }

    .hero {
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
        height: 100vh;
        height: 100dvh;
        padding: 0 clamp(1.25rem, 4vw, 2.75rem) clamp(1.5rem, 4vh, 3rem);
    }

    .hero-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
    }

    .hero::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(
            to top,
            rgb(9 10 9 / 75%) 0%,
            rgb(9 10 9 / 42%) 28%,
            transparent 58%
        );
    }

    .hero-frame {
        position: relative;
        z-index: 2;
        width: min(#{$breakpoint-xl}, 100%);
        margin-inline: auto;
    }

    .intro {
        max-width: 40rem;
        color: var(--paper);
    }

    .intro h1,
    .intro .lede {
        color: var(--paper);
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
        grid-template-columns: minmax(0, 1fr);
        gap: 0.75rem 1rem;
    }

    .caption {
        display: flex;
        align-items: baseline;
        gap: 0.6rem;
        margin: 0.5rem 0 0;
        color: var(--text-color);
        font-size: 0.85rem;
        font-weight: 400;
        line-height: 1.4;
    }

    .index {
        flex: none;
        font-family: var(--font-sans);
        font-size: 0.7rem;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.08em;
        opacity: 0.7;
    }

    .photo {
        display: block;
        position: relative;
        min-width: 0;
        margin: 0;
    }

    .photo :global(.lockedRatio) {
        overflow: hidden;
        border-radius: var(--radius);
    }

    @media (prefers-reduced-motion: no-preference) {
        .photo :global(img) {
            transition: transform 600ms ease;
        }

        .photo:hover :global(img) {
            transform: scale(1.03);
        }
    }

    .photo :global(a),
    .photo :global(a:hover) {
        text-decoration: none;
        cursor: zoom-in;
    }

    .about-band {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.6rem;
    }

    .about-title {
        margin: 0;
        max-width: 16ch;
    }

    .portrait {
        width: min(100%, 250px);
        margin: var(--s0) 0 0;
    }

    .portrait img {
        width: 100%;
        height: auto;
    }

    .about-copy {
        max-width: 42ch;
        margin-top: var(--s1);
    }

    .about-copy p {
        margin: 0 0 1.25rem;
    }

    .interests-col {
        width: 100%;
        margin-top: var(--s2);
    }

    .journal-heading {
        margin: 0 0 var(--s1);
    }

    .journal-grid {
        display: grid;
        gap: var(--s2);
    }

    .journal-featured,
    .journal-recent {
        min-width: 0;
    }

    .journal-recent {
        display: flex;
        flex-direction: column;
    }

    .journal-recent .eyebrow {
        margin: 0 0 var(--s0);
    }

    .recent-entry {
        display: flex;
        flex-direction: column;
        align-self: stretch;
        width: 100%;
        margin-inline: 0;
        gap: 0.35rem;
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);

        & + & {
            padding-top: var(--s0);
        }
    }

    .recent-title {
        margin: 0;
        font-size: 1.2rem;
        line-height: 1.25;
    }

    .recent-entry p {
        margin: 0;
        color: var(--text-color);
        font-size: 0.95rem;
        font-weight: 400;
        line-height: 1.45;
    }

    .journal-recent :global(a.button) {
        align-self: flex-start;
        margin-top: var(--s1);
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

    @include for-tablet-portrait-up {
        .moments {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-auto-rows: clamp(10rem, 22vw, 15rem);
        }

        .photo {
            overflow: hidden;
            border-radius: var(--radius);
        }

        .photo.lead {
            grid-column: 1 / -1;
            grid-row: span 2;
        }

        .photo.tall {
            grid-row: span 2;
        }

        /* Let the grid cell set the size instead of the 3:2 ratio */
        .photo :global(.lockedRatio) {
            height: 100%;
        }

        .photo :global(.lockedRatio::after) {
            aspect-ratio: auto;
        }

        .caption {
            position: absolute;
            inset: auto 0 0;
            margin: 0;
            padding: 2.5rem 1rem 0.85rem;
            color: var(--paper);
            background: linear-gradient(to top, rgb(9 10 9 / 70%), transparent);
            pointer-events: none;
        }

        .caption-text {
            font-family: var(--font-serif);
            font-style: italic;
            font-size: 0.95rem;
        }

        .lead .caption {
            padding: 3.5rem 1.25rem 1.1rem;
        }

        .lead .caption-text {
            font-size: 1.15rem;
        }
    }

    @include for-tablet-landscape-up {
        .moments {
            grid-template-columns: minmax(0, 2fr) repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(2, clamp(12rem, 17vw, 17rem));
            grid-auto-rows: auto;
        }

        .photo.lead {
            grid-column: 1;
            grid-row: 1 / -1;
        }

        .photo.tall {
            grid-column: 2;
            grid-row: 1 / -1;
        }

        .journal-grid {
            grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
            gap: var(--s3);
            align-items: start;
        }

        .journal-recent {
            border-left: 1px solid var(--light-grey);
            padding-left: var(--s2);
        }

        .about-band {
            display: grid;
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.45fr) minmax(
                    0,
                    0.9fr
                );
            column-gap: var(--s3);
            row-gap: 0.6rem;
            align-items: start;
            grid-template-areas:
                'kicker . interests'
                'title copy interests'
                'photo copy interests';
        }

        .about-kicker {
            grid-area: kicker;
        }

        .about-title {
            grid-area: title;
        }

        .portrait {
            grid-area: photo;
            margin-top: var(--s1);
        }

        .about-copy {
            grid-area: copy;
            max-width: none;
            margin-top: 0;
        }

        .interests-col {
            grid-area: interests;
            margin-top: 0;
        }
    }
</style>
