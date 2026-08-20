<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import PageHero from '$lib/components/layout/PageHero.svelte'
    import { resolve } from '$app/paths'

    let { data } = $props()

    let images = $derived(data.images)

    const BATCH = 12
    let visibleCount = $state(BATCH)
    let visibleImages = $derived(images?.slice(0, visibleCount) ?? [])
    let hasMore = $derived((images?.length ?? 0) > visibleCount)

    function loadMore() {
        visibleCount += BATCH
    }
</script>

<SEO title="Portfolio" />

<div class="photography-page">
    <PageHero title="Portfolio">
        {#snippet eyebrow()}
            <div class="kicker">Photography</div>
        {/snippet}
        {#snippet right()}
            <p class="hero-description">
                A collection of landscape images from Western Canada and beyond.
            </p>
        {/snippet}
    </PageHero>

    <section class="portfolio-section">
        <div class="section-header-row">
            <span class="section-label">Selected Works</span>
        </div>
        <Gallery images={visibleImages} />
        {#if hasMore}
            <div class="load-more-row">
                <button class="load-more-btn" type="button" onclick={loadMore}>
                    + Load more
                    <span class="load-more-count"
                        >({(images?.length ?? 0) - visibleCount} more)</span
                    >
                </button>
            </div>
        {/if}
    </section>

    <section class="elsewhere-section">
        <span class="section-label">Elsewhere in Photography</span>
        <div class="elsewhere-rows">
            <a
                href={resolve('/field-expeditions')}
                class="elsewhere-row"
            >
                <span class="elsewhere-title">Field Expeditions</span>
                <span class="elsewhere-desc">99 trips, listed by year</span>
            </a>
            <a href={resolve('/calendars')} class="elsewhere-row">
                <span class="elsewhere-title">Calendars</span>
                <span class="elsewhere-desc"
                    >Ten annual editions, 2015–2024</span
                >
            </a>
        </div>
    </section>
</div>

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    .photography-page {
        margin: 0 auto;
    }

    .hero-description {
        font-size: var(--text-base);
        color: var(--text-color);
        margin: 0;
        max-width: 52ch;
        line-height: 1.7;
    }

    .portfolio-section {
        margin-bottom: var(--s3);

        .section-header-row {
            margin-bottom: var(--s1);
        }

        :global(img) {
            border-radius: 0;
        }
    }

    .elsewhere-section {
        padding: var(--s2) 0 var(--s3);
        border-top: 1px solid var(--light-grey);
    }

    .elsewhere-rows {
        margin-top: var(--s1);
    }

    .elsewhere-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: var(--s1);
        padding: var(--s-1) 0;
        border-bottom: 1px solid var(--light-grey);
        text-decoration: none;
        color: inherit;

        &:last-child {
            border-bottom: none;
        }

        &:hover .elsewhere-title {
            color: var(--link-color);
            text-decoration: underline;
            text-decoration-color: var(--accent);
            text-decoration-thickness: 2px;
            text-underline-offset: 4px;
        }
    }

    .elsewhere-title {
        font-family: var(--font-sans);
        font-size: var(--text-base);
        transition: color var(--duration);
    }

    .elsewhere-desc {
        font-family: var(--font-sans);
        font-size: var(--text-sm);
        color: var(--text-color);
        white-space: nowrap;
        flex-shrink: 0;
    }

    .load-more-row {
        display: flex;
        justify-content: center;
        margin-top: var(--s1);
    }

    .load-more-btn {
        font-family: var(--font-sans);
        font-size: var(--text-base);
        padding: var(--s-2) var(--s1);
        border: 1px solid var(--light-grey);
        border-radius: var(--radius);
        background: var(--background-color);
        color: var(--text-color);
        cursor: pointer;
        transition:
            border-color var(--duration),
            color var(--duration);

        &:hover {
            border-color: var(--accent);
            color: var(--link-color);
        }

        &:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
        }
    }

    .load-more-count {
        color: var(--text-color);
        font-size: var(--text-sm);
        margin-left: var(--s-3);
    }
</style>
