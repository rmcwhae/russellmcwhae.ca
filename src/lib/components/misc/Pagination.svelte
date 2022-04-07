<script>
    import { createEventDispatcher } from 'svelte'
    import LeftChevron from '$lib/components/icons/LeftChevron.svelte'
    import RightChevron from '$lib/components/icons/RightChevron.svelte'

    export let totalItems
    export let pageSize
    export let currentPage

    const dispatch = createEventDispatcher()

    $: lastPage = Math.ceil(totalItems / pageSize)

    function range(size, startAt = 0) {
        return [...Array(size).keys()].map((i) => i + startAt)
    }

    function changePage(page) {
        if (page !== currentPage) {
            dispatch('setPage', { page })
            topFunction()
        }
    }

    function topFunction() {
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }
</script>

{#if totalItems > pageSize}
    <nav>
        <ul>
            <li class={currentPage === 1 ? 'disabled' : ''}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                    on:click={() => changePage(currentPage - 1)}
                    aria-hidden="true"
                    class=""><LeftChevron /></a
                >
            </li>
            {#each range(lastPage, 1) as page}
                <li class={page === currentPage ? 'active' : ''}>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a on:click={() => changePage(page)}>{page}</a>
                </li>
            {/each}
            <li class={currentPage === lastPage ? 'disabled' : ''}>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                    aria-hidden="true"
                    on:click={() => changePage(currentPage + 1)}
                    class=""><RightChevron /></a
                >
            </li>
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
        cursor: pointer;
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
