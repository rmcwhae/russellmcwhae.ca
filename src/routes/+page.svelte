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

<div class="home">
    <!-- Hero -->
    <section class="hero border-bottom">
        <div class="hero-text">
            <div class="kicker">My creative outlet</div>
            <h1>A quiet eye<br />in a loud world.</h1>
            <p class="lead">
                Photography and writing from a life spent exploring the
                outdoors.
            </p>
            <div class="hero-links">
                <a href="/photography">Explore my Photography →</a>
                <a href="/journal">Read my Journal →</a>
            </div>
        </div>
        <div class="hero-image">
            <img
                src={heroSrc}
                srcset={heroSrcset}
                sizes="(max-width: 700px) 700px, (max-width: 1000px) 1000px, (max-width: 1400px) 1400px, 1800px"
                alt="Mountain landscape"
                loading="eager"
            />
        </div>
    </section>

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
            <div class="portrait">
                <img src="/russell.png" alt="Russell McWhae" />
            </div>
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
                    web developer, specializing in front-end work.
                </p>
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
        display: grid;
        grid-template-columns: 1fr 1.75fr;
        gap: 56px;
        align-items: start;
        padding: 72px 0 72px;
        margin-bottom: 0;

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
            gap: var(--s2);
            padding: var(--s2) 0 var(--s2);
        }
    }

    .hero-text {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        gap: var(--s0);
    }

    .hero-text h1 {
        font-size: clamp(2.8rem, 5vw, 4.5rem);
        line-height: 1.02;
        margin: 0;
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
        gap: 8px;
        font-family: var(--font-sans);
        font-size: 13px;
        letter-spacing: 0.04em;

        a {
            color: var(--high-contrast-color);

            &:hover {
                color: var(--accent);
            }
        }
    }

    .hero-image {
        border-radius: 2px;
        overflow: hidden;

        img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 2px;
            object-fit: cover;
        }

        @include for-tablet-portrait-down {
            max-height: 400px;

            img {
                height: 400px;
                object-fit: cover;
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
            text-decoration: none;

            &:hover {
                color: var(--link-color);
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
        grid-template-columns: 280px 1fr;
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
