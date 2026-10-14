<script>
    import SEO from '#lib/components/base/SEO.svelte'

    let { title, children, ledeHeading = false } = $props()
</script>

<SEO {title} />

<article>
    <header>
        <h1 class:lede-heading={ledeHeading}>{title}</h1>
    </header>
    <div class="flow">
        {@render children?.()}
    </div>
</article>

<style>
    article {
        width: 100%;
        max-width: var(--measure);
        margin-inline: auto;
        justify-self: center;
    }

    header {
        margin-bottom: var(--s2);
    }

    h1.lede-heading {
        font-size: var(--text-2xl);
    }
</style>
