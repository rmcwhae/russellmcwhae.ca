<script>
    export let year
    export let filesize
    export let filename
</script>

<section class="full-bleed">
    <a
        href={'pdf/' + filename}
        target="_blank"
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
    }
    a,
    a:hover {
        box-shadow: none;
    }
    section {
        background: red;
    }
    h4 {
        font-weight: 400;
        margin: 0;
        font-size: 2em;
    }
    aside {
        font-size: 1rem;
    }
</style>
