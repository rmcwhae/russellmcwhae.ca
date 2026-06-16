<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import PageHero from '$lib/components/layout/PageHero.svelte'
    import { resolve } from '$app/paths'

    let { data } = $props()

    let images = $derived(data.event.images)
    let count = $derived(data.event.count)
    let date = $derived(data.event.date)
    let title = $derived(data.event.title)
</script>

<SEO {title} />

<div class="event-page">
    <PageHero {title}>
        {#snippet eyebrow()}
            <a href={resolve('/photography')} class="back-link">← Photography</a>
        {/snippet}
        {#snippet right()}
            <span class="event-meta">{date} · {count} photos</span>
        {/snippet}
    </PageHero>

    <div class="event-gallery">
        <Gallery {images} />
    </div>
</div>

<style lang="scss">
    @use '../../../lib/scss/breakpoints' as *;

    .event-page {
        grid-column: 1 / -1;
        width: 100%;
        max-width: 1800px;
        justify-self: center;
    }

    .back-link {
        font-family: var(--font-sans);
        font-size: 0.8rem;
        color: var(--text-color);
        text-decoration: none;
        letter-spacing: 0.08em;
        text-transform: uppercase;

        &:hover {
            color: var(--link-color);
        }
    }

    .event-meta {
        font-family: var(--font-sans);
        font-size: var(--body-sm);
        color: var(--text-color);
    }

    .event-gallery :global(img) {
        border-radius: 0;
    }
</style>
