<script>
    import SEO from '#lib/components/base/SEO.svelte'

    let { title, children, lede = undefined } = $props()
</script>

<SEO {title} />

<article>
    <header class="page-header">
        <h1>{title}</h1>
        {#if lede}
            <p class="lede">{lede}</p>
        {/if}
    </header>
    <div class="flow">
        {@render children?.()}
    </div>
</article>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    article {
        width: 100%;
        max-width: var(--measure);
        margin-inline: auto;
        justify-self: center;
    }
</style>
