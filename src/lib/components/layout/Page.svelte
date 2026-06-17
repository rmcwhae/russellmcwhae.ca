<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import NoWrapLastTwoWords from '$lib/components/misc/NoWrapLastTwoWords.svelte'

    let { title, description, children } = $props()
</script>

<SEO {title} {description} />

<article>
    <header>
        <h1>{title}</h1>
    </header>
    <div class="char-limit flow margin-0-auto">
        {#if description}
            <p class="big lead">
                <NoWrapLastTwoWords text={description} />
            </p>
        {/if}
        {@render children?.()}
    </div>
</article>

<style>
    header {
        padding-top: var(--s2);
        padding-bottom: var(--s0);
        margin-bottom: var(--s2);
    }

    header h1 {
        margin: 0;

        &::after {
            content: '';
            display: block;
            width: 40px;
            height: 3px;
            background: var(--accent);
            margin-top: var(--s0);
            margin-inline: auto;
        }
    }

    .lead {
        color: var(--high-contrast-color);
        margin-top: 0;
    }
</style>
