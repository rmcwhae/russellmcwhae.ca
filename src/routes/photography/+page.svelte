<script>
    import Gallery from '#lib/components/images/Gallery.svelte'
    import RightChevron from '#lib/components/icons/RightChevron.svelte'
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
    <nav class="destinations" aria-label="Related">
        {#each destinations as destination (destination.href)}
            <a href={destination.href}>
                <span>{destination.text}</span>
                <RightChevron />
            </a>
        {/each}
    </nav>
</div>

<SEO title="Photography" />

<Gallery {images} />

<style lang="scss">
    @use '../../lib/scss/breakpoints' as *;

    h1 {
        margin-bottom: 0;
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
