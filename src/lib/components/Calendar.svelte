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
        href={'pdf/' + filename}
        target="_blank"
        class="shadow"
        rel="noopener noreferrer nofollow"
    >
        <h4>{year}</h4>
        <aside class="uppercase">{filesize} MB PDF</aside>
    </a>
</section>

<style>
    a {
        text-align: center;
        padding: var(--s5) 0;
        display: block;
        margin-bottom: var(--s-1);
        text-decoration: none;
    }
    @media (min-width: 801px) {
        .current {
            grid-column: span 2;
        }
    }
    a,
    a:hover {
        box-shadow: none;
    }
    section {
        background-size: cover;
        background-position: center center;
    }
    h4 {
        font-weight: 400;
        margin: 0;
        font-size: 2em;
        line-height: 1em;
    }
    aside {
        font-size: 1rem;
    }
</style>
