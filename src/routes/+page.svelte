<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import HomepageGallery from '$lib/components/images/HomepageGallery.svelte'
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import { resolve } from '$app/paths'

    let { data } = $props()

    let images = $derived(data.images)
    let featuredPost = $derived(data.featuredPost)
    let recentPosts = $derived(data.recentPosts)
</script>

<SEO />

<!-- Hero: full-bleed outside .home so full-width class reaches viewport edges -->
<section class="hero full-width">
    <div class="hero-image-bg">
        <img src="/hero.jpg" alt="Hero" loading="eager" />
    </div>
    <div class="hero-blur"></div>
    <div class="hero-gradient"></div>
    <div class="hero-light-gradient"></div>
    <div class="hero-inner">
        <div class="hero-text">
            <div class="kicker">My creative outlet</div>
            <h1>A quiet eye<br />in a loud world.</h1>
            <p class="lead">
                Images and writing from the trails, the desk, and the spaces in
                between.
            </p>
            <div class="hero-links">
                <a class="accent-link" href={resolve('/photography')}
                    ><span>Explore my Photography</span> →</a
                >
                <a class="accent-link" href={resolve('/journal')}
                    ><span>Read my Journal</span> →</a
                >
            </div>
        </div>
    </div>
</section>

<div class="home">
    <!-- Photography -->
    <section class="page-section">
        <div class="section-header">
            <span class="section-label">Photography</span>
            <a href={resolve('/photography')} class="accent-link"
                ><span>View all</span> →</a
            >
        </div>
        <p class="section-desc">Some of my all-time favourite images.</p>
        <div class="gallery-wrapper">
            <HomepageGallery {images} />
        </div>
    </section>

    <!-- Journal -->
    <section class="page-section">
        <span class="recent-entries-heading journal-section-heading">From My Journal</span>
        <div class="restricted-width">
            <JournalEntry post={featuredPost} featured />
        </div>
        <div class="section-header recent-entries-header mt-3">
            <span class="recent-entries-heading">Recent Entries</span>
            <a href={resolve('/journal')} class="accent-link"
                ><span>View all</span> →</a
            >
        </div>
        <div class="recent-posts-grid">
            {#each recentPosts as post (post.slug ?? post.href)}
                <JournalEntry {post} />
            {/each}
        </div>
    </section>

    <!-- Currently -->
    <section class="page-section">
        <div class="section-header">
            <span class="section-label">Currently</span>
        </div>
        <div class="currently">
            <div class="currently-item">
                <div class="c-label">Learning</div>
                <div class="c-value">Retrieval-Augmented Generation (RAG)</div>
            </div>
            <div class="currently-item">
                <div class="c-label">Reading</div>
                <div class="c-value">
                    <i>Spirit-Controlled Temperament</i> by Tim LaHaye
                </div>
            </div>
            <div class="currently-item">
                <div class="c-label">Exploring</div>
                <div class="c-value">Lower Mainland gravel routes</div>
            </div>
        </div>
    </section>

    <!-- About -->
    <section class="page-section about-section" id="about">
        <div class="about-grid">
            <div class="about-text">
                <div class="section-label" style="margin-bottom: var(--s0)">
                    About
                </div>
                <p>
                    I’m Russell McWhae, a software developer, photographer, and
                    writer based in British Columbia. My journey has taken me
                    from the prairies of Calgary and the peaks of Revelstoke to
                    my current home on the Vancouver coast. This website is
                    where I collect photographs and share observations about
                    technology, the outdoors, and everyday life.
                </p>
                <p>
                    Professionally, I have had a few different careers. In 2011,
                    I graduated from civil engineering at the University of
                    Alberta. In early 2019, I earned an MSc. in biomedical
                    engineering from the University of Calgary. I then took the
                    Lighthouse Labs web development boot camp and now work as a
                    web developer.
                </p>
            </div>
            <div class="portrait">
                <img src="/russell.png" alt="Russell McWhae" />
            </div>
        </div>
    </section>
</div>

<style lang="scss">
    @use '../lib/scss/breakpoints' as *;

    .home {
        margin: 0 auto;
    }

    /* Hero */
    .hero {
        position: relative;
        overflow: hidden;
        min-height: 680px;
        display: flex;
        align-items: center;
        margin-top: calc(-1 * var(--nav-height));

        @include for-tablet-portrait-down {
            min-height: 520px;
            align-items: flex-end;
        }

        @include for-phone-only {
            min-height: 480px;
        }
    }

    .hero-image-bg {
        position: absolute;
        inset: 0;
        z-index: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 65% center;
            display: block;
        }
    }

    .hero-blur {
        position: absolute;
        inset: 0;
        z-index: 1;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        mask-image: radial-gradient(
            ellipse 95% 150% at -30% 50%,
            black 0%,
            black 25%,
            transparent 65%
        );
        -webkit-mask-image: radial-gradient(
            ellipse 95% 150% at -30% 50%,
            black 0%,
            black 25%,
            transparent 65%
        );

        @include for-tablet-portrait-down {
            mask-image: radial-gradient(
                ellipse 130% 95% at 0% 70%,
                black 0%,
                black 25%,
                transparent 65%
            );
            -webkit-mask-image: radial-gradient(
                ellipse 130% 95% at 0% 70%,
                black 0%,
                black 25%,
                transparent 65%
            );
        }
    }

    .hero-gradient {
        position: absolute;
        inset: 0;
        z-index: 2;
        inset: -30px;
        background: radial-gradient(
            ellipse 95% 150% at -30% 50%,
            var(--background-color) 0%,
            var(--background-color) 40%,
            var(--background-color-transparent) 65%,
            transparent 85%
        );
        filter: blur(80px);

        @include for-tablet-portrait-down {
            inset: -30px;
            background: radial-gradient(
                ellipse 130% 95% at 0% 70%,
                var(--background-color) 0%,
                var(--background-color-transparent) 50%,
                transparent 75%
            );
            filter: blur(20px);
        }
    }

    .hero-light-gradient {
        position: absolute;
        inset: 0;
        z-index: 2;
        background: linear-gradient(
            to right,
            var(--background-color) 0%,
            transparent 33%
        );
        pointer-events: none;

        @include for-tablet-portrait-down {
            display: none;
        }

        @media (prefers-color-scheme: dark) {
            display: none;
        }
    }

    :global(body[data-theme='dark']) .hero-light-gradient {
        display: none;
    }

    :global(body[data-theme='light']) .hero-light-gradient {
        display: block;
    }

    .hero-inner {
        position: relative;
        z-index: 2;
        width: 100%;
        margin: 0 auto;
        padding: calc(80px + var(--nav-height))
            max(var(--s1), calc((100% - #{$breakpoint-xl}) / 2))
            80px;

        @include for-tablet-portrait-down {
            padding: calc(48px + var(--nav-height)) var(--s1) 64px;
        }
    }

    .hero-text {
        max-width: 480px;
        display: flex;
        flex-direction: column;
        gap: var(--s0);

        @include for-tablet-portrait-down {
            max-width: none;
        }
    }

    .hero-text h1 {
        font-size: clamp(2.8rem, 5vw, 4.5rem);
        line-height: 1.02;
        margin: 0;

        &::after {
            content: '';
            display: block;
            width: 40px;
            height: 3px;
            background: var(--accent);
            margin-top: var(--s0);
        }
    }

    .lead {
        font-size: var(--body-sm);
        line-height: 1.7;
        color: var(--text-color);
        max-width: 36ch;
        margin: 0;
    }

    .hero-links {
        display: flex;
        flex-direction: column;
        gap: var(--s0);
    }

    /* Sections */
    .page-section {
        padding: var(--s3) 0;
    }

    .gallery-wrapper {
        margin: var(--s2) 0;
    }

    .journal-section-heading {
        display: block;
        margin-bottom: var(--s3);
    }

    .section-header.recent-entries-header {
        margin-bottom: var(--s1);
    }

    .recent-posts-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--s1);

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
        }
    }

    .recent-entries-heading {
        font-family: var(--font-sans);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--medium-grey);
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: var(--s-4);
    }

    .section-desc {
        font-size: var(--body-sm);
        color: var(--text-color);
        margin: 0 0 var(--s1);
    }

    .c-value {
        font-size: var(--body-sm);
        color: var(--text-color);
        line-height: 1.6;
    }

    /* Currently */
    .currently {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--s2);
        margin-top: var(--s1);

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
            gap: var(--s1);
        }
    }

    .c-label {
        font-family: var(--font-serif);
        font-size: var(--s1);
        font-weight: normal;
        color: var(--high-contrast-color);
        margin-bottom: var(--s-2);
    }

    /* About */
    .about-grid {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: var(--s3);
        align-items: stretch;
        max-width: 820px;

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
            gap: var(--s2);
        }
    }

    .about-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .about-text p {
        font-size: var(--body-sm);
        line-height: 1.7;
        color: var(--text-color);
        max-width: 52ch;
        margin-bottom: var(--s0);
    }

    .portrait {
        @include for-tablet-landscape-up {
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center top;
                display: block;
            }
        }
    }
</style>
