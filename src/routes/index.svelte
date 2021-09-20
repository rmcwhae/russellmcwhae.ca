<script>
    import Collage from '$static/collage.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'
</script>

<div class="wrapper">
    <h1>Hi, I’m Russell.</h1>

    <div class="grid">
        <div class="box1">
            <p>
                I’m a front end–biased web developer with a background in
                structural engineering and biomedical research who likes
                spending time outside.
                <span class="sub nowrap"
                    ><a href="about">More About Me <RightChevron /></a></span
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

    <img srcset={Collage} alt="Photo Collage" class="full-bleed" />
</div>

<style>
    .wrapper {
        max-width: 1200px;
    }
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
        font-size: 1.2em;
        line-height: 1.4em;
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
