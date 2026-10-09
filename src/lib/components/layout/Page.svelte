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
        padding-bottom: var(--s1);
        margin-bottom: var(--s2);
        border-bottom: 1px solid var(--light-grey);
    }

    h1 {
        font-size: clamp(2.2rem, 4vw, 3.2rem);
    }
</style>
