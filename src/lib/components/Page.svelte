<script>
    export let title
</script>

<article class="restricted-width">
    <h1>{title}</h1>
    <slot />
</article>

<style>
    h1 {
        padding-bottom: var(--s-1);
        border-bottom: 1px solid var(--light-grey);
    }
</style>
