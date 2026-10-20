<script>
    import Image from 'svimg/Image.svelte'
    import Calendar from '#lib/components/misc/Calendar.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
</script>

<SEO title="Calendars" />

<div class="page-header mb-2">
    <h1>Calendars</h1>
    <p class="lede">
        After a ten-year run, I am no longer actively making annual wall
        calendars. Below is an archive of all previous editions.
    </p>
</div>

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

<style>
    article {
        margin: 0 auto var(--s2);
    }
</style>
