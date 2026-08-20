<script>
    import SEO from '$lib/components/base/SEO.svelte'
    import PageHero from '$lib/components/layout/PageHero.svelte'
    import Image from '$lib/components/images/Image.svelte'
    import SvimgImage from 'svimg/Image.svelte'
    import { resolve } from '$app/paths'

    let { data } = $props()

    let portfolioCount = $derived(data.portfolioCount)
    let portfolioImage = $derived(data.portfolioImage)
    let expeditionCount = $derived(data.expeditionCount)
    let expeditionYearRange = $derived(data.expeditionYearRange)
    let expeditionImage = $derived(data.expeditionImage)

    let expeditionMeta = $derived(
        expeditionCount != null && expeditionYearRange
            ? `${expeditionCount} trips · ${expeditionYearRange.min}–${expeditionYearRange.max}`
            : 'Photo sets, trip by trip'
    )
</script>

<SEO title="Photography" />

<div class="photography-landing">
    <PageHero title="Photography">
        {#snippet eyebrow()}
            <div class="kicker">Visual Work</div>
        {/snippet}
        {#snippet right()}
            <p class="hero-description">
                A collection of landscape images from Western Canada and beyond,
                in three parts: the edit, the trips behind it, and ten years of
                print editions.
            </p>
        {/snippet}
    </PageHero>

    <span class="section-label">Sections</span>
    <div class="three-col-grid">
        <a href={resolve('/portfolio')} class="section-card">
            <div class="card-image">
                {#if portfolioImage}
                    <Image
                        filePath={portfolioImage.filePath}
                        width={portfolioImage.width}
                        height={portfolioImage.height}
                    />
                {/if}
            </div>
            <div class="card-title">Portfolio</div>
            <p class="card-desc">
                The selected edit — the images I would show first.
            </p>
            <div class="card-meta">{portfolioCount} photographs</div>
        </a>
        <a
            href={resolve('/field-expeditions')}
            class="section-card"
        >
            <div class="card-image">
                {#if expeditionImage}
                    <Image
                        filePath={expeditionImage.filePath}
                        width={expeditionImage.width}
                        height={expeditionImage.height}
                    />
                {/if}
            </div>
            <div class="card-title">Field Expeditions</div>
            <p class="card-desc">
                Full photo sets from individual trips, listed by year.
            </p>
            <div class="card-meta">{expeditionMeta}</div>
        </a>
        <a href={resolve('/calendars')} class="section-card">
            <div class="card-image">
                <SvimgImage src="/calendar-images/2024.jpg" />
            </div>
            <div class="card-title">Calendars</div>
            <p class="card-desc">
                An archive of the annual wall calendars, free to download.
            </p>
            <div class="card-meta">10 editions · 2015–2024</div>
        </a>
    </div>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .photography-landing {
        margin: 0 auto;
    }

    .hero-description {
        font-size: var(--text-base);
        color: var(--text-color);
        margin: 0;
        max-width: 52ch;
        line-height: 1.7;
    }

    .section-label {
        display: block;
        margin: 0 0 var(--s1);
    }

    .section-card {
        display: flex;
        flex-direction: column;
        gap: var(--s-1);
        text-decoration: none;
        color: inherit;
    }

    .card-image {
        position: relative;
        aspect-ratio: 4 / 3;
        border-radius: var(--radius);
        overflow: hidden;
        background: var(--light-grey);

        :global(img) {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0;
        }
    }

    .card-title {
        font-family: var(--font-sans);
        font-size: var(--text-xl);
        font-weight: 500;
        color: var(--high-contrast-color);
    }

    .card-desc {
        font-family: var(--font-sans);
        font-size: var(--text-base);
        color: var(--text-color);
        margin: 0;
    }

    .card-meta {
        font-family: var(--font-sans);
        font-size: var(--text-xs);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--medium-grey);
    }
</style>
