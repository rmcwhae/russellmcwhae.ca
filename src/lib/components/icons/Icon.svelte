<script>
    export let viewBox = '0 0 24 24'
    export let height = '1em'
</script>

<svg
    class="icon"
    style="height: {height}"
    xmlns="http://www.w3.org/2000/svg"
    {viewBox}
    fill="currentColor"
>
    <slot />
</svg>

<style>
    .icon {
        vertical-align: middle;
    }

    :global(.with-icon) {
        display: inline-flex;
        align-items: baseline;
    }

    :global(.with-icon) .icon {
        margin-inline-end: 1rem;
    }
</style>
