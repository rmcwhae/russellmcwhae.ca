<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import { resolve } from '$app/paths'

    let { data } = $props()

    let images = $derived(data.event.images)
    let count = $derived(data.event.count)
    let date = $derived(data.event.date)
    let title = $derived(data.event.title)
</script>

<SEO {title} />

<div class="event-page">
    <section class="hero-section">
        <div class="hero-left">
            <a href={resolve('/photography')} class="back-link">← Photography</a>
            <h1>{title}</h1>
        </div>
        <div class="hero-right">
            <span class="event-meta">{date} · {count} photos</span>
        </div>
    </section>

    <div class="event-gallery">
        <Gallery {images} />
    </div>
</div>

<style lang="scss">
    @use '../../../lib/scss/breakpoints' as *;

    .event-page {
        grid-column: 1 / -1;
        max-width: 1800px;
        margin: 0 auto;
    }

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

    .hero-left h1 {
        margin: var(--s-2) 0 0;
    }

    .hero-right {
        padding-bottom: 0.2rem;
    }

    .event-meta {
        font-family: var(--font-sans);
        font-size: 15px;
        color: var(--text-color);
    }

    .event-gallery :global(img) {
        border-radius: 0;
    }
</style>
