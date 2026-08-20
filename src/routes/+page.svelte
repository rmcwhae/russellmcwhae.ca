<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import HomepageGallery from '$lib/components/images/HomepageGallery.svelte'
    import JournalEntry from '$lib/components/journal/Entry.svelte'
    import { resolve } from '$app/paths'
    import { EDITOR_PICKS } from '$lib/constants/journal'
    import { CURRENTLY_READING } from '$lib/data/reading-list'

    let { data } = $props()

    let images = $derived(data.images)
    let featuredPost = $derived(data.featuredPost)

    const editorsPicks = EDITOR_PICKS
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
            <a href={resolve('/portfolio')} class="accent-link-plain"
                >View all Photographs →</a
            >
        </div>
        <h2 class="section-headline">Featured Images</h2>
        <div class="gallery-wrapper">
            <HomepageGallery {images} />
        </div>
    </section>

    <!-- Journal -->
    <section class="page-section journal-section">
        <div class="journal-heading">From My Journal</div>
        <div class="journal-grid">
            <div class="journal-featured">
                <JournalEntry post={featuredPost} featured />
            </div>
            <div class="journal-recent">
                <div class="journal-recent-heading">Featured Entries</div>
                {#each editorsPicks as pick (pick.slug)}
                    <div class="editors-pick-entry">
                        <h3 class="pick-title">
                            <a
                                href={resolve('/journal/[slug]', {
                                    slug: pick.slug,
                                })}>{pick.title}</a
                            >
                        </h3>
                        <p class="pick-desc">{pick.description}</p>
                    </div>
                {/each}
                <a
                    href={resolve('/journal')}
                    class="accent-link-plain journal-view-all"
                    >View All Entries →</a
                >
            </div>
        </div>
    </section>

    <!-- Currently -->
    <section class="page-section currently-section">
        <div class="section-header">
            <span class="section-label">Currently</span>
        </div>
        <div class="currently">
            <div class="currently-item">
                <div class="c-icon">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M10 2a5 5 0 0 1 3.5 8.5l-.5.5V14h-6v-3l-.5-.5A5 5 0 0 1 10 2Z"
                        />
                        <line x1="7.5" y1="15.5" x2="12.5" y2="15.5" />
                        <line x1="8.5" y1="17.5" x2="11.5" y2="17.5" />
                    </svg>
                </div>
                <div class="c-label">Learning</div>
                <div class="c-value">Retrieval-Augmented Generation (RAG)</div>
            </div>
            <div class="currently-item">
                <div class="c-icon">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M2 5c0 0 3.5-1.5 8-1.5S18 5 18 5v10c0 0-3.5-1-8-1s-8 1-8 1V5Z"
                        />
                        <line x1="10" y1="3.5" x2="10" y2="14" />
                    </svg>
                </div>
                <div class="c-label">Reading</div>
                <div class="c-value">
                    <i>{CURRENTLY_READING.title}</i> by {CURRENTLY_READING.author}
                </div>
            </div>
            <div class="currently-item">
                <div class="c-icon">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="10" cy="10" r="7.5" />
                        <polyline points="10,3 11.5,10 10,14 8.5,10 10,3" />
                        <line x1="10" y1="2" x2="10" y2="3.5" />
                        <line x1="10" y1="16.5" x2="10" y2="18" />
                    </svg>
                </div>
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
                    writer based in British Columbia. This website is where I
                    collect photographs and share observations about technology,
                    the outdoors, and everyday life.
                </p>
                <a
                    href={resolve('/about')}
                    class="accent-link"
                    style="margin-top: var(--s-1); display: inline-block"
                    ><span>Learn more</span> →</a
                >
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
                ellipse 160% 130% at -10% 100%,
                black 0%,
                black 30%,
                transparent 70%
            );
            -webkit-mask-image: radial-gradient(
                ellipse 160% 130% at -10% 100%,
                black 0%,
                black 30%,
                transparent 70%
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
                ellipse 160% 130% at -10% 100%,
                var(--background-color) 0%,
                var(--background-color-transparent) 55%,
                transparent 80%
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
            max(var(--s1), calc((100% - #{$breakpoint-xl}) / 2)) 80px;

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
        font-size: clamp(
            var(--text-display),
            5vw,
            calc(var(--text-display) * 1.5)
        );
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
        font-size: var(--text-base);
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

    .section-headline {
        font-family: var(--font-serif);
        font-size: clamp(var(--text-xl), 3vw, var(--text-2xl));
        font-weight: normal;
        color: var(--high-contrast-color);
        margin: var(--s-1) 0 var(--s1);
        line-height: 1.15;
    }

    .gallery-wrapper {
        margin-top: 0;
    }

    /* Journal */
    .journal-heading {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--accent);
        margin-bottom: var(--s2);
    }

    .journal-grid {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: var(--s3);
        align-items: start;

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
            gap: var(--s2);
        }
    }

    .journal-recent {
        display: flex;
        flex-direction: column;
        border-left: 1px solid var(--light-grey);
        padding-left: var(--s2);

        @include for-tablet-portrait-down {
            border-left: none;
            padding-left: 0;
        }
    }

    .journal-recent-heading {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--medium-grey);
        margin-bottom: var(--s1);
    }

    .editors-pick-entry {
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);

        & + & {
            padding-top: var(--s0);
        }

        &:last-of-type {
            border-bottom: none;
            padding-bottom: 0;
        }
    }

    .pick-title {
        margin: 0;
        font-size: var(--text-xl);
        line-height: 1.2;
        font-variant-numeric: lining-nums;
        font-feature-settings: 'lnum' 1;

        a {
            color: var(--high-contrast-color);
            text-decoration: none;
            transition: none;

            &:hover {
                text-decoration: underline;
                text-decoration-color: var(--accent);
                text-decoration-thickness: 2px;
                text-underline-offset: 4px;
            }

            &:focus-visible {
                outline: 2px solid var(--link-color);
                outline-offset: 2px;
            }
        }
    }

    .pick-desc {
        margin: 0;
        font-size: var(--text-base);
        color: var(--text-color);
        line-height: 1.5;
    }

    .journal-view-all {
        display: inline-block;
        margin-top: var(--s1);
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: var(--s-4);
    }

    .c-value {
        font-size: var(--text-base);
        color: var(--high-contrast-color);
        line-height: 1.6;
    }

    /* Currently */
    .currently-section {
        border-top: 1px solid var(--light-grey);
    }

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

    .currently-item + .currently-item {
        border-left: 1px solid var(--light-grey);
        padding-left: var(--s2);

        @include for-tablet-portrait-down {
            border-left: none;
            padding-left: 0;
        }
    }

    .c-icon {
        color: var(--medium-grey);
        margin-bottom: var(--s-2);
        line-height: 0;
    }

    .c-label {
        font-family: var(--font-serif);
        font-size: var(--text-xl);
        font-weight: normal;
        color: var(--high-contrast-color);
        margin-bottom: var(--s-2);
    }

    /* About */
    .about-section {
        border-top: 1px solid var(--light-grey);
    }

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
        font-size: var(--text-base);
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
