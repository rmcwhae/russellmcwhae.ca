<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import { resolve } from '$app/paths'
</script>

<SEO
    title="About"
    description="Russell McWhae is a software developer, photographer, and writer based in British Columbia."
/>

<div class="about-page">
    <header class="about-header">
        <div class="section-label">About</div>
        <h1>Russell McWhae</h1>
    </header>

    <div class="about-content">
        <div class="about-body">
            <p class="lead-text">
                I’m a software developer, photographer, and writer based on the
                coast of British Columbia. This site is where I collect
                photographs and share observations about technology, the
                outdoors, and the quieter corners of everyday life.
            </p>

            <h2>Background</h2>
            <p>
                I grew up in Alberta and spent formative years in Calgary and
                Edmonton before the mountains eventually drew me westward. My
                academic path wound through civil engineering at the University
                of Alberta — graduating in 2011 — and later an MSc. in
                biomedical engineering at the University of Calgary, completed
                in early 2019. Neither degree pointed directly at software, but
                both sharpened a way of thinking about complex systems that
                carries over into every project I touch.
            </p>
            <p>
                After finishing my masters, I completed the Lighthouse Labs web
                development boot camp and made the full transition into
                software. I now work as a web developer, spending most of my
                days building tools that help people make better decisions
                outdoors. The work sits at an interesting intersection of public
                safety, data visualization, and modern web technology — a
                combination I find genuinely worthwhile.
            </p>
            <p>
                Outside of screens I'm most at home on a bicycle or on skis,
                preferably somewhere with a long view and no cell service. The
                move to the Vancouver coast opened up a different kind of riding
                than the Rockies offered — gravel roads that drop through forest
                to the ocean, ferry crossings that feel like chapter breaks
                between two different kinds of landscape.
            </p>

            <h2>Photography</h2>
            <p>
                I came to photography gradually, the way most people do — a
                camera carried along on trips until the trips started being
                planned around the camera. Mountains are an obvious subject for
                anyone who spends time in them, but what I find myself drawn to
                is less the dramatic summit shot and more the quality of light
                on an ordinary afternoon, or the way weather moves through a
                valley and changes everything in under an hour.
            </p>
            <p>
                Most of my work is landscape and travel photography, shot across
                western Canada and occasionally further afield. I shoot
                digitally and keep a fairly minimal kit — one body, a small
                collection of primes. The constraint is deliberate. It slows
                things down in a way that usually produces better images and
                definitely produces a better experience of the place itself.
            </p>
            <p>
                You can browse the full archive on the
                <a href={resolve('/photography')}>photography page</a>, where
                images are organized by location and season. The favorites
                section on the homepage rotates periodically as I add new work.
            </p>

            <h2>Writing</h2>
            <p>
                The journal started as a way to think through things in public —
                technology decisions, gear reviews, observations about places
                I'd been. Over time it has become something I take more
                seriously as a craft. Writing forces a different kind of clarity
                than any other medium. You find out quickly whether you actually
                understand something when you try to explain it to a reader who
                wasn't there.
            </p>
            <p>
                The range is wide by design. Some entries are long reads about a
                specific piece of software or a season in the mountains. Others
                are shorter notes that didn't fit anywhere else. I try to write
                things I'd want to read myself, which is probably the only
                editorial standard that consistently works.
            </p>
            <p>
                If you'd like to follow along, the
                <a href={resolve('/journal')}>journal archive</a> has everything from
                the beginning, and recent entries appear on the homepage.
            </p>
        </div>

        <div class="about-portrait">
            <img src="/russell.png" alt="Russell McWhae" />
        </div>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .about-page {
        padding-top: var(--s2);
    }

    .about-header {
        padding-bottom: var(--s2);
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s3);

        h1 {
            margin-top: var(--s-2);
            font-size: clamp(2rem, 4vw, 3.052rem);
            margin-bottom: 0;
        }
    }

    .about-content {
        display: grid;
        grid-template-columns: 1fr 260px;
        gap: var(--s4);
        align-items: start;

        @include for-tablet-portrait-down {
            grid-template-columns: 1fr;
            gap: var(--s2);
        }
    }

    .about-portrait {
        position: sticky;
        top: calc(var(--nav-height) + var(--s1));

        img {
            width: 100%;
            display: block;
            border-radius: var(--radius);
        }

        @include for-tablet-portrait-down {
            position: static;
            max-width: 200px;
        }
    }

    .about-body {
        .lead-text {
            font-size: 1.1rem;
            line-height: 1.65;
            color: var(--high-contrast-color);
            max-width: 58ch;
            margin-bottom: var(--s2);
        }

        p {
            font-size: var(--body-sm);
            line-height: 1.75;
            color: var(--text-color);
            max-width: 65ch;
            margin-bottom: var(--s0);
        }

        h2 {
            margin-top: var(--s2);
            margin-bottom: var(--s-1);
        }

        a {
            color: var(--link-color);
            text-underline-offset: 3px;

            &:hover {
                color: var(--link-color-hover);
            }
        }
    }
</style>
