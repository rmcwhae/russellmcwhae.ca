<script>
    export let category

    const href = '/journal/category/' + category
</script>

<span>
    <a {href}>{category}</a>
</span>

<style>
    a {
        color: var(--text-color);
    }
</style>
