<script>
    import SEO from '$lib/components/base/SEO.svelte'

    export let title
</script>

<SEO {title} />

<article>
    <header>
        <h1>{title}</h1>
    </header>
    <div class="char-limit flow margin-0-auto">
        <slot />
    </div>
</article>

<style>
    /* TODO make me DRYer with routes/journal/[slug].svelte */
    header {
        padding-bottom: var(--s0);
        margin-bottom: var(--s2);
        border-bottom: 1px solid var(--light-grey);
    }
</style>
