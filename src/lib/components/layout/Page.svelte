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
        max-width: 70ch;
    }

    header {
        margin-bottom: var(--s2);
    }

    h1 {
        font-size: clamp(2.2rem, 4vw, 3.2rem);
    }
</style>
