<script>
    /** @type {{ title: string, eyebrow?: import('svelte').Snippet, right?: import('svelte').Snippet }} */
    let { title, eyebrow, right } = $props()
</script>

<section class="hero-section">
    <div class="hero-left">
        {#if eyebrow}
            {@render eyebrow()}
        {/if}
        <h1>{title}</h1>
    </div>
    {#if right}
        <div class="hero-right">
            {@render right()}
        </div>
    {/if}
</section>

<style lang="scss">
    @use '../../scss/breakpoints' as *;

    .hero-section {
        padding: var(--s2) 0;
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s2);

        @include for-tablet-landscape-up {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--s3);
            align-items: end;
        }
    }

    .hero-left h1 {
        margin: var(--s-2) 0 0;
    }

    .hero-right {
        padding-bottom: 0;
    }
</style>
