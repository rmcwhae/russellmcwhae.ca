<script>
    import BergLake from '$static/homepage-images/BergLake.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import LimestoneLakes from '$static/homepage-images/LimestoneLakes.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import Northover from '$static/homepage-images/Northover.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import Tupper from '$static/homepage-images/Tupper.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import YohoBugs from '$static/homepage-images/YohoBugs.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
</script>

<h1>Hi, <a href="about">I’m Russell</a>.</h1>

<p>
    I’m a front-end-biased web developer with a background in structural
    engineering and biomedical research who likes spending time outside.
</p>

<div class="grid">
    <figure class="box1">
        <img srcset={YohoBugs} type="image/webp" alt="Bugaboos from Yoho" />
    </figure>
    <figure class="box2">
        <img srcset={LimestoneLakes} type="image/webp" alt="Limestone Lakes" />
    </figure>
    <figure class="box3">
        <img srcset={Tupper} type="image/webp" alt="Mount Tupper" />
    </figure>
    <figure class="box4">
        <img srcset={BergLake} type="image/webp" alt="Berg Lake" />
    </figure>
    <figure class="box5">
        <img srcset={Northover} type="image/webp" alt="Northover Ridge" />
    </figure>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 20vw);
        grid-gap: var(--s-2);
    }
    p {
        font-size: 1.2em;
    }
    img {
        width: 200%;
        height: 100%;
        object-fit: cover;
    }
    .box1 {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 1;
    }
    .box2 {
        grid-column-start: 4;
        grid-column-end: 7;
        grid-row-start: 1;
        grid-row-end: 1;
    }
    .box3 {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 2;
    }
    .box4 {
        grid-column-start: 3;
        grid-column-end: 5;
        grid-row-start: 2;
        grid-row-end: 2;
    }
    .box5 {
        grid-column-start: 5;
        grid-column-end: 7;
        grid-row-start: 2;
        grid-row-end: 2;
    }
</style>
