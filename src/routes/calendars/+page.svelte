<script>
    import Image from 'svimg/Image.svelte'
    import Calendar from '#lib/components/misc/Calendar.svelte'
    import SEO from '#lib/components/base/SEO.svelte'
</script>

<SEO title="Calendars" />

<header class="page-header">
    <h1>Calendars</h1>
    <p class="lede">
        After a ten-year run, I am no longer actively making annual wall
        calendars. Below is an archive of all previous editions.
    </p>
</header>

<section aria-label="Past editions">
    <div class="three-col-grid">
        <Calendar filename="2024calendar.pdf">
            <Image
                src="/calendar-images/2024.jpg"
                alt="Cover of the 2024 calendar"
            />
        </Calendar>
        <Calendar filename="2023calendar.pdf">
            <Image
                src="/calendar-images/2023.jpg"
                alt="Cover of the 2023 calendar"
            />
        </Calendar>
        <Calendar filename="2022calendar.pdf">
            <Image
                src="/calendar-images/2022.jpg"
                alt="Cover of the 2022 calendar"
            />
        </Calendar>
        <Calendar filename="2021calendar.pdf">
            <Image
                src="/calendar-images/2021.jpg"
                alt="Cover of the 2021 calendar"
            />
        </Calendar>
        <Calendar filename="2020calendar.pdf">
            <Image
                src="/calendar-images/2020.jpg"
                alt="Cover of the 2020 calendar"
            />
        </Calendar>
        <Calendar filename="2019calendar.pdf">
            <Image
                src="/calendar-images/2019.jpg"
                alt="Cover of the 2019 calendar"
            />
        </Calendar>
        <Calendar filename="2018calendar.pdf">
            <Image
                src="/calendar-images/2018.jpg"
                alt="Cover of the 2018 calendar"
            />
        </Calendar>
        <Calendar filename="2017calendar.pdf">
            <Image
                src="/calendar-images/2017.jpg"
                alt="Cover of the 2017 calendar"
            />
        </Calendar>
        <Calendar filename="2016calendar.pdf">
            <Image
                src="/calendar-images/2016.jpg"
                alt="Cover of the 2016 calendar"
            />
        </Calendar>
        <Calendar filename="2015calendar.pdf">
            <Image
                src="/calendar-images/2015.jpg"
                alt="Cover of the 2015 calendar"
            />
        </Calendar>
    </div>
</section>
