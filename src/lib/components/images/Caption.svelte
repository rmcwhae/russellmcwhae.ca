<script>
    let { text, children } = $props()
</script>

<figure>
    {@render children?.()}
    <figcaption>
        <!-- Caption HTML is authored in trusted journal markdown -->
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
        font-size: var(--text-base);
        margin-top: var(--s-2);
        text-align: center;
    }
</style>
