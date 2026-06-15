<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import HomepageGallery from '$lib/components/images/HomepageGallery.svelte'
    import { buildURL } from '$lib/utils/images'
    import dateformat from 'dateformat'

    let { data } = $props()

    let images = $derived(data.images)
    let latestPosts = $derived(data.latestPosts)

    const heroPath = '/portfolio/RMCWHAE-20210109-DSC03461-Edit_ZSrW1OfjYN.jpg'
    const heroSrc = buildURL(heroPath, { width: 1400 })
    const heroSrcset = [700, 1000, 1400, 1800]
        .map((w) => `${buildURL(heroPath, { width: w })} ${w}w`)
        .join(', ')
</script>

<SEO />

<!-- Hero: full-bleed outside .home so full-width class reaches viewport edges -->
<section class="hero full-width">
    <div class="hero-image-bg">
        <img
            src={heroSrc}
            srcset={heroSrcset}
            sizes="(max-width: 700px) 700px, (max-width: 1000px) 1000px, (max-width: 1400px) 1400px, 1800px"
            alt="Mountain landscape"
            loading="eager"
        />
    </div>
    <div class="hero-gradient"></div>
    <div class="hero-inner">
        <div class="hero-text">
            <div class="kicker">My creative outlet</div>
            <h1>A quiet eye<br />in a loud world.</h1>
            <p class="lead">
                Images and writing from the trails, the desk, and the spaces in
                between.
            </p>
            <div class="hero-links">
                <a href="/photography"><span>Explore my Photography</span> →</a>
                <a href="/journal"><span>Read my Journal</span> →</a>
            </div>
        </div>
    </div>
</section>

<div class="home">
    <!-- Photography -->
    <section class="page-section">
        <div class="section-header">
            <span class="section-label">Photography</span>
            <a href="/photography" class="view-all">View all →</a>
        </div>
        <p class="section-desc">Some of my all-time favourite images.</p>
        <HomepageGallery {images} />
    </section>

    <!-- Journal -->
    <section class="page-section">
        <div class="section-header">
            <span class="section-label">Journal</span>
            <a href="/journal" class="view-all">View all →</a>
        </div>
        <p class="section-desc">
            Writing about technology, the outdoors, and life.
        </p>
        <div class="journal-list">
            {#each latestPosts as post (post.slug)}
                <article>
                    <div class="journal-date">
                        {dateformat(post.date, 'UTC:mmm yyyy')}
                    </div>
                    <a href="/journal/{post.slug}">{post.title}</a>
                </article>
            {/each}
        </div>
    </section>

    <!-- Explore Topics -->
    <section class="page-section">
        <div class="section-header">
            <span class="section-label">Explore Topics</span>
        </div>
        <div class="topics">
            <div class="topic">
                <h3>Technology</h3>
                <p>Personal tech and software development.</p>
                <a href="/journal/category/tech" class="topic-link">Browse →</a>
            </div>
            <div class="topic">
                <h3>Outdoors</h3>
                <p>Musings from wandering in the wild.</p>
                <a href="/journal/category/outdoor" class="topic-link"
                    >Browse →</a
                >
            </div>
            <div class="topic">
                <h3>Reflections</h3>
                <p>Long-form personal writing.</p>
                <a href="/journal/category/personal" class="topic-link"
                    >Browse →</a
                >
            </div>
        </div>
    </section>

    <!-- Currently -->
    <section class="page-section">
        <div class="section-header">
            <span class="section-label">Currently</span>
        </div>
        <div class="currently">
            <div class="currently-item">
                <div class="c-label">Building</div>
                <div class="c-value">A redesign of this website</div>
            </div>
            <div class="currently-item">
                <div class="c-label">Reading</div>
                <div class="c-value">The Spirit-Controlled Temperament</div>
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
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 var(--s1);

        @include for-phone-only {
            padding: 0 var(--s0);
        }
    }

    /* Hero */
    .hero {
        position: relative;
        overflow: hidden;
        min-height: 680px;
        display: flex;
        align-items: center;
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

    .hero-gradient {
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(
            to right,
            var(--background-color) 0%,
            var(--background-color) 33%,
            var(--background-color-transparent) 44%,
            transparent 55%
        );

        @include for-tablet-portrait-down {
            background: linear-gradient(
                to top,
                var(--background-color) 0%,
                var(--background-color) 28%,
                var(--background-color-transparent) 52%,
                transparent 78%
            );
        }
    }

    .hero-inner {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 80px var(--s2);

        @include for-tablet-portrait-down {
            padding: 48px var(--s1) 64px;
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
            margin-top: 18px;
        }
    }

    .lead {
        font-size: 16px;
        line-height: 1.7;
        color: var(--text-color);
        max-width: 36ch;
        margin: 0;
    }

    .hero-links {
        display: flex;
        flex-direction: column;
        gap: 16px;
        font-family: var(--font-sans);
        font-size: 12px;
        letter-spacing: 0.1em;

        a {
            color: var(--high-contrast-color);
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;

            span {
                text-decoration: underline;
                text-decoration-color: var(--accent);
                text-decoration-thickness: 3px;
                text-underline-offset: 5px;
            }

            &:hover {
                color: var(--accent);

                span {
                    text-decoration-color: var(--accent);
                }
            }
        }
    }

    /* Sections */
    .page-section {
        padding: 64px 0;
        border-top: 1px solid var(--light-grey);
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 6px;
    }

    .section-desc {
        font-size: 15px;
        color: var(--text-color);
        margin: 0 0 var(--s1);
    }

    .view-all {
        font-family: var(--font-sans);
        font-size: 12px;
        letter-spacing: 0.05em;
        color: var(--medium-grey);

        &:hover {
            color: var(--high-contrast-color);
        }
    }

    /* Journal list */
    .journal-list article {
        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 24px;
        align-items: baseline;
        padding: 16px 0;
        border-bottom: 1px solid var(--light-grey);

        a {
            font-size: 15px;
            color: var(--high-contrast-color);
            text-decoration: underline;
            text-decoration-color: var(--accent);
            text-decoration-thickness: 3px;
            text-underline-offset: 4px;

            &:hover {
                color: var(--link-color);
                text-decoration-color: var(--link-color);
            }
        }
    }

    .journal-date {
        font-family: var(--font-sans);
        font-size: 12px;
        color: var(--medium-grey);
        letter-spacing: 0.03em;
        white-space: nowrap;
    }

    /* Explore Topics */
    .topics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--s2);
        margin-top: var(--s1);

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
            gap: var(--s1);
        }
    }

    .topic h3 {
        font-family: var(--font-sans);
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.03em;
        margin-bottom: var(--s-2);
        margin-top: 0;
    }

    .topic p {
        font-size: 14px;
        color: var(--text-color);
        line-height: 1.6;
        margin: 0 0 var(--s-2);
    }

    .topic-link {
        font-family: var(--font-sans);
        font-size: 12px;
        color: var(--medium-grey);

        &:hover {
            color: var(--high-contrast-color);
        }
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
        font-family: var(--font-sans);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--medium-grey);
        margin-bottom: var(--s-2);
    }

    .c-value {
        font-size: 16px;
        color: var(--high-contrast-color);
    }

    /* About */
    .about-grid {
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 56px;
        align-items: start;

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
            gap: var(--s2);
        }
    }

    .about-text p {
        font-size: 15px;
        line-height: 1.75;
        color: var(--text-color);
        max-width: 52ch;
        margin-bottom: var(--s0);
    }
</style>
