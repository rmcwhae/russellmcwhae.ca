<script>
    import SEO from '$lib/components/base/SEO.svelte'

    let { title, children } = $props()
</script>

<SEO {title} />

<article>
    <header class="border-bottom-thick">
        <h1>{title}</h1>
    </header>
    <div class="char-limit flow margin-0-auto">
        {@render children?.()}
    </div>
</article>

<style>
    /* TODO make me DRYer with routes/journal/[slug].svelte */
    header {
        padding-bottom: var(--s0);
        margin-bottom: var(--s2);
    }
</style>
