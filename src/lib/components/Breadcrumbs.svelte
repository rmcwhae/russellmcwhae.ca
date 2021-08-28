<script>
    export let items

    const final = items[items.length - 1].text
    const links = items.slice(0, -1)
</script>

<ul class="sub">
    {#each links as { url, text } (url)}
        <li><a href={url}>{text}</a></li>
    {/each}
    <li><span>{final}</span></li>
</ul>

<style>
    ul {
        display: inline;
        margin: 0;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 15px -9px 4px 6px;
        position: relative;
    }

    li::before {
        border-right: 1px solid var(--light-grey);
        border-top: 1px solid var(--light-grey);
        background: transparent;
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        -webkit-transform: skewX(27deg);
        transform: skewX(27deg);
        width: 100%;
        z-index: -1;
    }
    a {
        text-decoration: none;
    }
    li a,
    li span {
        display: block;
        padding: var(--s-2) var(--s0) 0px var(--s1);
    }
    li:first-child a,
    li:first-child span {
        padding-left: 0;
    }
</style>
