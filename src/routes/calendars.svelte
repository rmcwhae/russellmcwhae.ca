<script>
    import Calendar from '$lib/components/Calendar.svelte'

    const calendars = [
        {
            year: 2021,
            filename: '2021calendar.pdf',
            image: '.jpg',
            filesize: 2,
        },
        {
            year: 2020,
            filename: '2020calendar.pdf',
            image: '.jpg',
            filesize: 2,
        },
        {
            year: 2019,
            filename: '2019calendar.pdf',
            image: '.jpg',
            filesize: 2,
        },
        {
            year: 2018,
            filename: '2018calendar.pdf',
            image: '.jpg',
            filesize: 2,
        },
        {
            year: 2017,
            filename: '2017calendar.pdf',
            image: '.jpg',
            filesize: 1,
        },
        {
            year: 2016,
            filename: '2016calendar.pdf',
            image: '.jpg',
            filesize: 7,
        },
        {
            year: 2015,
            filename: '2015calendar.pdf',
            image: '.jpg',
            filesize: 2,
        },
    ]
    const [current, ...rest] = calendars
</script>

<!-- <header>
    <h1>Calendars</h1>
</header> -->

<main
    class="full-bleed"
    style={`background-image: url(static/calendar-images/${current.year}.jpg)`}
>
    <a
        href={'pdf/' + current.filename}
        target="_blank"
        class="shadow"
        rel="noopener noreferrer nofollow"
    >
        <h4>{current.year} Calendar</h4>
        <aside class="uppercase">{current.filesize} MB PDF</aside>
    </a>
</main>

<article class="restricted-width">
    <p>
        Initially created as Christmas gifts for family and friends, these
        calendars are an effort to do more with my photography. It’s hard to
        stand out in the crowded, high-volume world of online photography, so
        printing can be a way to make photography less ephemeral. Calendars
        provide a high-density collection of photographs in an affordable
        physical product.
    </p>
    <p>
        I design the calendars in Adobe Indesign with the <a
            href="http://calendarwizard.sourceforge.net"
            target="_blank"
            rel="noopener noreferrer nofollow">Calendar Wizard</a
        >
        plugin to create the basic table layout before heavy customization. There’s
        a steep learning curve, but the result is highly original. I then send a
        print-ready PDF to
        <a
            href="https://www.dhq.ca"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >Digital Headquarters Imaging Centre</a
        > for printing and binding.
    </p>
</article>

<h2>Previous Calendars</h2>

{#each rest as { filename, year, filesize }}
    <Calendar {filename} {year} {filesize} />
{/each}

<style>
    /* h1 {
        padding-bottom: var(--s2);
    } */
    main {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-top: calc(-1 * var(--s2));
        height: 100vh;
        background-size: cover;
        background-position: center center;
    }
    main a {
        display: block;
    }
    main a,
    main a:hover {
        box-shadow: none;
    }
    h4 {
        font-weight: 400;
        margin: 0;
        font-size: 3em;
        line-height: 1em;
    }
    article {
        margin: var(--s4) auto;
    }
    :global(.full-bleed) {
        margin-left: calc(-1 * var(--s2));
        margin-right: calc(-1 * var(--s2));
    }
    :global(.shadow) {
        text-shadow: 0 0 30px rgb(0 0 0 / 70%);
    }
    :global(.shadow > *) {
        color: white;
    }
    @media (max-width: 1023px) {
        :global(.full-bleed) {
            margin-left: calc(-1 * var(--s0));
            margin-right: calc(-1 * var(--s0));
        }
        main {
            margin-top: 0;
        }
    }
</style>
