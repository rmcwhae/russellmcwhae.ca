<script>
    export let title
</script>

<article class="restricted-width">
    <header>
        <h1>{title}</h1>
    </header>
    <slot />
</article>

<style>
    h1 {
        padding-bottom: var(--s2);
    }
</style>
