<script>
    import SEO from '#lib/components/base/SEO.svelte'
</script>

<SEO
    title="About"
    description="Russell McWhae is a web developer, photographer, and outdoor enthusiast based in Calgary."
/>

<article class="about">
    <header>
        <p class="eyebrow">About</p>
        <h1>
            Engineer, researcher, photographer, and lifelong outdoor enthusiast.
        </h1>
    </header>
    <div class="char-limit flow">
        <p>
            Growing up in Calgary, Alberta, Canada I spent time mountain biking,
            hiking and downhill skiing in the Canadian Rocky Mountains. My
            interest in outdoor pursuits has continually increased and now
            includes backcountry skiing and basic mountaineering. As my outdoor
            experience grew, I began to venture further into the backcountry and
            started bringing a camera to share my experiences in hard-to-reach
            places. This has become my preferred style of photography: finding
            awe-inspiring landscapes, frequently far and high in the mountains.
        </p>
        <p>
            Similar to photography, graphic design—especially web
            design—requires a keen technical understanding. Coding has always
            come naturally to me, but it is the combination of the logic of
            coding and the creative side of design that makes the web a
            rewarding medium to design for. I cut my teeth back in the days of
            Internet Explorer 6 and have kept up with the evolution of the web
            over the years.
        </p>
        <p>
            Photography and design are complementary skills. Design principles
            provide an expanded tool kit to use in photography. Similarly, being
            able to take photos allows me to readily incorporate them into my
            design work.
        </p>
        <p>
            Professionally, I have had a few different careers. In 2011, I
            graduated from civil engineering at the University of Alberta and
            worked as a structural engineer-in-training for just over three
            years. In early 2019, I earned an MSc. in biomedical engineering
            from the University of Calgary. My thesis, “<a
                href="https://prism.ucalgary.ca/handle/1880/109915"
                rel="noopener noreferrer nofollow"
                target="_blank"
                >Intercellular Gap Junction Communication in the Bovine Annulus
                Fibrosus</a
            >,” investigated cell-cell signaling in the intervertebral disc.
        </p>
        <p>
            Wanting to further my coding skills, I took the
            <a
                href="https://www.lighthouselabs.ca"
                target="_blank"
                rel="noopener noreferrer nofollow">Lighthouse Labs</a
            >
            web development boot camp course from July to October 2019. I now work
            as a web developer, specializing in front-end work.
        </p>
    </div>
</article>

<style>
    header {
        margin-bottom: var(--s2);
    }

    h1 {
        max-width: 14ch;
        margin-top: 0.6rem;
        font-size: clamp(2.2rem, 4vw, 3.4rem);
    }

    .char-limit {
        max-width: 68ch;
    }
</style>
