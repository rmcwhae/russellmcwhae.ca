<script>
    import SEO from '$lib/components/SEO.svelte'

    export let title
</script>

<SEO {title} />

<article class="restricted-width">
    <slot />
</article>
