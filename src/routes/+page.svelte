<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import HomepageGallery from '$lib/components/images/HomepageGallery.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'
    let { data } = $props()

    let images = $derived(data.images)
    let latestPosts = $derived(data.latestPosts)
</script>

<SEO />

<!-- Hero: full-bleed outside .home so full-width class reaches viewport edges -->
<section class="hero full-width">
    <div class="hero-image-bg">
        <img src="/hero.jpg" alt="Hero" loading="eager" />
    </div>
    <div class="hero-blur"></div>
    <div class="hero-gradient"></div>
    <div class="hero-inner">
        <div class="hero-text">
            <!-- <div class="kicker">My creative outlet</div> -->
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
            <a href="/photography" class="view-all"><span>View all</span> →</a>
        </div>
        <p class="section-desc">Some of my all-time favourite images.</p>
        <HomepageGallery {images} />
    </section>

    <!-- Journal -->
    <section class="page-section">
        <div class="section-header">
            <span class="section-label">Journal</span>
            <a href="/journal" class="view-all"><span>View all</span> →</a>
        </div>
        <p class="section-desc">
            Writing about technology, the outdoors, and life.
        </p>
        <JournalEntrySet posts={latestPosts} />
    </section>

    <!-- Explore Topics -->
    <section class="page-section" style="border-top: none; padding-top: var(--s1)">
        <div class="section-header">
            <span class="section-label">Explore Topics</span>
        </div>
        <div class="topics">
            <div class="topic">
                <div class="topic-icon" aria-hidden="true">
                    <img src="/icons/tech.png" alt="" />
                </div>
                <h3>Technology</h3>
                <p>Personal tech and software development.</p>
                <a href="/journal/category/Tech" class="topic-link"
                    ><span>Explore</span> →</a
                >
            </div>
            <div class="topic">
                <div class="topic-icon" aria-hidden="true">
                    <img src="/icons/outdoor.png" alt="" />
                </div>
                <h3>Outdoor</h3>
                <p>Musings from wandering in the wild.</p>
                <a href="/journal/category/Outdoor" class="topic-link"
                    ><span>Explore</span> →</a
                >
            </div>
            <div class="topic">
                <div class="topic-icon" aria-hidden="true">
                    <img src="/icons/reflection.png" alt="" />
                </div>
                <h3>Reflections</h3>
                <p>Long-form personal writing.</p>
                <a href="/journal/category/Reflection" class="topic-link"
                    ><span>Explore</span> →</a
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
        max-width: 1400px;
        margin: 0 auto;
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

    .hero-blur {
        position: absolute;
        inset: 0;
        z-index: 1;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        mask-image: linear-gradient(
            to right,
            black 0%,
            black 15%,
            transparent 62%
        );
        -webkit-mask-image: linear-gradient(
            to right,
            black 0%,
            black 15%,
            transparent 62%
        );

        @include for-tablet-portrait-down {
            mask-image: linear-gradient(
                to top,
                black 0%,
                black 28%,
                transparent 55%
            );
            -webkit-mask-image: linear-gradient(
                to top,
                black 0%,
                black 28%,
                transparent 55%
            );
        }
    }

    .hero-gradient {
        position: absolute;
        inset: 0;
        z-index: 2;
        background: linear-gradient(
            to right,
            var(--background-color) 0%,
            var(--background-color) 15%,
            var(--background-color-transparent) 30%,
            transparent 62%
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
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--high-contrast-color);
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

    .topic-icon {
        width: 130px;
        margin-bottom: var(--s-1);

        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }

    /* Invert topic illustrations in dark mode so white backgrounds disappear */
    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light'])) .topic-icon img { filter: invert(1); }
    }
    :global(html body[data-theme='dark']) .topic-icon img { filter: invert(1); }

    .topic h3 {
        font-family: var(--font-serif);
        font-size: 1.4rem;
        font-weight: normal;
        margin-bottom: var(--s-2);
        margin-top: 0;

        &::before {
            content: '';
            display: block;
            width: 40px;
            height: 3px;
            background: var(--accent);
            margin-bottom: var(--s-2);
        }
    }

    .topics .topic:nth-child(1) h3::before { background: #4a7a9e; }
    .topics .topic:nth-child(2) h3::before { background: #5a8f5a; }
    .topics .topic:nth-child(3) h3::before { background: #7a5a9e; }

    @media (prefers-color-scheme: dark) {
        :global(html body:not([data-theme='light'])) .topics .topic:nth-child(1) h3::before { background: #90b8d8; }
        :global(html body:not([data-theme='light'])) .topics .topic:nth-child(2) h3::before { background: #90c890; }
        :global(html body:not([data-theme='light'])) .topics .topic:nth-child(3) h3::before { background: #b890d0; }
    }

    :global(html body[data-theme='dark']) .topics .topic:nth-child(1) h3::before { background: #90b8d8; }
    :global(html body[data-theme='dark']) .topics .topic:nth-child(2) h3::before { background: #90c890; }
    :global(html body[data-theme='dark']) .topics .topic:nth-child(3) h3::before { background: #b890d0; }

    .topic p {
        font-size: 14px;
        color: var(--text-color);
        line-height: 1.6;
        margin: 0 0 var(--s0);
    }

    .topic-link {
        font-family: var(--font-sans);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--high-contrast-color);
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
        font-size: 1.4rem;
        font-weight: normal;
        color: var(--high-contrast-color);
        margin-bottom: var(--s-2);
    }

    .c-value {
        font-size: 16px;
        color: var(--high-contrast-color);
    }

    /* About */
    .about-grid {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 56px;
        align-items: stretch;

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
        font-size: 15px;
        line-height: 1.75;
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
