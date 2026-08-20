<script>
    import Image from 'svimg/Image.svelte'
    import Calendar from '$lib/components/misc/Calendar.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
</script>

<SEO title="Calendars" />

<div class="calendars-page">
    <header>
        <div class="kicker">Photography</div>
        <h1>Calendars</h1>
    </header>

    <p class="intro">
        After a ten-year run, I am no longer actively making annual wall
        calendars. Below is an archive of all previous editions.
    </p>

    <div class="section-label">Previous Calendars</div>
    <div class="three-col-grid">
        <Calendar filename="2024calendar.pdf">
            <Image src="/calendar-images/2024.jpg" />
        </Calendar>
        <Calendar filename="2023calendar.pdf">
            <Image src="/calendar-images/2023.jpg" />
        </Calendar>
        <Calendar filename="2022calendar.pdf">
            <Image src="/calendar-images/2022.jpg" />
        </Calendar>
        <Calendar filename="2021calendar.pdf">
            <Image src="/calendar-images/2021.jpg" />
        </Calendar>
        <Calendar filename="2020calendar.pdf">
            <Image src="/calendar-images/2020.jpg" />
        </Calendar>
        <Calendar filename="2019calendar.pdf">
            <Image src="/calendar-images/2019.jpg" />
        </Calendar>
        <Calendar filename="2018calendar.pdf">
            <Image src="/calendar-images/2018.jpg" />
        </Calendar>
        <Calendar filename="2017calendar.pdf">
            <Image src="/calendar-images/2017.jpg" />
        </Calendar>
        <Calendar filename="2016calendar.pdf">
            <Image src="/calendar-images/2016.jpg" />
        </Calendar>
        <Calendar filename="2015calendar.pdf">
            <Image src="/calendar-images/2015.jpg" />
        </Calendar>
    </div>

    <section class="about-section">
        <div class="section-label">About</div>
        <div class="two-col-grid">
            <p>
                Initially created as Christmas gifts for family and friends,
                these calendars are an effort to do more with my photography.
                It’s hard to stand out in the crowded, high-volume world of
                online photography, so printing can be a way to make photography
                less ephemeral. Calendars provide a high-density collection of
                photographs in an affordable physical product.
            </p>
            <p>
                I design the calendars in Adobe Indesign with the <a
                    href="http://calendarwizard.sourceforge.net"
                    target="_blank"
                    rel="noopener noreferrer nofollow">Calendar Wizard</a
                >
                plugin to create the basic table layout before heavy customization.
                There’s a steep learning curve, but the result is highly original.
                I then send a print-ready PDF to
                <a
                    href="https://www.dhq.ca"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    >Digital Headquarters Imaging Centre</a
                > for printing and binding.
            </p>
        </div>
    </section>
</div>

<style>
    .calendars-page {
        max-width: 900px;
        margin: 0 auto;
        padding-top: var(--s2);
    }

    header {
        padding-bottom: var(--s0);
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s2);

        h1 {
            margin: var(--s-2) 0 0;
        }
    }

    .intro {
        font-size: var(--text-base);
        color: var(--text-color);
        max-width: 60ch;
        margin: 0 0 var(--s2);
    }

    .section-label {
        margin-bottom: var(--s1);
    }

    .about-section {
        margin-top: var(--s3);
    }

    .about-section p {
        font-size: var(--text-base);
        line-height: 1.6;
        margin: 0;
    }

    .calendars-page :global(img) {
        border-radius: 0;
    }
</style>
