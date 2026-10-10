<script>
    import SEO from '#lib/components/base/SEO.svelte'
    import Interests from '#lib/components/misc/Interests.svelte'
</script>

<SEO
    title="About"
    description="Russell McWhae is a web developer, photographer, and outdoor adventurer."
/>

<div class="about-layout">
    <header>
        <h1>About Me</h1>
        <p class="lede">
            Developer, photographer, writer, and lifelong outdoor adventurer.
        </p>
    </header>
    <article class="about">
        <figure class="portrait-inline">
            <img
                src="/portrait.jpeg"
                alt="Russell McWhae"
                width="3088"
                height="2316"
                decoding="async"
            />
        </figure>
        <div class="char-limit flow">
            <p>
                I grew up in Calgary, Alberta, exploring the Canadian Rocky
                Mountains. Those early adventures sparked a lifelong passion for
                the outdoors—on foot, two wheels, skis, and, later, surfboards.
            </p>
            <p>
                At the same time, I was dabbling in web development. In the
                early 2000s, that meant drafting mockups in Photoshop, slicing
                them into HTML tables, and building custom WordPress themes.
                (Shoutout to any developers who remember battling Internet
                Explorer 6 to get a webpage to render correctly.)
            </p>
            <p>
                As my outdoor experience grew, I ventured deeper into the
                backcountry and started bringing a camera to capture what I saw.
                This evolved into my preferred style of photography: expansive
                natural landscapes, often found deep in the mountains.
            </p>
            <p>
                My professional path, like so many of my outdoor adventures,
                took a few unexpected turns. In 2011, I graduated with a degree
                in civil engineering from the University of Alberta and worked
                as a structural engineer-in-training for just over three years.
                Following a layoff, I returned to school and earned an MSc in
                biomedical engineering from the University of Calgary in 2019.
                My thesis, “<a
                    href="https://prism.ucalgary.ca/handle/1880/109915"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    >Intercellular Gap Junction Communication in the Bovine
                    Annulus Fibrosus</a
                >,” investigated cell-cell signalling in the intervertebral
                disc.
            </p>
            <p>
                After years of career uncertainty, I decided to embrace my inner
                coder and enrolled in the Lighthouse Labs web development boot
                camp in 2019 (see <a href="/journal/my-journey-into-tech"
                    >My Journey into Tech</a
                >). That high-school hobby has since become my full-time
                career—and one I truly enjoy. Technology combines many of the
                things that have always appealed to me: logical problem-solving,
                visual design, and the satisfaction of turning ideas into
                reality.
            </p>
            <p>
                That career pivot, combined with my love of the outdoors,
                brought me to Revelstoke in 2020, where I spent five years. (See
                my journal for some more detailed reflections:
                <a href="/journal/a-new-chapter">A New Chapter</a>, and
                <a href="/journal/11-months-later">11 Months Later</a>.) In
                2025, I moved farther west to the coast of British Columbia.
            </p>
            <p>
                This website is my creative outlet—a place to share the world as
                I see it through photographs and words. Thanks for stopping by
                my quiet corner of a busy internet.
            </p>
        </div>
    </article>
    <aside class="rail">
        <figure class="portrait">
            <img
                src="/portrait.jpeg"
                alt="Russell McWhae"
                width="3088"
                height="2316"
                decoding="async"
            />
        </figure>
        <Interests
            heading="My work"
            arrow
            items={[
                { href: '/photography', title: 'Photography' },
                { href: '/journal', title: 'Journal' },
            ]}
        />
        <Interests />
    </aside>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .about-layout {
        display: grid;
        gap: var(--s3);
        align-items: start;
    }

    .about {
        margin: 0;
        min-width: 0;
    }

    h1 {
        max-width: 28ch;
        margin-top: 0;
    }

    .portrait,
    .portrait-inline {
        margin: 0;
    }

    .portrait {
        display: none;
    }

    .portrait img {
        display: block;
        width: 100%;
        height: auto;
    }

    .portrait-inline {
        float: right;
        width: clamp(6.75rem, 28%, 9rem);
        margin: 0.15rem 0 0.35rem 1rem;
    }

    .portrait-inline img {
        display: block;
        width: 100%;
        height: auto;
    }

    .rail {
        display: contents;
        min-width: 0;
    }

    header {
        order: 1;
    }

    .portrait {
        order: 2;
    }

    .about {
        order: 3;
    }

    .rail > :global(.interests-block) {
        order: 4;
    }

    .rail :global(ul.interests) {
        margin-top: var(--s-1);
    }

    @include for-desktop-up {
        .about-layout {
            width: fit-content;
            max-width: 100%;
            grid-template-columns: minmax(0, var(--measure)) minmax(
                    16rem,
                    18rem
                );
            grid-template-areas:
                'title title'
                'copy rail';
            column-gap: var(--s3);
            justify-content: start;
        }

        header,
        .about,
        .portrait,
        .rail > :global(.interests-block) {
            order: 0;
        }

        header {
            grid-area: title;
        }

        .about {
            grid-area: copy;
        }

        .portrait-inline {
            display: none;
        }

        .portrait {
            display: block;
        }

        .portrait img {
            height: auto;
        }

        .rail {
            display: flex;
            flex-direction: column;
            gap: var(--s2);
            grid-area: rail;
        }
    }
</style>
