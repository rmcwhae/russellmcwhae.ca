<script>
    import SEO from '#lib/components/base/SEO.svelte'

    let { title, children } = $props()
</script>

<SEO {title} />

<article>
    <header>
        <h1>{title}</h1>
    </header>
    <div class="flow">
        {@render children?.()}
    </div>
</article>

<style>
    article {
        max-width: var(--measure);
    }

    header {
        margin-bottom: var(--s2);
    }
</style>
