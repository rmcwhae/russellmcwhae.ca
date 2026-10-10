<script>
    import Gallery from '#lib/components/images/Gallery.svelte'
    import ArrowNorthEast from '#lib/components/icons/ArrowNorthEast.svelte'
    import SEO from '#lib/components/base/SEO.svelte'

    let { data } = $props()

    let images = $derived(data.images)

    const destinations = [
        { href: '/events', text: 'Field Expeditions' },
        { href: '/calendars', text: 'Looking for Calendars?' },
    ]
</script>

<div class="page-header">
    <h1>Portfolio</h1>
    <p class="lede">
        A collection of landscape images from Western Canada and beyond.
    </p>
    <nav class="destinations" aria-label="Related">
        {#each destinations as destination (destination.href)}
            <a href={destination.href}>
                <span>{destination.text}</span>
                <ArrowNorthEast />
            </a>
        {/each}
    </nav>
</div>

<SEO title="Photography" />

<Gallery {images} />

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    h1 {
        margin-bottom: 0.4rem;
    }

    .lede {
        max-width: 36rem;
        margin: 0 0 var(--s1);
        color: var(--text-color);
        font-size: 1.05rem;
        line-height: 1.5;
    }

    .destinations {
        display: grid;
        margin: 0 0 var(--s1);
        border-top: 1px solid var(--light-grey);
    }

    .destinations a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.85rem 0;
        font-family: var(--font-serif);
        font-size: 1.15rem;
        font-weight: 500;
        line-height: 1.25;
        text-decoration: none;
        border-bottom: 1px solid var(--light-grey);
    }

    .destinations a:hover {
        color: var(--alpine);
        text-decoration: none;
    }

    @include for-tablet-portrait-up {
        .destinations {
            grid-template-columns: 1fr 1fr;
        }

        .destinations a:first-child {
            padding-right: var(--s1);
            border-right: 1px solid var(--light-grey);
        }

        .destinations a:last-child {
            padding-left: var(--s1);
        }
    }
</style>
