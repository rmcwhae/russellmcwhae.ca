<script>
    import SEO from '$lib/components/SEO.svelte'
    import Collage from '$static/collage.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'
</script>

<SEO />

<h1>Hi, I’m Russell.</h1>

<div class="grid">
    <div class="box1">
        <p>
            I’m a front end–biased web developer with a background in structural
            engineering and biomedical research who likes spending time outside.
            <span class="sub nowrap"
                ><a href="#about">More About Me <RightChevron /></a></span
            >
        </p>
    </div>
    <div class="box2">
        <a href="photography" class="big"
            >view my <h3>Photos</h3></a
        >
    </div>
    <div class="box3">
        <a href="calendars" class="big"
            >preview my <h3>Calendars</h3></a
        >
    </div>
    <div class="box4">
        <a href="projects" class="big"
            >check out my <h3>Projects</h3></a
        >
    </div>
    <div class="box5">
        <a href="journal" class="big"
            >read my <h3>Journal</h3></a
        >
    </div>
</div>

<h2>Photos</h2>

<img srcset={Collage} alt="Photo Collage" class="full-bleed" />

<h2 id="about">About Me</h2>

<div class="two-col">
    <p>
        Growing up in Calgary, Alberta, Canada I spent time mountain biking,
        hiking and downhill skiing in the Canadian Rocky Mountains. My interest
        in outdoor pursuits has continually increased and now includes
        backcountry skiing and basic mountaineering. As my outdoor experience
        grew, I began to venture further into the backcountry and started
        bringing a camera to share my experiences in hard-to-reach places. This
        has become my preferred style of photography: finding awe-inspiring
        landscapes, frequently far and high in the mountains.
    </p>
    <p>
        Similar to photography, graphic design—especially web design—requires a
        keen technical understanding. Coding has always come naturally to me,
        but it is the combination of the logic of coding and the creative side
        of design that makes the web a rewarding medium to design for. I cut my
        teeth back in the days of Internet Explorer 6 and have kept up with the
        evolution of the web over the years.
    </p>
    <p>
        Photography and design are complementary skills. Design principles
        provide an expanded tool kit to use in photography. Similarly, being
        able to take photos allows me to readily incorporate them into my design
        work.
    </p>
    <p>
        Professionally, I have bounced around a few different careers. TODO I
        completed an undergraduate degree in civil engineering, graduating from
        the University of Alberta in 2011, and worked as a structural
        engineer-in-training for just over three years. In early 2019, I earned
        an MSc. in biomedical engineering from the University of Calgary. My
        thesis, “<a
            href="https://prism.ucalgary.ca/handle/1880/109915"
            rel="nofollow"
            >Intercellular Gap Junction Communication in the Bovine Annulus
            Fibrosus</a
        >,” investigated cell-cell signaling in the intervertebral disc.
    </p>
    <p>
        Wanting to further my coding skills, I took the <a
            href="https://www.lighthouselabs.ca"
            rel="nofollow">Lighthouse Labs</a
        > web development boot camp course from July to October 2019. I have now
        been working as a web developer, specializing in front-end work, out of Revelstoke,
        BC.
    </p>
    <p>
        View my <a href="/pdf/mcwhae_russell_resume.pdf" target="_blank"
            >current résumé</a
        >, or check out my
        <a href="https://www.linkedin.com/in/rmcwhae/" rel="nofollow"
            >LinkedIn profile</a
        >.
    </p>
</div>

<style>
    .big {
        display: block;
    }
    a {
        text-decoration: none;
    }
    .grid {
        margin: var(--s2) 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: var(--s2);
    }
    .grid div {
        padding-bottom: var(--s-2);
        border-bottom: 1px solid var(--light-grey);
    }
    p {
        margin-top: 0;
    }
    h3 {
        /* font-size: 1.2em; */
        margin-top: 0;
        line-height: 1em;
    }
    .box1 {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .box2 {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
    }
    .box3 {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 2;
    }
    .box4 {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;
    }
    .box5 {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 3;
    }
    @media (max-width: 1023px) {
        .wrapper {
            margin-top: var(--s2);
        }
    }
    @media (max-width: 599px) {
        h1 {
            text-align: center;
        }

        .grid {
            grid-gap: var(--s1);
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: minmax(40px, 1fr);
        }
        .box1 {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
        }
        .box2 {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 2;
            grid-row-end: 3;
        }
        .box3 {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
        }
        .box4 {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 3;
            grid-row-end: 4;
        }
        .box5 {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 3;
            grid-row-end: 4;
        }
    }
</style>
