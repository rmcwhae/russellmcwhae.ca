<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Event from '$lib/components/images/Event.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    let { data } = $props()

    let images = $derived(data.images)
    let events = $derived(data.events ?? [])
</script>

<SEO title="Photography" />

<div class="photography-page">
    <div class="page-header">
        <div class="kicker">Visual Work</div>
        <h1>Photography</h1>
        <p class="page-desc">
            A collection of images from the Canadian Rockies and beyond.
        </p>
    </div>

    <section class="photo-section">
        <div class="section-header-row">
            <span class="section-label">Portfolio</span>
        </div>
        <Gallery {images} />
    </section>

    {#if events.length > 0}
        <section class="events-section">
            <div class="section-header-row">
                <span class="section-label">Events</span>
            </div>
            <div class="events-grid">
                {#each events as { name: eventName, featuredImage, date, count, title } (eventName)}
                    <Event {eventName} {featuredImage} {date} {count} {title} />
                {/each}
            </div>
        </section>
    {/if}

    <section class="calendars-note">
        <p>
            I also produce annual wall calendars featuring my landscape photography. Previous editions
            and more information are available on the <a href="/calendars">calendars page</a>.
        </p>
    </section>
</div>

<style lang="scss">
    .photography-page {
        max-width: 1400px;
        margin: 0 auto;
    }

    .page-header {
        padding: var(--s2) 0 var(--s1);
        border-bottom: 1px solid var(--light-grey);
        margin-bottom: var(--s2);
    }

    .page-header h1 {
        margin: var(--s-2) 0 var(--s-1);
    }

    .page-desc {
        font-size: 15px;
        color: var(--text-color);
        margin: 0;
        max-width: 60ch;
    }

    .section-header-row {
        margin-bottom: var(--s1);
    }

    .photo-section {
        margin-bottom: var(--s3);
    }

    .events-section {
        padding-top: var(--s2);
        border-top: 1px solid var(--light-grey);
        margin-bottom: var(--s3);
    }

    .calendars-note {
        padding: var(--s2) 0 var(--s3);
        border-top: 1px solid var(--light-grey);

        p {
            font-size: 15px;
            color: var(--text-color);
            max-width: 60ch;
            margin: 0;
        }
    }
</style>
