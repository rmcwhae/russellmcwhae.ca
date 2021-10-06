<script>
    import { createEventDispatcher } from 'svelte'

    export let current_page
    export let total
    export let per_page

    $: last_page = Math.ceil(total / per_page)

    const dispatch = createEventDispatcher()

    function range(size, startAt = 0) {
        return [...Array(size).keys()].map((i) => i + startAt)
    }

    function changePage(page) {
        if (page !== current_page) {
            dispatch('change', page)
        }
    }
</script>

<nav>
    <ul>
        <li class={current_page === 1 ? 'disabled' : ''}>
            <a
                href="javascript:void(0)"
                on:click={() => changePage(current_page - 1)}
            >
                <span aria-hidden="true">«</span>
            </a>
        </li>
        {#each range(last_page, 1) as page}
            <li class={page === current_page ? 'active' : ''}>
                <a href="javascript:void(0)" on:click={() => changePage(page)}
                    >{page}</a
                >
            </li>
        {/each}
        <li class={current_page === last_page ? 'disabled' : ''}>
            <a
                href="javascript:void(0)"
                on:click={() => changePage(current_page + 1)}
            >
                <span aria-hidden="true">»</span>
            </a>
        </li>
    </ul>
</nav>

<style>
    nav {
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
        padding: 0.5rem 0.75rem;
        margin-left: -1px;
        line-height: 1.25;
        border: 1px solid var(--medium-grey);
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
