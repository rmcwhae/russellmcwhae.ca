<script>
    import SEO from '$lib/components/base/SEO.svelte'

    let { title, children } = $props();
</script>

<SEO {title} />

<article>
    <div class="char-limit flow margin-0-auto micro">
        {@render children?.()}
    </div>
</article>
