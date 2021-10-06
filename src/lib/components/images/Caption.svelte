<script>
    export let text
</script>

<figure>
    <slot />
    <figcaption>
        {@html text}
    </figcaption>
</figure>

<style>
    figcaption,
    :global(figcaption a) {
        color: var(--medium-grey);
    }
    figcaption {
        font-size: 0.9em;
        margin-top: var(--s-2);
        text-align: center;
    }
</style>
