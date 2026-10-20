<script>
    import SEO from '#lib/components/base/SEO.svelte'
    import Interests from '#lib/components/misc/Interests.svelte'
    import StaticPicture from '#lib/components/images/StaticPicture.svelte'
    import { portraitPicture } from '#lib/utils/images/static.js'
    import { mountPhotoSwipe } from '#lib/components/images/mountPhotoSwipe.js'

    $effect(() => {
        let lightbox
        let cancelled = false

        mountPhotoSwipe('.about .portrait, .about .portrait-inline').then(
            (instance) => {
                if (cancelled) instance.destroy()
                else lightbox = instance
            }
        )

        return () => {
            cancelled = true
            lightbox?.destroy()
        }
    })
</script>

<SEO
    title="About"
    description="Russell McWhae is a web developer, photographer, and outdoor adventurer."
/>

<div class="about restricted-width">
    <header class="page-header">
        <h1>About Me</h1>
        <p class="lede">
            Developer, photographer, writer, and lifelong outdoor adventurer.
        </p>
    </header>

    <div class="split">
        <article class="main">
            <figure class="portrait-inline">
                <a
                    href="/portrait/portrait-2048.jpg"
                    data-pswp-width="2048"
                    data-pswp-height="1536"
                >
                    <StaticPicture {...portraitPicture} alt="Russell McWhae" />
                </a>
            </figure>
            <div class="flow">
                <p>
                    I grew up in Calgary, Alberta, exploring the Canadian Rocky
                    Mountains. Those early adventures sparked a lifelong passion
                    for the outdoors—on foot, two wheels, skis, and, later,
                    surfboards.
                </p>
                <p>
                    At the same time, I was dabbling in web development. In the
                    early 2000s, that meant drafting mockups in Photoshop,
                    slicing them into HTML tables, and building custom WordPress
                    themes.
                </p>
                <p>
                    As my outdoor experience grew, I ventured deeper into the
                    backcountry and started bringing a camera to capture what I
                    saw. This evolved into my preferred style of photography:
                    expansive natural landscapes, often found deep in the
                    mountains.
                </p>
                <p>
                    My professional path, like so many of my outdoor adventures,
                    took a few unexpected turns. In 2011, I graduated with a
                    degree in civil engineering from the University of Alberta
                    and worked as a structural engineer-in-training for just
                    over three years. Following a layoff, I returned to school
                    and earned an MSc in biomedical engineering from the
                    University of Calgary in 2019. My thesis, “<a
                        href="https://prism.ucalgary.ca/handle/1880/109915"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        >Intercellular Gap Junction Communication in the Bovine
                        Annulus Fibrosus</a
                    >,” investigated cell-cell signalling in the intervertebral
                    disc.
                </p>
                <p>
                    After years of career uncertainty, I decided to embrace my
                    inner coder and enrolled in the Lighthouse Labs web
                    development boot camp in 2019 (see <a
                        href="/journal/my-journey-into-tech"
                        >My Journey into Tech</a
                    >). That high-school hobby has since become my full-time
                    career—and one I truly enjoy. Technology combines many of
                    the things that have always appealed to me: logical
                    problem-solving, visual design, and the satisfaction of
                    turning ideas into reality.
                </p>
                <p>
                    That career pivot, combined with my love of the outdoors,
                    brought me to Revelstoke in 2020, where I spent five years.
                    (See my journal for some more detailed reflections:
                    <a href="/journal/a-new-chapter">A New Chapter</a>, and
                    <a href="/journal/11-months-later">11 Months Later</a>.) In
                    2025, I moved farther west to the coast of British Columbia.
                </p>
                <p>
                    This website is my creative outlet—a place to share the
                    world as I see it through photographs and words. Thanks for
                    stopping by my quiet corner of a busy internet.
                </p>
            </div>
        </article>

        <aside class="sidebar">
            <figure class="portrait">
                <a
                    href="/portrait/portrait-2048.jpg"
                    data-pswp-width="2048"
                    data-pswp-height="1536"
                >
                    <StaticPicture
                        {...portraitPicture}
                        alt="Russell McWhae"
                        loading="lazy"
                    />
                </a>
            </figure>
            <Interests
                heading="My work"
                items={[
                    { href: '/photography', title: 'Photography' },
                    { href: '/journal', title: 'Journal' },
                    {
                        href: 'https://github.com/rmcwhae',
                        title: 'GitHub',
                        external: true,
                    },
                ]}
            />
            <Interests />
        </aside>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .about {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .split {
        display: flex;
        flex-direction: column;
    }

    .main {
        order: 1;
        margin: 0;
        min-width: 0;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        gap: var(--s2);
        order: 2;
        min-width: 0;
        margin-top: var(--s3);
    }

    .portrait,
    .portrait-inline {
        margin: 0;
    }

    .portrait {
        display: none;
    }

    .portrait a,
    .portrait-inline a {
        display: block;
        cursor: pointer;
        text-decoration: none;
    }

    .portrait a:hover,
    .portrait-inline a:hover {
        text-decoration: none;
    }

    .portrait :global(picture),
    .portrait-inline :global(picture),
    .portrait :global(img),
    .portrait-inline :global(img) {
        display: block;
        width: 100%;
        height: auto;
    }

    .portrait-inline {
        float: right;
        width: clamp(6.75rem, 28%, 9rem);
        margin: 0.15rem 0 0.35rem 1rem;
    }

    @include for-tablet-wide-up {
        .page-header {
            margin-bottom: var(--s2);
        }

        .split {
            display: grid;
            grid-template-columns: minmax(0, 2.75fr) minmax(0, 1.25fr);
            align-items: start;
        }

        .sidebar,
        .main {
            order: 0;
        }

        .main {
            grid-column: 1;
            grid-row: 1;
            padding-inline-end: var(--s2);
        }

        .sidebar {
            display: flex;
            flex-direction: column;
            gap: var(--s2);
            grid-column: 2;
            grid-row: 1;
            margin-top: 0;
            padding-inline-start: var(--s2);
        }

        .portrait-inline {
            display: none;
        }

        .portrait {
            display: block;
        }
    }
</style>
