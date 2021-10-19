<script>
    export let pages
    export let currentPage
    export let href

    let range

    $: {
        range = []
        for (let i = 1; i <= pages; ++i) {
            range.push(i)
        }
    }
</script>

{#if pages > 1}
    <nav class="sub">
        <ul>
            {#each range as page}
                <li class:active={page === currentPage}>
                    <a class="no-shadow" href={href(page)}>{page}</a>
                </li>
            {/each}
        </ul>
    </nav>
{/if}

<style>
    nav {
        margin-top: var(--s3);
        display: flex;
        justify-content: center;
    }
    nav ul {
        display: flex;
        padding-left: 0;
        list-style: none;
    }
    nav li a {
        text-decoration: none;
        position: relative;
        display: block;
        padding: var(--s-2) var(--s0);
        margin-left: -1px;
        line-height: 1.25;
        border: 1px solid var(--medium-grey);
    }
    nav ul li:first-child a {
        border-top-left-radius: var(--circle-radius);
        border-bottom-left-radius: var(--circle-radius);
        padding-left: var(--s1);
    }
    nav ul li:last-child a {
        border-top-right-radius: var(--circle-radius);
        border-bottom-right-radius: var(--circle-radius);
        padding-right: var(--s1);
    }
    nav li.active a {
        color: var(--background-color);
        background-color: var(--high-contrast-color);
        border-color: var(--high-contrast-color);
    }
    nav li.disabled a {
        color: var(--light-grey);
        pointer-events: none;
        cursor: auto;
        border-color: var(--light-grey);
    }
</style>
