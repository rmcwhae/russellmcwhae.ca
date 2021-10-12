<script>
    export let year
    export let filesize
    export let filename
    export let index
</script>

<section
    style={`background-image: url(/calendar-images/${year}.jpg)`}
    class:current={index === 0}
>
    <a
        href={'/pdf/' + filename}
        target="_blank"
        class="shadow"
        rel="noopener noreferrer nofollow"
    >
        <h2>{year}</h2>
        <aside class="uppercase">{filesize} MB PDF</aside>
    </a>
</section>

<style>
    section {
        border-radius: var(--radius);
    }
    a {
        text-align: center;
        display: block;
        text-decoration: none;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    @media (min-width: 801px) {
        .current {
            /* grid-column: span 2; */
        }
    }
    a,
    a:hover {
        box-shadow: none;
    }
    section {
        background-size: cover;
        background-position: center center;
        height: 40vh;
    }
    .current {
        /* height: 60vh; */
    }
    h2 {
        margin: 0;
        line-height: 1em;
    }
    aside {
        font-size: 1rem;
    }
</style>
