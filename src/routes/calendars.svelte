<script>
    import Image from 'svimg'
    import Calendar from '$lib/components/misc/Calendar.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
</script>

<SEO title="Calendars" />

<div class="full-bleed mb-2">
    <h1>Calendars</h1>
    <p class="mt-1 mb-1 big char-limit">My 2022 Calendar is now shipping!</p>
    <Calendar filename="2022calendar.pdf" purchase>
        <Image src="/calendar-images/2022.jpg" />
    </Calendar>
</div>

<div class="full-bleed">
    <h2>Previous Calendars</h2>
    <div class="two-col-grid">
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
</div>

<article class="restricted-width">
    <h2>About</h2>
    <div class="two-col flow">
        <p>
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
</style>
