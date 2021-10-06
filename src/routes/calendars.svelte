<script>
    import Calendar from '$lib/components/misc/Calendar.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

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
</script>

<SEO title="Calendars" />

<!-- <main style={`background-image: url(/calendar-images/${current.year}.jpg)`}>
    <div class="shadow">
        <h4>{current.year} Calendar</h4>
        <div class="uppercase">{current.filesize} MB PDF</div>
        <a
            href={'pdf/' + current.filename}
            target="_blank"
            class="uppercase knockout"
            rel="noopener noreferrer nofollow"
            >Preview <RightChevron />
        </a>
        <a
            href={'pdf/' + current.filename}
            target="_blank"
            class="uppercase knockout"
            rel="noopener noreferrer nofollow"
            >Purchase <RightChevron />
        </a>
    </div>
</main> -->

<!-- <h2>Previous Calendars</h2> -->

<h1>Calendars</h1>
<p>Check back in Fall 2021 for my upcoming 2022 calendar!</p>

<div class="past full-bleed">
    {#each calendars as { filename, year, filesize }, index}
        <Calendar {filename} {year} {filesize} {index} />
    {/each}
</div>

<article class="restricted-width-mobile">
    <h2>About</h2>
    <div class="two-col">
        <p class="mt-0">
            Initially created as Christmas gifts for family and friends, these
            calendars are an effort to do more with my photography. It’s hard to
            stand out in the crowded, high-volume world of online photography,
            so printing can be a way to make photography less ephemeral.
            Calendars provide a high-density collection of photographs in an
            affordable physical product.
        </p>
        <p>
            I design the calendars in Adobe Indesign with the <a
                href="http://calendarwizard.sourceforge.net"
                target="_blank"
                rel="noopener noreferrer nofollow">Calendar Wizard</a
            >
            plugin to create the basic table layout before heavy customization. There’s
            a steep learning curve, but the result is highly original. I then send
            a print-ready PDF to
            <a
                href="https://www.dhq.ca"
                target="_blank"
                rel="noopener noreferrer nofollow"
                >Digital Headquarters Imaging Centre</a
            > for printing and binding.
        </p>
    </div>
</article>

<style>
    .past {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: var(--s-2);
    }
    article {
        margin: 0 auto var(--s2);
    }
    :global(.shadow) {
        text-shadow: 0 0 30px rgb(0 0 0 / 70%);
    }
    :global(.shadow > *) {
        color: white;
    }
    :global(.knockout) {
        border: 1px solid white;
        padding: var(--s-2) var(--s-1);
    }
    @media (max-width: 800px) {
        .past {
            grid-template-columns: 1fr;
        }
    }
</style>
