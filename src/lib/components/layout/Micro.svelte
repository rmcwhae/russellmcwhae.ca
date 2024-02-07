<script>
    import SEO from '$lib/components/base/SEO.svelte'

    export let title
</script>

<SEO {title} />

<article>
    <div class="char-limit flow margin-0-auto micro">
        <slot />
    </div>
</article>