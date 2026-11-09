<script>
    let { text, children } = $props()
</script>

<figure>
    {@render children?.()}
    <figcaption>
        <!-- Captions are author-written in content/*.md and may contain links -->
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html text}
    </figcaption>
</figure>

<style>
    figcaption,
    :global(figcaption a) {
        color: var(--medium-grey);
    }
    figcaption {
        font-size: var(--text-sm);
        margin-top: var(--s-2);
        text-align: center;
    }
</style>
