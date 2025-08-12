<script>
    import Gallery from '$lib/components/images/Gallery.svelte'
    import Button from '$lib/components/buttons/Button.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    export let data

    $: images = data.event.images
    $: count = data.event.count
    $: date = data.event.date
    $: title = data.event.title
</script>

<SEO {title} />

<div class="flex items-center justify-between">
    <h1>{title}</h1>
    <Button href="/events" text="Events" left />
</div>
<div class="sub mb-s0">{date} &middot; {count} photos</div>

<Gallery {images} />

<style>
    .sub {
        margin-top: var(--s-1);
        margin-bottom: var(--s1);
    }
</style>
