<script>
    import Image from '#lib/components/images/Image.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
    import Button from '#lib/components/buttons/Button.svelte'
    import JournalEntry from '#lib/components/journal/Entry.svelte'
    import NoWrapLastTwoWords from '#lib/components/misc/NoWrapLastTwoWords.svelte'
    import { mountPhotoSwipe } from '#lib/components/images/mountPhotoSwipe.js'
    import {
        heroPicture,
        heroPreload,
        homeLeadSizes,
        homePhotoSizes,
        homeTallSizes,
    } from '#lib/utils/images/static.js'
    import StaticPicture from '#lib/components/images/StaticPicture.svelte'
    import Camera from '#lib/components/icons/Camera.svelte'
    import { books } from './reading-list/books'

    let { data } = $props()

    let latestBook = books[0]

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
</script>

<SEO />

<svelte:head>
    <link
        rel="preload"
        as="image"
        href={heroPreload}
        type="image/avif"
        imagesrcset={heroPicture.avif}
        imagesizes={heroPicture.sizes}
        fetchpriority="high"
    />
</svelte:head>

<div class="home">
    <section class="hero full-width">
        <div class="hero-bg">
            <StaticPicture {...heroPicture} alt="" fetchpriority="high" />
        </div>
        <div class="hero-frame">
            <div class="intro">
                <h1>
                    <span class="line-sans">A life observed.</span>
                    <span class="line-serif">In words & images.</span>
                </h1>
                <p class="lede">
                    I’m Russell—a web developer, photographer, and writer<br />
                    with a deep appreciation for the natural world.
                </p>
            </div>
            <p class="hero-caption">
                <span class="hero-camera" aria-hidden="true">
                    <Camera />
                </span>
                Elbow Lake
            </p>
        </div>
    </section>

    {#if favourites.length}
        <section class="band">
            <div class="section-label">
                <h2 class="eyebrow">Favourite Landscapes</h2>
                <div class="photos-link photos-link-aside">
                    <Button href="/photography" text="View all photos" right />
                </div>
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
                            sizes={i === 0
                                ? homeLeadSizes
                                : i === 1
                                  ? homeTallSizes
                                  : homePhotoSizes}
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
            <div class="photos-link photos-link-below">
                <Button href="/photography" text="View all photos" right />
            </div>
        </section>
    {/if}

    {#if latestPost}
        <section class="band journal-band">
            <h2 class="eyebrow journal-heading">Journal</h2>
            <div class="journal-grid">
                <div class="journal-featured">
                    <JournalEntry
                        post={latestPost}
                        featured
                        showCategory={false}
                        level={3}
                    />
                </div>
                <div class="journal-recent">
                    <p class="eyebrow">Recent entries</p>
                    <div class="recent-list">
                        {#each recentPosts as post (post.href)}
                            <article class="recent-entry">
                                <h3 class="recent-title title-sm">
                                    <a href={post.href}
                                        ><NoWrapLastTwoWords
                                            text={post.title}
                                        /></a
                                    >
                                </h3>
                                {#if post.description}
                                    <p>
                                        <NoWrapLastTwoWords
                                            text={post.description}
                                        />
                                    </p>
                                {/if}
                            </article>
                        {/each}
                        <Button href="/journal" text="View all" right />
                    </div>
                </div>
            </div>
        </section>
    {/if}

    <section class="band about-band">
        <h2 class="eyebrow about-kicker">About</h2>
        <p class="about-title">
            A balance of logic, curiosity, and creativity.
        </p>
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

            <div class="about-actions">
                <Button href="/about" text="More about me" right />
                <Button
                    href="https://github.com/rmcwhae"
                    text="My GitHub profile"
                    external
                    right
                />
            </div>
        </div>
        <div class="interests-col">
            <div class="latest-book">
                <h2 class="eyebrow">Latest Book Read</h2>
                <div class="latest-book-body">
                    <div class="latest-book-copy">
                        <p class="title-sm">{latestBook.title}</p>
                        <p class="latest-book-author">{latestBook.author}</p>
                    </div>
                    <Button
                        href="/reading-list"
                        text="Full reading list"
                        right
                    />
                </div>
            </div>
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
        /* 100vh is the fallback; 100svh stays fixed when the iPad toolbar collapses */
        min-height: 100vh;
        min-height: 100svh;
        padding: 0 var(--page-gutter) clamp(1.5rem, 4vh, 3rem);
    }

    .hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    .hero-bg :global(picture),
    .hero-bg :global(img) {
        display: block;
        width: 100%;
        height: 100%;
    }

    .hero-bg :global(img) {
        object-fit: cover;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        height: 28%;
        pointer-events: none;
        background: linear-gradient(
            to bottom,
            rgb(0 0 0 / 42%) 0%,
            rgb(0 0 0 / 16%) 46%,
            transparent 100%
        );
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
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
        column-gap: 2rem;
        row-gap: 0.75rem;
        width: min(#{$breakpoint-xl}, 100%);
        margin-inline: auto;
    }

    .hero-caption {
        display: flex;
        flex: none;
        align-items: center;
        gap: 0.4em;
        margin: 0 0 0 auto;
        color: var(--paper);
        font-family: var(--font-serif);
        font-style: italic;
        font-weight: 400;
        font-size: var(--text-md);
        line-height: var(--leading-compact);
    }

    .hero-camera {
        display: flex;
        color: #a7aaa2;
    }

    @include for-phone-only {
        .hero-frame {
            flex-direction: column;
            align-items: stretch;
        }

        .hero-caption {
            font-size: var(--text-xs);
        }
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
        font-size: var(--text-display);
        font-weight: 500;
        letter-spacing: -0.035em;
        line-height: 1.08;
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

    .intro .lede {
        max-width: 34rem;
        margin: 0;
    }

    /* Keep the break after “writer” once that line fits on its own. */
    .intro .lede br {
        display: none;
    }

    @media (min-width: 420px) {
        .intro .lede br {
            display: inline;
        }
    }

    .band {
        margin-top: var(--s4);
        padding-top: var(--s2);
        border-top: 1px solid var(--light-grey);
    }

    .hero + .band {
        margin-top: var(--s3);
        padding-top: var(--s0);
        border-top: none;
    }

    @include for-phone-only {
        .hero + .band {
            margin-top: var(--s1);
            padding-top: 0;
        }

        .hero + .band + .band,
        .about-band {
            margin-top: var(--s2);
        }
    }

    .section-label {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: var(--s1);
    }

    .photos-link-below {
        display: none;
    }

    @include for-phone-only {
        .photos-link-aside {
            display: none;
        }

        .photos-link-below {
            display: block;
            margin-top: var(--s1);
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
        font-size: var(--text-xs);
        font-weight: 400;
        line-height: var(--leading-compact);
    }

    .index {
        flex: none;
        font-family: var(--font-sans);
        font-size: var(--text-caps);
        font-variant-numeric: tabular-nums;
        letter-spacing: var(--tracking-caps);
        opacity: 0.7;
    }

    @include for-phone-only {
        .moments {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .index {
            display: none;
        }

        .caption {
            position: absolute;
            inset: auto 0 0;
            display: block;
            margin: 0;
            padding: 1.35rem 0.45rem 0.55rem;
            color: var(--paper);
            background: linear-gradient(to top, rgb(9 10 9 / 70%), transparent);
            pointer-events: none;
            overflow: visible;
        }

        .caption-text {
            display: block;
            font-family: var(--font-serif);
            font-style: normal;
            font-size: var(--text-caps);
            font-weight: var(--serif-heading-weight);
            line-height: 1.25;
            letter-spacing: var(--tracking-heading);
            white-space: nowrap;
            overflow: visible;
        }

        .photo {
            overflow: visible;
        }
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
        cursor: pointer;
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
        font-family: var(--font-serif);
        font-size: var(--text-xl);
        font-weight: var(--serif-heading-weight);
        line-height: var(--leading-tight);
        letter-spacing: var(--tracking-heading);
        color: var(--high-contrast-color);
    }

    .about-copy {
        max-width: 42ch;
        margin-top: var(--s1);
    }

    .about-copy p {
        margin: 0 0 1.25rem;
    }

    @include for-phone-only {
        .about-copy p {
            font-size: var(--text-sm);
        }
    }

    .about-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--s1);
    }

    .interests-col {
        width: 100%;
        margin-top: var(--s2);
    }

    .latest-book-body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--s1);
        margin-top: var(--s1);
    }

    .latest-book-copy {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .latest-book-author {
        margin: 0;
        color: var(--text-color);
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        font-weight: 400;
        line-height: var(--leading-compact);
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

    .journal-recent,
    .recent-list {
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

        &:last-of-type {
            border-bottom: none;
        }
    }

    .recent-title {
        margin: 0;
        font-weight: var(--serif-heading-weight);
    }

    .recent-title a {
        font-weight: inherit;
    }

    .recent-entry p {
        margin: 0;
        color: var(--text-color);
        font-size: var(--text-sm);
        font-weight: 400;
        line-height: var(--leading-compact);
    }

    .journal-recent :global(a.button) {
        align-self: flex-start;
        margin-top: var(--s1);
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
            font-size: var(--text-sm);
        }

        .lead .caption {
            padding: 3.5rem 1.25rem 1.1rem;
        }

        .lead .caption-text {
            font-size: var(--text-md);
        }
    }

    @include for-tablet-wide-up {
        .journal-band {
            display: grid;
            grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
            column-gap: var(--s3);
            row-gap: var(--s1);
            align-items: start;
            grid-template-areas:
                'heading recent-heading'
                'featured recent';
        }

        .journal-heading {
            grid-area: heading;
            margin: 0;
        }

        .journal-grid,
        .journal-recent {
            display: contents;
        }

        .journal-featured {
            grid-area: featured;
        }

        .journal-recent .eyebrow {
            grid-area: recent-heading;
            margin: 0;
            padding-left: var(--s2);
        }

        .recent-list {
            grid-area: recent;
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
                'title copy interests';
        }

        .about-kicker {
            grid-area: kicker;
        }

        .about-title {
            grid-area: title;
        }

        .about-copy {
            grid-area: copy;
            max-width: none;
            margin-top: 0;
        }

        .interests-col {
            grid-area: interests;
            display: grid;
            grid-template-rows: subgrid;
            margin-top: 0;
        }

        .latest-book {
            display: grid;
            grid-row: 1 / -1;
            grid-template-rows: subgrid;
        }

        .latest-book-body {
            margin-top: 0;
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
    }
</style>
