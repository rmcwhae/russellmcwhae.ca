<script>
    import SEO from '$lib/components/SEO.svelte'

    export let title
</script>

<SEO {title} />

<article class="restricted-width">
    <header>
        <h1>{title}</h1>
    </header>
    <slot />
</article>
