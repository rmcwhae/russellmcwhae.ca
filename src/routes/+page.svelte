<script>
    import Image from 'svimg/Image.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import ButtonSet from '$lib/components/buttons/ButtonSet.svelte'
    import JournalEntrySet from '$lib/components/journal/EntrySet.svelte'

    let { data } = $props();

    let images = $derived(data.images)
    let latestPosts = $derived(data.latestPosts)

    const etCetera = [
        {
            href: 'reading-list',
            title: 'Reading List',
            description: 'Books I have read',
        },
        {
            href: 'uses',
            title: 'What I use',
            description: 'Tools used in my work',
        },
        {
            href: 'videos',
            title: 'Outdoor Videos',
            description: 'A list of my favourite outdoor videos',
        },
        {
            href: 'ski-footage',
            title: 'Skiing GoPro Footage',
            description: 'Some backcountry skiing GoPro footage',
        },
    ]
</script>

<SEO />

<div class="home restricted-width">
    <div class="hero border-bottom">
        <div class="mb-2">
            <h1>Hi, I’m Russell.</h1>
            <p class="big mt-2 mb-2 char-limit">
                I’m a web developer with a background in structural engineering
                and biomedical research who likes spending <span class="nowrap"
                    >time outside.</span
                >
            </p>
            <Button href="#about" text="About me" right />
        </div>

        <div class="portrait">
            <Image src="/russell.png" alt="Russell portrait" />
        </div>
    </div>

    <div class="boxes">
        <div>
            <a
                href="photography"
                class="hover-underline-animation"
                data-sveltekit-prefetch
                ><span
                    >see my <h3>photos</h3></span
                ></a
            >
        </div>
        <div>
            <a
                href="calendars"
                data-sveltekit-prefetch
                class="hover-underline-animation"
                ><span
                    >preview my <h3>calendars</h3></span
                ></a
            >
        </div>
        <div>
            <a
                href="projects"
                data-sveltekit-prefetch
                class="hover-underline-animation"
                ><span
                    >check out my <h3>projects</h3></span
                ></a
            >
        </div>
        <div>
            <a
                href="journal"
                data-sveltekit-prefetch
                class="hover-underline-animation"
                ><span
                    >read my <h3>journal</h3></span
                ></a
            >
        </div>
    </div>

    <h2>Photos</h2>

    <p class="mb-3">Here are a few of my all-time favourites.</p>
</div>

<Gallery {images} />

<div class="mt-3 mb-5">
    <ButtonSet>
        <Button href="photography" text="Portfolio" right />
        <Button href="events" text="Events" right />
    </ButtonSet>
</div>

<div class="restricted-width">
    <h2 id="about">About Me</h2>

    <div class="two-col-grid">
        <div class="flow">
            <p>
                Growing up in Calgary, Alberta, Canada I spent time mountain
                biking, hiking and downhill skiing in the Canadian Rocky
                Mountains. My interest in outdoor pursuits has continually
                increased and now includes backcountry skiing and basic
                mountaineering. As my outdoor experience grew, I began to
                venture further into the backcountry and started bringing a
                camera to share my experiences in hard-to-reach places. This has
                become my preferred style of photography: finding awe-inspiring
                landscapes, frequently far and high in the mountains.
            </p>
            <p>
                Similar to photography, graphic design—especially web
                design—requires a keen technical understanding. Coding has
                always come naturally to me, but it is the combination of the
                logic of coding and the creative side of design that makes the
                web a rewarding medium to design for. I cut my teeth back in the
                days of Internet Explorer 6 and have kept up with the evolution
                of the web over the years.
            </p>
        </div>
        <div class="flow">
            <p>
                Photography and design are complementary skills. Design
                principles provide an expanded tool kit to use in photography.
                Similarly, being able to take photos allows me to readily
                incorporate them into my design work.
            </p>
            <p>
                Professionally, I have had a few different careers. In 2011, I
                graduated from civil engineering at the University of Alberta
                and worked as a structural engineer-in-training for just over
                three years. In early 2019, I earned an MSc. in biomedical
                engineering from the University of Calgary. My thesis, “<a
                    href="https://prism.ucalgary.ca/handle/1880/109915"
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    >Intercellular Gap Junction Communication in the Bovine
                    Annulus Fibrosus</a
                >,” investigated cell-cell signaling in the intervertebral disc.
            </p>
            <p>
                Wanting to further my coding skills, I took the <a
                    href="https://www.lighthouselabs.ca"
                    target="_blank"
                    rel="noopener noreferrer nofollow">Lighthouse Labs</a
                > web development boot camp course from July to October 2019. I now
                work as a web developer, specializing in front-end work.
            </p>
        </div>
    </div>

    <h2 class="mt-5 mb-3">Latest Journal Entries</h2>

    <JournalEntrySet posts={latestPosts} />

    <div class="mt-3 mb-5">
        <ButtonSet>
            <Button href="/journal" text="All entries" right />
        </ButtonSet>
    </div>

    <h2>Et Cetera</h2>

    <p class="mb-3">A few bits of content that had nowhere else to go.</p>

    <JournalEntrySet posts={etCetera} />
</div>

<style lang="scss">
    @use '../lib/scss/breakpoints' as *;
    .home {
        margin-top: var(--s1);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .hero {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--s1);

        @include for-tablet-portrait-down {
            grid-template-columns: 2fr 1fr;
        }
        @include for-phone-only {
            grid-template-columns: 1fr;
        }
    }
    .portrait {
        margin-top: auto;
        @include for-tablet-portrait-down {
            width: 50vw;
        }
        @include for-phone-only {
            margin-left: auto;
            margin-top: -100px;
        }
    }
    .boxes {
        margin: var(--s4) auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--s0);
    }
    .boxes a {
        text-decoration: none;
        font-weight: 400;
        display: block;
        padding: var(--s-1) var(--s3) var(--s-3) 0;
    }

    .boxes a h3 {
        margin-bottom: 0;
        line-height: 1.1;
    }
    .boxes a:hover {
        text-decoration: none;
    }
</style>
